import { useGameStore } from "../store/gameStore";

export const useFavorites = () => {
  const { favorites, getFavoritesCount } = useGameStore();

  // Calcular estadísticas de favoritos
  const favoritesCount = getFavoritesCount();
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
