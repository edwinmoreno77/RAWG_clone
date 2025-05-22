const key = import.meta.env.VITE_RAWG_API_KEY;

const gameCache = new Map();
const CACHE_TTL = 1000 * 60 * 10; // 10 minutos

/**
 * Obtiene datos combinados de un juego (info general, capturas y vídeos),
 * usando caché local con expiración y peticiones en paralelo.
 *
 * @param {string|number} id  – ID del juego en RAWG API
 * @returns {Promise<Object|null>}  – Datos combinados o null en caso de error
 */
export const getGameById = async (id) => {
  // Comprobar caché
  const cached = gameCache.get(id);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return cached.data;
  }

  try {
    const BASE_URL = `https://api.rawg.io/api/games/${id}`;
    const commonHeaders = { "Content-Type": "application/json" };

    // Lanzar las tres peticiones a la vez
    const [gameRes, screenshotsRes, videosRes] = await Promise.all([
      fetch(
        `${BASE_URL}?key=${key}&fields=id,name,description,background_image`,
        { headers: commonHeaders }
      ),
      fetch(`${BASE_URL}/screenshots?key=${key}&page_size=5`, {
        headers: commonHeaders,
      }),
      fetch(`${BASE_URL}/movies?key=${key}&page_size=3`, {
        headers: commonHeaders,
      }),
    ]);

    // Comprobar status de cada respuesta
    [gameRes, screenshotsRes, videosRes].forEach((res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status} en ${res.url}`);
      }
    });

    // Parsear JSON en paralelo
    const [gameData, screenshotsData, videosData] = await Promise.all([
      gameRes.json(),
      screenshotsRes.json(),
      videosRes.json(),
    ]);

    // Combinar datos
    const combinedData = {
      ...gameData,
      screenshots: screenshotsData.results || [],
      videos: videosData.results || [],
    };

    // Guardar en caché con timestamp
    gameCache.set(id, {
      data: combinedData,
      fetchedAt: Date.now(),
    });

    return combinedData;
  } catch (error) {
    console.error("Error en getGameById:", error);
    return null;
  }
};

export const getGameByName = async (name) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${name}&key=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log("Error capturado en el fetch", error);
    return null;
  }
};

const filteredGamesCache = new Map();

export const getFilteredGames = async (filters, page) => {
  const cacheKey = JSON.stringify({ filters, page });
  if (filteredGamesCache.has(cacheKey)) {
    return filteredGamesCache.get(cacheKey); // Devuelve los datos en caché si están disponibles
  }

  try {
    const queryParams = new URLSearchParams();

    if (filters.year) {
      queryParams.append(
        "dates",
        `${filters.year}-01-01,${filters.year}-12-31`
      );
    }
    // Soporte para arrays y nombres en plural
    if (filters.genres && filters.genres.length > 0) {
      queryParams.append("genres", filters.genres.join(","));
    }
    if (filters.platforms && filters.platforms.length > 0) {
      queryParams.append("platforms", filters.platforms.join(","));
    }
    if (filters.tags && filters.tags.length > 0) {
      queryParams.append("tags", filters.tags.join(","));
    }
    if (filters.developer) queryParams.append("developers", filters.developer);
    if (filters.ordering) queryParams.append("ordering", filters.ordering);
    if (page) queryParams.append("page", page);

    queryParams.append("key", key);

    const response = await fetch(
      `https://api.rawg.io/api/games?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    filteredGamesCache.set(cacheKey, data.results); // Guarda los datos en caché
    return data.results;
  } catch (error) {
    console.log("Error en getFilteredGames", error);
    return [];
  }
};
