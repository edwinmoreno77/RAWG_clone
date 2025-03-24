const key = import.meta.env.VITE_RAWG_API_KEY;

const gameCache = new Map();

// debe llamar a dos urls diferentes para obtener la información de un juego
// la primera url es para obtener la información general del juego
// la segunda url es para obtener screenshots del juego
export const getGameById = async (id) => {
  if (gameCache.has(id)) {
    return gameCache.get(id); // Devuelve los datos en caché si están disponibles
  }

  try {
    // Realizar la primera solicitud para obtener la información general del juego
    const gameResponse = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!gameResponse.ok) {
      throw new Error(
        `Error en la solicitud del juego: ${gameResponse.status} ${gameResponse.statusText}`
      );
    }

    const gameData = await gameResponse.json();

    // Realizar la segunda solicitud para obtener los screenshots del juego
    const screenshotsResponse = await fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!screenshotsResponse.ok) {
      throw new Error(
        `Error en la solicitud de screenshots: ${screenshotsResponse.status} ${screenshotsResponse.statusText}`
      );
    }

    const screenshotsData = await screenshotsResponse.json();

    // Combinar los datos del juego con los screenshots
    const combinedData = {
      ...gameData,
      screenshots: screenshotsData.results || [], // Agregar screenshots al objeto
    };

    gameCache.set(id, combinedData); // Guardar en caché
    return combinedData;
  } catch (error) {
    console.log("Error capturado en getGameById", error);
    return null; // Devuelve null si alguna de las solicitudes falla
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
