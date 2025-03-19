import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

const key = import.meta.env.VITE_RAWG_API_KEY;

export const Sidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: "",
  });

  const [options, setOptions] = useState({
    genres: [],
    platforms: [],
    tags: [],
    developers: [],
  });

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
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const renderSelect = (name, label, optionsList) => (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select
        name={name}
        value={filters[name]}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white"
      >
        <option value="">All {label}</option>
        {optionsList.map((item) => (
          <option key={item.id} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Year Select */}
      <div className="mb-4">
        <label className="block mb-1">Year</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
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

      <button
        onClick={handleApplyFilters}
        className="w-full bg-white hover:bg-black text-black hover:text-white py-2 px-4 rounded"
      >
        Apply Filters
      </button>
    </aside>
  );
};

Sidebar.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
