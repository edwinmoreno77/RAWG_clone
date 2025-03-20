import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { motion } from "framer-motion";

const CardComponent = ({ item }) => {
  const { actions, store } = useContext(Context);
  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id == item.id);
  const [like, setLike] = useState(isFavorite);

  const handlerLikes = (like, id) => {
    if (!favorites.some((favorite) => favorite.id == id)) {
      addFavorites(item);
    } else {
      removeFavorites(item);
    }
    setLike(!like);
  };

  return (
    <motion.article
      key={item?.id}
      className="flex justify-center items-center p-2"
      initial={{ opacity: 0, scale: 0.9 }} // Estado inicial (invisible y más pequeño)
      animate={{ opacity: 1, scale: 1 }} // Estado final (visible y tamaño normal)
      exit={{ opacity: 0, scale: 0.9 }} // Estado al salir (desaparece y se reduce)
      transition={{ duration: 0.3 }} // Duración de la animación
    >
      <div className="w-auto h-auto transition ease-in-out duration-300 bg-stone-900 text-white hover:text-black hover:bg-white scale-95 hover:scale-105 rounded-lg shadow-md hover:shadow-2xl brightness-95 hover:brightness-105 hover:skew-y-1">
        <Link to={`${item?.id}`}>
          <img
            src={item?.background_image}
            className="w-full h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
            alt={item.name}
          />
        </Link>
        <div className="p-4 brightness-110">
          <h5 className="text-lg font-semibold">{item?.name}</h5>
          <div className="flex justify-between">
            <span>rating: {item.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to={`${item?.id}`}
              className="mt-2 text-xs inline-block transition ease-in-out hover:scale-105 bg-slate-500 text-white py-1 px-2 rounded hover:bg-slate-900"
            >
              Read more
            </Link>
            <button onClick={() => handlerLikes(like, item.id)}>
              <FontAwesomeIcon
                icon={faBookmark}
                className={`cursor-pointer text-lg transition ease-in-out hover:scale-125 ${
                  like ? "text-lime-600" : "text-stone-700"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const Card = memo(CardComponent);

CardComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    species: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
