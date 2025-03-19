import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context); // Acceder a las acciones globales

  const handleMenuClick = () => {
    actions.toggleSidebar(); // Alternar la visibilidad del Sidebar
  };

  return (
    <nav className="bg-stone-950 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex  space-x-4 font-bold">
          <li>
            <Link
              to={`/`}
              className="hover:text-gray-500 transition duration-300"
            >
              Games List
            </Link>
          </li>
          <li>
            <Link
              to={`/favorites`}
              className="hover:text-gray-500 transition duration-300"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to={`/search`}
              className="hover:text-gray-500 transition duration-300"
            >
              Search
            </Link>
          </li>
        </ul>
        <button
          onClick={handleMenuClick}
          className="text-white lg:hidden text-2xl font-bold"
          type="button"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
