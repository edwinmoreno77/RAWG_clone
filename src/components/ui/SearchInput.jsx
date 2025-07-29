import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getGameByName } from "../../api/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { SearchResultItem } from "./SearchResultItem";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Hook para el efecto spotlight
  const {
    inputRef,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useSpotlightBorder();

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        performSearch(searchTerm);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (term) => {
    setIsLoading(true);
    try {
      const results = await getGameByName(term);
      setSearchResults(results?.slice(0, 8) || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleViewAll = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleViewAll();
    }
  };

  return (
    <div className="relative w-full max-w-5xl" ref={dropdownRef}>
      <div className="relative w-full group">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 transition group-hover:text-white ${
            searchTerm !== "" ? "animate-pulse" : ""
          }`}
        />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-200 hover:text-white hover:scale-125 transition ${
            searchTerm !== "" ? "block" : "hidden"
          } cursor-pointer z-20`}
          onClick={clearInput}
        />

        <input
          className="form-input w-full p-3 pl-10 pr-10 bg-stone-900 hover:bg-black text-white rounded-3xl shadow-lg focus:bg-black focus:text-white hover:placeholder-white text-sm border border-stone-600 focus:border-stone-400 transition-all duration-300"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Efecto spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
            border: "1.5px solid #ffffff",
          }}
        />
      </div>

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-stone-800 rounded-lg shadow-xl border border-stone-700 z-30 lg:z-50 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
          {isLoading ? (
            <div className="p-4 text-center text-stone-400">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              {searchResults.map((game) => (
                <SearchResultItem
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                />
              ))}
              <div
                className="p-3 hover:bg-stone-700 cursor-pointer transition-colors text-center border-t border-stone-700"
                onClick={handleViewAll}
              >
                <span className="text-lime-400 hover:text-lime-300 text-sm font-medium">
                  See all results
                </span>
              </div>
            </>
          ) : searchTerm.trim().length >= 2 ? (
            <div className="p-4 text-center text-stone-400">
              <p className="text-sm">No results found</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
