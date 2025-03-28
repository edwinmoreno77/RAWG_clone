import { getFilteredGames } from "../api/getData";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      page: 1,
      isLoading: false,
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      isSidebarOpen: false,
      filters: {
        year: "",
        genre: "",
        platform: "",
        tag: "",
        developer: "",
      },
      filteredData: [],
    },

    actions: {
      startLoading: () => {
        setStore({ isLoading: true });
      },

      stopLoading: () => {
        setStore({ isLoading: false });
      },

      getPages: async () => {
        try {
          getActions().startLoading();
          const { filters, page } = getStore();
          const filteredData = await getFilteredGames(filters, page);
          setStore({ filteredData });
        } catch (error) {
          console.error("Error fetching filtered games:", error);
        } finally {
          getActions().stopLoading();
        }
      },
      increasePage: async () => {
        const { page } = getStore();
        if (page === 100) return;
        setStore({ page: page + 1 });
        await getActions().getPages();
      },

      decreasePage: async () => {
        const { page } = getStore();
        if (page === 1) return;
        setStore({ page: page - 1 });
        await getActions().getPages();
      },

      setPage: async (page) => {
        setStore({ page });
        await getActions().getPages();
      },

      addFavorites: (favorite) => {
        const { favorites } = getStore();
        const updatedFavorites = [...favorites, favorite];
        setStore({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },

      removeFavorites: (favorite) => {
        const { favorites } = getStore();
        const updatedFavorites = favorites.filter(
          (item) => item.id !== favorite.id
        );
        setStore({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },

      clearFavorites: () => {
        setStore({ favorites: [] });
        localStorage.removeItem("favorites");
      },

      toggleSidebar: () => {
        const { isSidebarOpen } = getStore();
        setStore({ isSidebarOpen: !isSidebarOpen });
      },

      closeSidebar: () => {
        setStore({ isSidebarOpen: false });
      },

      setFilters: ({ name, value }) => {
        const { filters } = getStore();
        setStore({ filters: { ...filters, [name]: value } });
      },

      resetFilters: async () => {
        setStore({
          filters: {
            year: "",
            genre: "",
            platform: "",
            tag: "",
            developer: "",
          },
        });
        setStore({ page: 1 });
        await getActions().getPages();
      },

      setFilteredData: async () => {
        const { filters } = getStore();
        getActions().startLoading();
        const filteredData = await getFilteredGames(filters, 1);
        setStore({ page: 1, filteredData });
        getActions().stopLoading();
      },
    },
  };
};

export default getState;
