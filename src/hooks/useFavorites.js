import { useContext } from "react";
import { Context } from "../store/appContext";

export const useFavorites = () => {
  const { store } = useContext(Context);
  const { favorites } = store;

  // Calcular estadísticas de favoritos
  const favoritesCount = favorites.length;
  const hasFavorites = favoritesCount > 0;

  // Calcular lastRowItems para la grilla
  const lastRowItems = favoritesCount > 5 ? Math.min(favoritesCount - 5, 5) : 0;

  return {
    favorites,
    favoritesCount,
    hasFavorites,
    lastRowItems,
  };
};
