import { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";

const key = import.meta.env.VITE_RAWG_API_KEY;

export const Sidebar = () => {
  const { store, actions } = useContext(Context);
  const [options, setOptions] = useState({
    genres: [],
    platforms: [],
    tags: [],
    developers: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Generar años desde 1980 hasta el actual
  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const endpoints = [
          { key: "genres", url: `https://api.rawg.io/api/genres?key=${key}` },
          {
            key: "platforms",
            url: `https://api.rawg.io/api/platforms?key=${key}`,
          },
          { key: "tags", url: `https://api.rawg.io/api/tags?key=${key}` },
          {
            key: "developers",
            url: `https://api.rawg.io/api/developers?key=${key}`,
          },
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint.url).then((res) => res.json())
          )
        );

        setOptions((prev) => ({
          ...prev,
          genres: responses[0].results,
          platforms: responses[1].results,
          tags: responses[2].results,
          developers: responses[3].results,
        }));
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    actions.setFilters({ name, value });
  };

  const handleApplyFilters = async () => {
    setIsLoading(true); // Activar el loading
    await actions.setFilteredData(); // Esperar a que se complete la acción
    setIsLoading(false); // Desactivar el loading
    actions.closeSidebar();
  };

  const handleReset = () => {
    actions.resetFilters();
    actions.closeSidebar();
  };

  const renderSelect = (name, label, optionsList) => (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select
        name={name}
        value={store.filters[name]}
        onChange={handleChange}
        className="w-full p-2 rounded bg-stone-800 text-white"
      >
        <option value="">All {label}</option>
        {optionsList.map((item) => (
          <option
            key={item.id}
            value={name === "platform" ? item.id : item.slug}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <aside
      className={`fixed z-10 top-0 left-0 h-full w-64 bg-stone-950 text-white p-4 transform ${
        store.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 lg:relative lg:translate-x-0`}
    >
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Mostrar el spinner si está cargando */}
      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {/* Year Select */}
          <div className="mb-4">
            <label className="block mb-1">Year</label>
            <select
              name="year"
              value={store.filters.year}
              onChange={handleChange}
              className="w-full p-2 rounded bg-stone-800 text-white"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {renderSelect("genre", "Genres", options.genres)}
          {renderSelect("platform", "Platforms", options.platforms)}
          {renderSelect("tag", "Tags", options.tags)}
          {renderSelect("developer", "Developers", options.developers)}

          <div className="flex gap-1">
            <button
              onClick={handleReset}
              className="w-full bg-white hover:bg-stone-800 text-black hover:text-white py-2 px-2 rounded"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-full bg-white hover:bg-stone-800 text-black hover:text-white py-2 px-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
