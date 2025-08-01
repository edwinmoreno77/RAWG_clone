import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getFilteredGames } from "../api/getData";

// Tipos para mejor organización
const initialState = {
  page: 1,
  isLoading: false,
  error: null,
  favorites: [],
  isSidebarOpen: true,
  filters: {
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: "",
    ordering: "",
  },
  filteredData: [],
  totalPages: 0,
  totalResults: 0,
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Acciones de carga
      startLoading: () => {
        set({ isLoading: true, error: null });
      },

      stopLoading: () => {
        set({ isLoading: false });
      },

      setError: (error) => {
        set({ error, isLoading: false });
        console.error("GameStore Error:", error);
      },

      clearError: () => {
        set({ error: null });
      },

      // Acciones de datos
      getPages: async () => {
        try {
          get().startLoading();
          const { filters, page } = get();
          const response = await getFilteredGames(filters, page);

          // Asumiendo que getFilteredGames devuelve { results, count, next, previous }
          const filteredData = response.results || response;
          const totalResults = response.count || 0;
          const totalPages = Math.ceil(totalResults / 20); // 20 resultados por página

          set({
            filteredData,
            totalResults,
            totalPages,
            error: null,
          });
        } catch (error) {
          get().setError(error);
        } finally {
          get().stopLoading();
        }
      },

      setOrdering: async (ordering) => {
        const { filters } = get();
        set({
          filters: { ...filters, ordering },
          page: 1,
        });
        await get().getPages();
      },

      // Acciones de paginación
      increasePage: async () => {
        const { page, totalPages } = get();
        if (page >= totalPages || page >= 100) return;
        set({ page: page + 1 });
        await get().getPages();
      },

      decreasePage: async () => {
        const { page } = get();
        if (page <= 1) return;
        set({ page: page - 1 });
        await get().getPages();
      },

      setPage: async (page) => {
        const { totalPages } = get();
        if (page < 1 || page > totalPages || page > 100) return;
        set({ page });
        await get().getPages();
      },

      // Acciones de favoritos optimizadas
      addFavorites: (favorite) => {
        const { favorites } = get();
        // Evitar duplicados
        if (favorites.some((fav) => fav.id === favorite.id)) return;

        const updatedFavorites = [...favorites, favorite];
        set({ favorites: updatedFavorites });
      },

      removeFavorites: (favorite) => {
        const { favorites } = get();
        const updatedFavorites = favorites.filter(
          (item) => item.id !== favorite.id
        );
        set({ favorites: updatedFavorites });
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      // Acciones del sidebar
      toggleSidebar: () => {
        const { isSidebarOpen } = get();
        set({ isSidebarOpen: !isSidebarOpen });
      },

      closeSidebar: () => {
        set({ isSidebarOpen: false });
      },

      openSidebar: () => {
        set({ isSidebarOpen: true });
      },

      // Acciones de filtros optimizadas
      setFilters: ({ name, value }) => {
        const { filters } = get();
        const newFilters = { ...filters, [name]: value };
        set({ filters: newFilters });
      },

      setMultipleFilters: (newFilters) => {
        const { filters } = get();
        set({ filters: { ...filters, ...newFilters } });
      },

      resetFilters: async () => {
        set({
          filters: initialState.filters,
          page: 1,
        });
        await get().getPages();
      },

      setFilteredData: async () => {
        const { filters } = get();
        get().startLoading();
        try {
          const response = await getFilteredGames(filters, 1);
          const filteredData = response.results || response;
          const totalResults = response.count || 0;
          const totalPages = Math.ceil(totalResults / 20);

          set({
            page: 1,
            filteredData,
            totalResults,
            totalPages,
            error: null,
          });
        } catch (error) {
          get().setError(error);
        } finally {
          get().stopLoading();
        }
      },

      // Acciones de utilidad
      resetStore: () => {
        set(initialState);
      },

      // Getters computados
      getFavoritesCount: () => {
        const { favorites } = get();
        return favorites.length;
      },

      isFavorite: (gameId) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.id === gameId);
      },

      getCurrentFilters: () => {
        const { filters } = get();
        return Object.entries(filters).filter(([, value]) => value !== "");
      },

      hasActiveFilters: () => {
        const { filters } = get();
        return Object.values(filters).some((value) => value !== "");
      },
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => localStorage),
      // Solo persistir datos que necesitan sobrevivir a recargas
      partialize: (state) => ({
        favorites: state.favorites,
        isSidebarOpen: state.isSidebarOpen,
        filters: state.filters,
      }),
    }
  )
);
