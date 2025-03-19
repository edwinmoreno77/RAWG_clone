const key = import.meta.env.VITE_RAWG_API_KEY;

export const getGameById = async (id) => {
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

    return data;
  } catch (error) {
    console.log("Error capturado en el fetch", error);
  }
};

export const getGamesPage = async (page) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic&metacritic=0,100&page=${page}&key=${key}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error capturado en el fetch", error);
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
  }
};

export const getFilteredGames = async (filters) => {
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

    // Agregar siempre el orden y filtro por metacritic
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
    console.log(data);
    return data.results;
  } catch (error) {
    console.log("Error en getFilteredGames", error);
  }
};
