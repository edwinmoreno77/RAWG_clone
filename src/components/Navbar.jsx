import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [hidden, sethidden] = useState(true);

  const handlerMenu = () => {
    sethidden(!hidden);
  };

  return (
    <nav className="bg-stone-950 p-4 text-white">
      <div className="container mx-auto lg:flex items-center justify-center">
        <button
          onClick={handlerMenu}
          className={`${
            !hidden ? "mb-3 brightness-150" : ""
          }  text-white lg:mb-0 block lg:hidden`}
          type="button"
        >
          <span className="text-white text-2xl font-bold">Menu</span>
        </button>
        <ul
          className={`${
            hidden && "hidden"
          } lg:flex space-x-0 lg:space-x-4 font-bold`}
        >
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
      </div>
    </nav>
  );
};
