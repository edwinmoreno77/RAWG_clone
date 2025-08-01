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
      fetch(`${BASE_URL}/screenshots?key=${key}&page_size=7`, {
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

/**
 * Búsqueda rápida sin media (para resultados inmediatos)
 * Usado en el dropdown de búsqueda para mostrar resultados instantáneos
 * sin cargar screenshots ni videos
 */
export const getGameByNameQuick = async (name) => {
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

/**
 * Búsqueda completa con media (para página de resultados)
 * Usado en la página de Search para mostrar cards con screenshots y videos
 * Incluye hasta 7 screenshots y 1 video por juego
 */
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

    // Obtener videos y screenshots para cada juego en paralelo
    const gamesWithMedia = await Promise.all(
      data.results.map(async (game) => {
        try {
          const [screenshotsRes, videosRes] = await Promise.all([
            fetch(
              `https://api.rawg.io/api/games/${game.id}/screenshots?key=${key}&page_size=7`
            ),
            fetch(
              `https://api.rawg.io/api/games/${game.id}/movies?key=${key}&page_size=1`
            ),
          ]);

          const screenshots = screenshotsRes.ok
            ? (await screenshotsRes.json()).results
            : [];
          const videos = videosRes.ok ? (await videosRes.json()).results : [];

          return {
            ...game,
            screenshots,
            videos,
          };
        } catch (error) {
          console.error(`Error fetching media for game ${game.id}:`, error);
          return {
            ...game,
            screenshots: [],
            videos: [],
          };
        }
      })
    );

    return gamesWithMedia;
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
    if (filters.genre) queryParams.append("genres", filters.genre);
    if (filters.platform) queryParams.append("platforms", filters.platform);
    if (filters.tag) queryParams.append("tags", filters.tag);
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

    // Obtener videos y screenshots para cada juego en paralelo
    const gamesWithMedia = await Promise.all(
      data.results.map(async (game) => {
        try {
          const [screenshotsRes, videosRes] = await Promise.all([
            fetch(
              `https://api.rawg.io/api/games/${game.id}/screenshots?key=${key}&page_size=7`
            ),
            fetch(
              `https://api.rawg.io/api/games/${game.id}/movies?key=${key}&page_size=1`
            ),
          ]);

          const screenshots = screenshotsRes.ok
            ? (await screenshotsRes.json()).results
            : [];
          const videos = videosRes.ok ? (await videosRes.json()).results : [];

          return {
            ...game,
            screenshots,
            videos,
          };
        } catch (error) {
          console.error(`Error fetching media for game ${game.id}:`, error);
          return {
            ...game,
            screenshots: [],
            videos: [],
          };
        }
      })
    );

    const result = {
      results: gamesWithMedia,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };

    filteredGamesCache.set(cacheKey, result); // Guarda los datos en caché
    return result;
  } catch (error) {
    console.log("Error en getFilteredGames", error);
    return { results: [], count: 0, next: null, previous: null };
  }
};
