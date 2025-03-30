import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { motion } from "framer-motion";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import { PlatformIcons } from "./PlatformIcons";
const DEFAULT_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

const CardComponent = ({ item }) => {
  const { actions, store } = useContext(Context);
  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id === item.id);
  const [like, setLike] = useState(isFavorite);

  // Hook para el efecto en el card
  const {
    inputRef: cardRef,
    position: cardPosition,
    opacity: cardOpacity,
    handleMouseMove: handleMouseMoveCard,
    handleMouseEnter: handleMouseEnterCard,
    handleMouseLeave: handleMouseLeaveCard,
  } = useSpotlightBorder();

  const handlerLikes = (like, id) => {
    if (!favorites.some((favorite) => favorite.id === id)) {
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMoveCard}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        className="relative w-auto h-auto transition ease-in-out duration-300 bg-stone-900 hover:bg-stone-800 text-white  scale-95 hover:scale-105 rounded-lg shadow-md hover:shadow-2xl brightness-95 hover:brightness-105"
      >
        {/* Efecto de borde animado igual que en el input */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{
            opacity: cardOpacity,
            border: "1.5px solid #ffffff",
            WebkitMaskImage: `radial-gradient(50% 200px at ${cardPosition.x}px ${cardPosition.y}px, black 50%, transparent)`,
          }}
        />
        <Link to={`${item?.id}`}>
          <img
            src={item?.background_image || DEFAULT_IMAGE}
            className="w-full h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
            alt={item.name}
          />
        </Link>
        <div className="p-4 brightness-110 relative z-10">
          <PlatformIcons platforms={item?.platforms} />
          <h5 className="text-lg font-bold">{item?.name}</h5>
          <div className="flex justify-between">
            <div className="text-xs">
              <span className="">
                metacritic:{" "}
                {item?.metacritic !== null ? item.metacritic : "Not available"}
              </span>
            </div>
            <div className="text-xs">
              <span>
                rating: {item?.rating !== null ? item.rating : "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to={`${item?.id}`}
              className="inline-flex mt-2 h-8 animate-background-shine items-center justify-center rounded-md border-2 border-stone-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-gray-200 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 font-cursive text-xs"
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
// agregar platforms
CardComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    species: PropTypes.string,
    rating: PropTypes.number,
    metacritic: PropTypes.number,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
  }).isRequired,
};
