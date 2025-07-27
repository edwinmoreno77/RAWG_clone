import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { SearchInput } from "./SearchInput";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const location = useLocation();

  const handleMenuClick = () => {
    actions.toggleSidebar();
  };

  return (
    <nav className="bg-transparent p-4 text-stone-400 z-40 w-full">
      <div className="w-full px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <Link className="flex items-center" to="/">
              <h1 className="text-2xl bg-stone-300 bg-clip-text text-transparent hover:bg-white transition-all duration-300 font-extrabold hover:brightness-150">
                R A W G
              </h1>
              <span className="text-sm ml-2 text-stone-400 hover:text-stone-200 transition-all duration-300">
                Clone
              </span>
            </Link>
          </div>

          {/* Input de búsqueda en el centro */}
          <div className="flex-1 flex justify-center px-8 max-w-7xl">
            <SearchInput />
          </div>

          {/* Iconos a la derecha */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center hover:text-white hover:brightness-150 ${
                  isActive ? "text-white" : "text-stone-400"
                }`
              }
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg hover:drop-shadow-md"
              />
              <span className="absolute bottom-100 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Search
              </span>
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center hover:text-white hover:brightness-150 ${
                  isActive ? "text-white" : "text-stone-400"
                }`
              }
            >
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-lg hover:drop-shadow-md"
              />
              <span className="absolute bottom-100 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Favorites
              </span>
            </NavLink>

            {location.pathname === "/" && (
              <button
                onClick={handleMenuClick}
                className="text-white lg:hidden text-xl font-bold"
                type="button"
              >
                <FontAwesomeIcon icon={faFilter} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link className="flex items-center" to="/">
              <h1 className="text-xl bg-stone-100 bg-clip-text text-transparent font-extrabold">
                R A W G
              </h1>
              <span className="text-sm ml-2 text-stone-400 hover:text-stone-200 transition-all duration-300">
                Clone
              </span>
            </Link>

            {/* Iconos */}
            <div className="flex items-center space-x-4">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-stone-400"
                }
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-lg hover:drop-shadow-md"
                />
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-stone-400"
                }
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-lg hover:drop-shadow-md"
                />
              </NavLink>

              {location.pathname === "/" && (
                <button
                  onClick={handleMenuClick}
                  className="text-white text-xl font-bold"
                  type="button"
                >
                  <FontAwesomeIcon icon={faFilter} />
                </button>
              )}
            </div>
          </div>

          {/* Input de búsqueda móvil */}
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
      </div>
    </nav>
  );
};
