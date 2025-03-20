import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const { actions } = useContext(Context);

  const handleMenuClick = () => {
    actions.toggleSidebar();
  };

  return (
    <nav className="bg-stone-950 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between lg:justify-center">
        <ul className="flex items-center space-x-4">
          <li className="group relative flex flex-col items-center justify-center">
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} className="text-lg" />
            </Link>
            <span className="absolute bottom-100 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Home
            </span>
          </li>
          <li className="group relative flex flex-col items-center justify-center">
            <Link to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
            </Link>
            <span className="absolute bottom-100 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Search
            </span>
          </li>
          <li className="group relative flex flex-col items-center justify-center">
            <Link to="/favorites">
              <FontAwesomeIcon icon={faBookmark} className="text-lg" />
            </Link>
            <span className="absolute bottom-100 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Favorites
            </span>
          </li>
        </ul>
        <button
          onClick={handleMenuClick}
          className="text-white lg:hidden text-xl font-bold"
          type="button"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
