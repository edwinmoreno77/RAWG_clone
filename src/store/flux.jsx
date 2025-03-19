import { getGamesPage } from "../api/getData";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// Agregar íconos a la biblioteca
library.add(faHeart, faArrowLeft, faArrowRight);

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      page: 1,
      pageData: null,
      favorites: [],
      isSidebarOpen: false,
      filters: {
        year: "",
        genre: "",
        platform: "",
        tag: "",
        developer: "",
      },
    },

    actions: {
      getPages: async () => {
        const { page } = getStore();
        const pageData = await getGamesPage(page);
        setStore({ pageData });
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
        setStore({ favorites: [...favorites, favorite] });
      },

      removeFavorites: (favorite) => {
        const { favorites } = getStore();
        const newFavorites = favorites.filter(
          (item) => item.id !== favorite.id
        );
        setStore({ favorites: newFavorites });
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
    },
  };
};

export default getState;
