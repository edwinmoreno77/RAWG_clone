import { useState, useContext } from "react";
import { Context } from "../../../store/appContext";
import { filterOptions } from "../../../constants/filterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { platformIcons } from "../../../constants/icons";
import { SpotlightSelect } from "./SpotlightSelect";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false); // Estado para alternar vistas
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Estado para plataformas seleccionadas
  const [selectedGenres, setSelectedGenres] = useState([]); // Estado para géneros seleccionados

  // Generar años desde 1980 hasta el actual
  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected value:", value); // Agregado para depuración
    actions.setFilters({ name, value });
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    await actions.setFilteredData();
    setIsLoading(false);
    actions.closeSidebar();
  };

  const handleReset = () => {
    actions.resetFilters();
    setSelectedPlatforms([]); // Reiniciar plataformas seleccionadas
    setSelectedGenres([]); // Reiniciar géneros seleccionados
    actions.closeSidebar();
  };

  const togglePlatform = async (platformId) => {
    const isSelected = selectedPlatforms.includes(platformId);
    const updatedPlatforms = isSelected
      ? selectedPlatforms.filter((id) => id !== platformId)
      : [...selectedPlatforms, platformId];

    setSelectedPlatforms(updatedPlatforms);

    // Aplicar o quitar el filtro
    actions.setFilters({
      name: "platform",
      value: isSelected ? null : platformId,
    });

    // Ejecutar la búsqueda con los filtros aplicados
    await actions.setFilteredData();
  };

  const toggleGenre = async (genreSlug) => {
    const isSelected = selectedGenres.includes(genreSlug);
    const updatedGenres = isSelected
      ? selectedGenres.filter((slug) => slug !== genreSlug)
      : [...selectedGenres, genreSlug];

    setSelectedGenres(updatedGenres);

    // Aplicar o quitar el filtro
    actions.setFilters({
      name: "genre",
      value: isSelected ? null : genreSlug,
    });

    // Ejecutar la búsqueda con los filtros aplicados
    await actions.setFilteredData();
  };

  const platforms = [
    { name: "PC", id: 4 },
    { name: "Xbox One", id: 1 },
    { name: "Xbox Series S/X", id: 186 },
    { name: "PlayStation 5", id: 187 },
    { name: "PlayStation 4", id: 18 },
    { name: "PlayStation 3", id: 16 },
    { name: "Nintendo Switch", id: 7 },
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
  ];

  const renderSelect = (name, label, optionsList) => (
    <SpotlightSelect
      name={name}
      label={label}
      value={store.filters[name] || ""}
      onChange={handleChange}
    >
      <option value="">All {label}</option>
      {optionsList.map((item) => (
        <option key={item.id} value={name === "platform" ? item.id : item.slug}>
          {item.name}
        </option>
      ))}
    </SpotlightSelect>
  );

  const renderYearSelect = () => (
    <SpotlightSelect
      name="year"
      label="Year"
      value={store.filters.year || ""}
      onChange={handleChange}
    >
      <option value="">All Years</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </SpotlightSelect>
  );

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full w-80 bg-stone-950 lg:bg-transparent text-white p-3 transform  ${
        store.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 lg:relative lg:translate-x-0`}
    >
      {/* Botón de búsqueda avanzada */}
      <button
        onClick={() => setAdvancedSearch(!advancedSearch)}
        className="w-full bg-stone-800 hover:bg-stone-600 text-white py-1 px-1 mt-1 rounded transition-colors mb-4"
      >
        {advancedSearch ? "Basic Search" : "Advanced Search"}
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : advancedSearch ? (
        <>
          {/* Botones de aplicar y resetear filtros */}
          <div className="flex w-full gap-1 my-2 mb-6 text-xs">
            <button
              onClick={handleReset}
              className="w-full bg-stone-700 hover:bg-stone-600 text-white py-2 rounded transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-full bg-stone-700 hover:bg-stone-600 text-white py-2 rounded transition-colors"
            >
              Apply Filters
            </button>
          </div>
          {/* Vista de búsqueda avanzada */}
          {renderSelect("platform", "Platforms", filterOptions.platforms)}
          {renderSelect("genre", "Genres", filterOptions.genres)}
          {renderSelect("developer", "Developers", filterOptions.developers)}
          {renderSelect("tag", "Tags", filterOptions.tags)}
          {renderYearSelect()}
        </>
      ) : (
        <>
          {/* Vista básica con íconos */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2">Platforms</h3>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex flex-col items-center w-24 h-12 ${
                    selectedPlatforms.includes(platform.id)
                      ? "bg-lime-600 hover:bg-lime-400"
                      : "bg-stone-800 hover:bg-stone-700"
                  }  rounded-lg shadow-md p-1 transition-colors`}
                >
                  <FontAwesomeIcon
                    icon={platformIcons[platform.name] || faGamepad} // Fallback a un ícono genérico
                    className="text-white text-lg"
                  />
                  <span className="text-xs mt-1">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2">Genres</h3>
            <div className="grid grid-cols-4 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.slug)}
                  className={`flex flex-col items-center w-16 h-10 ${
                    selectedGenres.includes(genre.slug)
                      ? "bg-lime-600 hover:bg-lime-400"
                      : "bg-stone-800 hover:bg-stone-700"
                  }  rounded-lg shadow-md p-2 transition-colors`}
                >
                  <span className="text-xs mt-1">{genre.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
