import { getFilteredGames } from "../api/getData";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      page: 1,
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
      getPages: async () => {
        const { filters, page } = getStore();
        const filteredData = await getFilteredGames(filters, page);
        setStore({ filteredData });
      },

      increasePage: () => {
        const { page } = getStore();
        if (page === 42) return;
        const newPage = page + 1;
        setStore({ page: newPage });
        getActions().getPages();
      },

      decreasePage: () => {
        const { page } = getStore();
        if (page === 0) return;
        const newPage = page - 1;
        setStore({ page: newPage });
        getActions().getPages();
      },

      setPage: (page) => {
        setStore({ page });
        getActions().getPages();
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
      resetFilters: () => {
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
        getActions().getPages();
      },
      setFilteredData: async () => {
        const { filters } = getStore();
        const filteredData = await getFilteredGames(filters, 1);
        setStore({ page: 1 });
        setStore({ filteredData });
      },
    },
  };
};

export default getState;
