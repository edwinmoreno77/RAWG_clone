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
    if (page) queryParams.append("page", page);

    queryParams.append("ordering", "-metacritic");
    queryParams.append("metacritic", "0,100");
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
