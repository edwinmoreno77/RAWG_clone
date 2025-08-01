import { create } from "zustand";
import { getFilteredGames } from "../api/getData";

export const useGameStore = create((set, get) => ({
  // Estado inicial
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
    ordering: "",
  },
  filteredData: [],

  // Acciones
  startLoading: () => {
    set({ isLoading: true });
  },

  stopLoading: () => {
    set({ isLoading: false });
  },

  getPages: async () => {
    try {
      get().startLoading();
      const { filters, page } = get();
      const filteredData = await getFilteredGames(filters, page);
      set({ filteredData });
    } catch (error) {
      console.error("Error fetching filtered games:", error);
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

  increasePage: async () => {
    const { page } = get();
    if (page === 100) return;
    set({ page: page + 1 });
    await get().getPages();
  },

  decreasePage: async () => {
    const { page } = get();
    if (page === 1) return;
    set({ page: page - 1 });
    await get().getPages();
  },

  setPage: async (page) => {
    set({ page });
    await get().getPages();
  },

  addFavorites: (favorite) => {
    const { favorites } = get();
    const updatedFavorites = [...favorites, favorite];
    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  },

  removeFavorites: (favorite) => {
    const { favorites } = get();
    const updatedFavorites = favorites.filter(
      (item) => item.id !== favorite.id
    );
    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  },

  clearFavorites: () => {
    set({ favorites: [] });
    localStorage.removeItem("favorites");
  },

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

  setFilters: ({ name, value }) => {
    const { filters } = get();
    set({ filters: { ...filters, [name]: value } });
  },

  resetFilters: async () => {
    set({
      filters: {
        year: "",
        genre: "",
        platform: "",
        tag: "",
        developer: "",
        ordering: "",
      },
      page: 1,
    });
    await get().getPages();
  },

  setFilteredData: async () => {
    const { filters } = get();
    get().startLoading();
    const filteredData = await getFilteredGames(filters, 1);
    set({ page: 1, filteredData });
    get().stopLoading();
  },
}));
