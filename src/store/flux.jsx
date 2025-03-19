import { getPages } from "../api/getData";
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
    },

    actions: {
      getPages: async () => {
        const { page } = getStore();
        const pageData = await getPages(page);
        setStore({ pageData });
      },
      increasePage: () => {
        const { page } = getStore();
        if (page === 42) return;
        const newPage = page + 1;
        setStore({ page: newPage });
      },
      decreasePage: () => {
        const { page } = getStore();
        if (page === 0) return;
        const newPage = page - 1;
        setStore({ page: newPage });
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
        const newFavorites = favorites.filter((item) => item.id != favorite.id);
        setStore({ favorites: newFavorites });
      },
    },
  };
};

export default getState;
