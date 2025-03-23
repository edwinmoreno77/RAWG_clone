const key = import.meta.env.VITE_RAWG_API_KEY;

const gameCache = new Map();

export const getGameById = async (id) => {
  if (gameCache.has(id)) {
    return gameCache.get(id); // Devuelve los datos en caché si están disponibles
  }

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${key}`,
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
    gameCache.set(id, data); // Guarda los datos en caché
    return data;
  } catch (error) {
    console.log("Error capturado en el fetch", error);
    return null; // Devuelve null si la petición falla
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

// const filteredGamesCache = new Map();

// export const getFilteredGames = async (filters, page) => {
//   const cacheKey = JSON.stringify({ filters, page });
//   if (filteredGamesCache.has(cacheKey)) {
//     return filteredGamesCache.get(cacheKey); // Devuelve los datos en caché si están disponibles
//   }

//   try {
//     const queryParams = new URLSearchParams();

//     if (filters.year) {
//       queryParams.append(
//         "dates",
//         `${filters.year}-01-01,${filters.year}-12-31`
//       );
//     }
//     if (filters.genre) queryParams.append("genres", filters.genre);
//     if (filters.platform) queryParams.append("platforms", filters.platform);
//     if (filters.tag) queryParams.append("tags", filters.tag);
//     if (filters.developer) queryParams.append("developers", filters.developer);
//     if (page) queryParams.append("page", page);

//     queryParams.append("ordering", "-metacritic");
//     queryParams.append("metacritic", "0,100");
//     queryParams.append("key", key);

//     const response = await fetch(
//       `https://api.rawg.io/api/games?${queryParams.toString()}`
//     );
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }
//     const data = await response.json();
//     filteredGamesCache.set(cacheKey, data.results); // Guarda los datos en caché
//     return data.results;
//   } catch (error) {
//     console.log("Error en getFilteredGames", error);
//     return [];
//   }
// };

const filteredGamesCache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos en milisegundos
const MAX_CACHE_SIZE = 100; // Máximo 100 entradas en caché

// Normaliza las claves para evitar duplicados por orden de propiedades
const getCacheKey = (filters, page) => {
  const sortedFilters = Object.keys(filters)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: filters[key] }), {});

  return JSON.stringify({ filters: sortedFilters, page });
};

export const getFilteredGames = async (filters = {}, page = 1) => {
  const cacheKey = getCacheKey(filters, page);

  // Verificar y devolver caché válida
  if (filteredGamesCache.has(cacheKey)) {
    const { data, expiresAt } = filteredGamesCache.get(cacheKey);

    if (Date.now() < expiresAt) {
      // Actualizar timestamp para LRU
      filteredGamesCache.set(cacheKey, {
        data,
        expiresAt,
        timestamp: Date.now(),
      });
      return data;
    }

    filteredGamesCache.delete(cacheKey); // Eliminar entrada expirada
  }

  try {
    // Evitar llamadas duplicadas pendientes
    if (filteredGamesCache.has(cacheKey)) {
      const pendingPromise = filteredGamesCache.get(cacheKey);
      return await pendingPromise;
    }

    const queryParams = new URLSearchParams();

    // Construcción de parámetros
    const { year, genre, platform, tag, developer } = filters;
    if (year) queryParams.append("dates", `${year}-01-01,${year}-12-31`);
    if (genre) queryParams.append("genres", genre);
    if (platform) queryParams.append("platforms", platform);
    if (tag) queryParams.append("tags", tag);
    if (developer) queryParams.append("developers", developer);
    if (page) queryParams.append("page", page);

    queryParams.append("ordering", "-metacritic");
    queryParams.append("metacritic", "0,100");
    queryParams.append("key", key);

    // Crear promesa y guardar en caché
    const fetchPromise = fetch(
      `https://api.rawg.io/api/games?${queryParams.toString()}`
    )
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Limpiar caché si excede tamaño máximo (estrategia LRU básica)
        if (filteredGamesCache.size >= MAX_CACHE_SIZE) {
          const oldestKey = [...filteredGamesCache.keys()].reduce((a, b) =>
            filteredGamesCache.get(a).timestamp <
            filteredGamesCache.get(b).timestamp
              ? a
              : b
          );
          filteredGamesCache.delete(oldestKey);
        }

        // Guardar en caché con TTL
        filteredGamesCache.set(cacheKey, {
          data: data.results,
          expiresAt: Date.now() + CACHE_TTL,
          timestamp: Date.now(),
        });

        return data.results;
      })
      .catch((error) => {
        filteredGamesCache.delete(cacheKey); // Limpiar en caso de error
        throw error;
      });

    filteredGamesCache.set(cacheKey, fetchPromise); // Guardar promesa pendiente

    return await fetchPromise;
  } catch (error) {
    console.error("Error en getFilteredGames:", error);
    return [];
  }
};
