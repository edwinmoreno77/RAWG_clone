import { useState, useEffect } from "react";
import { useGameStore } from "../../../store/gameStore";
import { filterOptions } from "../../../constants/filterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { platformIcons } from "../../../constants/icons";
import { SpotlightSelect } from "./SpotlightSelect";
import {
  faGamepad,
  faFilter,
  faTimes,
  faSearch,
  faCog,
  faPlay,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = () => {
  const {
    filters,
    isSidebarOpen,
    setFilters,
    setFilteredData,
    resetFilters,
    closeSidebar,
  } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Sincronizar estados locales con el store
  useEffect(() => {
    if (filters) {
      // Para plataformas, convertir a número ya que vienen como string del select
      if (filters.platform) {
        const platformId =
          typeof filters.platform === "string"
            ? parseInt(filters.platform, 10)
            : filters.platform;
        setSelectedPlatforms([platformId]);
      } else {
        setSelectedPlatforms([]);
      }

      // Para géneros
      if (filters.genre) {
        setSelectedGenres([filters.genre]);
      } else {
        setSelectedGenres([]);
      }

      // Para tags
      if (filters.tag) {
        setSelectedTags([filters.tag]);
      } else {
        setSelectedTags([]);
      }
    }
  }, [filters]);

  // Manejar el cambio entre vistas
  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
  };

  // Generar años desde 1980 hasta el actual
  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFilters({ name, value });

    // Aplicar filtros automáticamente en vista avanzada
    if (advancedSearch) {
      await setFilteredData();
    }
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      await setFilteredData();
    } finally {
      setIsLoading(false);
      closeSidebar();
    }
  };

  const handleReset = async () => {
    resetFilters();
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedTags([]);
    closeSidebar();
  };

  const togglePlatform = async (platformId) => {
    const isSelected = selectedPlatforms.includes(platformId);

    if (isSelected) {
      // Deseleccionar
      setSelectedPlatforms([]);
      setFilters({
        name: "platform",
        value: null,
      });
    } else {
      // Seleccionar (solo uno a la vez)
      setSelectedPlatforms([platformId]);
      setFilters({
        name: "platform",
        value: platformId,
      });
    }

    // Aplicar filtros automáticamente
    await setFilteredData();
  };

  const toggleTags = async (tagSlug) => {
    const isSelected = selectedTags.includes(tagSlug);

    if (isSelected) {
      // Deseleccionar
      setSelectedTags([]);
      setFilters({
        name: "tag",
        value: null,
      });
    } else {
      // Seleccionar (solo uno a la vez)
      setSelectedTags([tagSlug]);
      setFilters({
        name: "tag",
        value: tagSlug,
      });
    }

    // Aplicar filtros automáticamente
    await setFilteredData();
  };

  const toggleGenre = async (genreSlug) => {
    const isSelected = selectedGenres.includes(genreSlug);

    if (isSelected) {
      // Deseleccionar
      setSelectedGenres([]);
      setFilters({
        name: "genre",
        value: null,
      });
    } else {
      // Seleccionar (solo uno a la vez)
      setSelectedGenres([genreSlug]);
      setFilters({
        name: "genre",
        value: genreSlug,
      });
    }

    // Aplicar filtros automáticamente
    await setFilteredData();
  };

  // Datos de ejemplo para la vista básica
  const platforms = [
    { name: "PC", id: 4 },
    { name: "Xbox Series S/X", id: 186 },
    { name: "Xbox One", id: 1 },
    { name: "PlayStation 5", id: 187 },
    { name: "PlayStation 4", id: 18 },
    { name: "PlayStation 3", id: 16 },
    { name: "PlayStation 2", id: 15, slug: "playstation2" },
    { name: "PlayStation", id: 27, slug: "playstation1" },
    { name: "Nintendo Switch", id: 7 },
    { name: "Wii", id: 11, slug: "wii" },
    { name: "iOS", id: 3 },
    { name: "Android", id: 21 },
  ];

  const genres = [
    { name: "Action", id: 4, slug: "action" },
    { name: "Adventure", id: 3, slug: "adventure" },
    { name: "RPG", id: 5, slug: "role-playing-games-rpg" },
    { name: "Shooter", id: 2, slug: "shooter" },
    { name: "Puzzle", id: 7, slug: "puzzle" },
    { name: "Sports", id: 11, slug: "sports" },
    { name: "Racing", id: 31, slug: "racing" },
    { name: "Arcade", id: 15, slug: "arcade" },
    { name: "Strategy", id: 10, slug: "strategy" },
    { name: "Fighting", id: 6, slug: "fighting" },
    { name: "Simulation", id: 14, slug: "simulation" },
    { name: "Educational", id: 34, slug: "educational" },
  ];

  const tags = [
    { name: "Multiplayer", id: 1, slug: "multiplayer" },
    { name: "Singleplayer", id: 2, slug: "singleplayer" },
    { name: "Tower Defense", id: 3, slug: "tower-defense" },
  ];

  const renderSelect = (name, label, optionsList) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-300 mb-2">
        {label}
      </label>
      <SpotlightSelect
        name={name}
        value={filters[name] || ""}
        onChange={handleChange}
        className="w-full bg-stone-900 hover:bg-stone-950 border border-stone-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
      >
        <option value="">All {label}</option>
        {optionsList.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </SpotlightSelect>
    </div>
  );

  const renderYearSelect = () => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-300 mb-2">
        Release Year
      </label>
      <SpotlightSelect
        name="year"
        value={filters.year || ""}
        onChange={handleChange}
        className="w-full bg-stone-800 border border-stone-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </SpotlightSelect>
    </div>
  );

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed z-30 top-0 left-0 h-full w-80 bg-stone-950 lg:bg-transparent backdrop-blur-sm text-white p-6 shadow-2xl border-r border-stone-800/50 lg:absolute overflow-y-auto scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent"
        >
          {/* Header del Sidebar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-lime-400 text-lg"
              />
              <h2 className="text-xl font-bold text-white">Filters</h2>
              {Object.values(filters).some((value) => value !== "") && (
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-stone-400" />
            </button>
          </div>

          {/* Toggle de búsqueda avanzada */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleAdvancedSearch}
            className="w-full bg-stone-800/80 backdrop-blur-sm hover:bg-stone-700/80 text-white py-3 px-4 rounded-xl transition-all duration-200 mb-6 flex items-center justify-center space-x-2 shadow-lg border border-stone-700/50"
          >
            <FontAwesomeIcon
              icon={advancedSearch ? faSearch : faCog}
              className="text-lime-400"
            />
            <span className="font-medium">
              {advancedSearch ? "Basic Search" : "Advanced Search"}
            </span>
          </motion.button>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full"
              />
            </div>
          ) : advancedSearch ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Botones de acción */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 bg-stone-700/80 backdrop-blur-sm hover:bg-stone-600/80 text-white py-3 rounded-xl transition-colors font-medium shadow-lg border border-stone-600/50"
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyFilters}
                  className="flex-1 bg-gradient-to-r from-lime-600/90 to-lime-500/90 hover:from-lime-500 hover:to-lime-400 text-white py-3 rounded-xl transition-colors font-medium shadow-lg border border-lime-500/50"
                >
                  Apply
                </motion.button>
              </div>

              {/* Filtros avanzados */}
              <div className="space-y-4">
                {renderSelect("platform", "Platforms", filterOptions.platforms)}
                {renderSelect("genre", "Genres", filterOptions.genres)}
                {renderSelect(
                  "developer",
                  "Developers",
                  filterOptions.developers
                )}
                {renderSelect("tag", "Tags", filterOptions.tags)}
                {renderYearSelect()}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Plataformas */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FontAwesomeIcon icon={faGamepad} className="text-lime-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Platforms
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-200 shadow-lg border ${
                        selectedPlatforms.includes(platform.id)
                          ? "bg-gradient-to-br from-lime-500/90 to-lime-600/90 shadow-lime-500/25 border-lime-500/50"
                          : "bg-stone-800/80 backdrop-blur-sm hover:bg-stone-700/80 border-stone-700/50"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={platformIcons[platform.name] || faGamepad}
                        className={`text-lg mb-2 ${
                          selectedPlatforms.includes(platform.id)
                            ? "text-white"
                            : "text-stone-300"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          selectedPlatforms.includes(platform.id)
                            ? "text-white"
                            : "text-stone-300"
                        }`}
                      >
                        {platform.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Géneros */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FontAwesomeIcon icon={faPlay} className="text-lime-400" />
                  <h3 className="text-lg font-semibold text-white">Genres</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleGenre(genre.slug)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-md border ${
                        selectedGenres.includes(genre.slug)
                          ? "bg-gradient-to-r from-lime-500/90 to-lime-600/90 text-white shadow-lime-500/25 border-lime-500/50"
                          : "bg-stone-800/80 backdrop-blur-sm hover:bg-stone-700/80 text-stone-300 border-stone-700/50"
                      }`}
                    >
                      {genre.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FontAwesomeIcon icon={faTags} className="text-lime-400" />
                  <h3 className="text-lg font-semibold text-white">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.button
                      key={tag.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleTags(tag.slug)}
                      className={`px-3 py-2 rounded-full transition-all duration-200 text-xs font-medium shadow-md border ${
                        selectedTags.includes(tag.slug)
                          ? "bg-gradient-to-r from-lime-500/90 to-lime-600/90 text-white shadow-lime-500/25 border-lime-500/50"
                          : "bg-stone-800/80 backdrop-blur-sm hover:bg-stone-700/80 text-stone-300 border-stone-700/50"
                      }`}
                    >
                      {tag.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
