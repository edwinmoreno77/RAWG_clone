import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { filterOptions } from "../constants/filterOptions";
import { SpotlightSelect } from "./SpotlightSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  // Generar años desde 1980 hasta el actual
  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    actions.closeSidebar();
  };

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
      className={`fixed z-50 top-0 left-0 h-full w-56  bg-stone-950  lg:bg-transparent text-white p-3 transform ${
        store.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 lg:relative lg:translate-x-0`}
    >
      <h2 className="text-base font-bold mb-4">
        {" "}
        <FontAwesomeIcon icon={faFilter} />
        <span className="mx-2">Filters</span>
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {renderSelect("platform", "Platforms", filterOptions.platforms)}

          {renderSelect("genre", "Genres", filterOptions.genres)}
          {renderSelect("developer", "Developers", filterOptions.developers)}
          {renderSelect("tag", "Tags", filterOptions.tags)}
          {/* Year Select */}
          {renderYearSelect()}

          <div className="flex gap-1 mt-4 text-xs">
            <button
              onClick={handleReset}
              className="w-full bg-white hover:bg-stone-800 text-black hover:text-white py-2 px-2 rounded transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-full bg-white hover:bg-stone-800 text-black hover:text-white py-2 px-2 rounded transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
