import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { motion } from "framer-motion";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { PlatformIcons } from "./PlatformIcons";
import { useTilt } from "../../hooks/useTilt";

const DEFAULT_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

const CardComponent = ({ item }) => {
  const { actions, store } = useContext(Context);
  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id === item.id);
  const [like, setLike] = useState(isFavorite);
  const [isHovered, setIsHovered] = useState(false);

  // Hook para el efecto en el card
  const {
    inputRef: cardRef,
    position: cardPosition,
    opacity: cardOpacity,
    handleMouseMove: handleMouseMoveCard,
    handleMouseEnter: handleMouseEnterCard,
    handleMouseLeave: handleMouseLeaveCard,
  } = useSpotlightBorder();

  // Hook para el efecto tilt sutil en la tarjeta
  const {
    rotate: cardRotate,
    onMouseMove: cardOnMouseMove,
    onMouseLeave: cardOnMouseLeave,
  } = useTilt({ max: 6 }); // max menor para menos movimiento

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
      style={{ position: "relative", zIndex: isHovered ? 50 : 1 }}
    >
      {" "}
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          handleMouseMoveCard(e);
          cardOnMouseMove(e);
        }}
        onMouseEnter={(e) => {
          handleMouseEnterCard(e);
          setIsHovered(true);
        }}
        onMouseLeave={(e) => {
          handleMouseLeaveCard(e);
          cardOnMouseLeave(e);
          setIsHovered(false);
        }}
        style={{
          transform: `perspective(800px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
          position: "relative",
        }}
        className="relative w-[280px] transition ease-in-out duration-300 bg-stone-900 hover:bg-stone-800 text-white scale-95 hover:scale-105 rounded-lg shadow-md hover:shadow-2xl brightness-95 hover:brightness-105"
      >
        {/* Efecto de borde animado igual que en el input */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{
            opacity: cardOpacity,
            border: "1.5px solid #ffffff",
            WebkitMaskImage: `radial-gradient(50% 200px at ${cardPosition.x}px ${cardPosition.y}px, black 50%, transparent)`,
            background: `radial-gradient(circle at ${cardPosition.x}px ${cardPosition.y}px, rgba(234, 234, 234, 0.06), transparent 50%)`,
          }}
        />
        <Link to={`${item?.id}`}>
          <img
            src={item?.background_image || DEFAULT_IMAGE}
            className="w-full h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
            alt={item.name}
          />
        </Link>
        <div className="p-4 brightness-110">
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
        </div>{" "}
        {/* Contenido expandido */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full overflow-hidden border border-stone-700 rounded-lg mt-2 z-50"
          >
            <div className="p-4 bg-stone-900 backdrop-blur-sm bg-opacity-95">
              {item.released && (
                <div className="text-xs mb-2 text-stone-300">
                  <span className="font-semibold">Release:</span>{" "}
                  {item.released}
                </div>
              )}
              {item.genres && item.genres.length > 0 && (
                <div className="text-xs mb-2 text-stone-300">
                  <span className="font-semibold">Genres:</span>{" "}
                  {item.genres.map((g) => g.name).join(", ")}
                </div>
              )}
              {item.publishers && item.publishers.length > 0 && (
                <div className="text-xs mb-2 text-stone-300">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {item.publishers.map((p) => p.name).join(", ")}
                </div>
              )}
              {item.developers && item.developers.length > 0 && (
                <div className="text-xs mb-2 text-stone-300">
                  <span className="font-semibold">Developer:</span>{" "}
                  {item.developers.map((d) => d.name).join(", ")}
                </div>
              )}
              {item.description_raw && (
                <div className="text-xs mb-2 text-stone-300 line-clamp-3">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description_raw}
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags &&
                  item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-stone-800 text-xs px-2 py-0.5 rounded-full text-stone-300"
                    >
                      {tag.name}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export const Card = memo(CardComponent);

CardComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    background_image: PropTypes.string,
    platforms: PropTypes.array,
    metacritic: PropTypes.number,
    rating: PropTypes.number,
    released: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    description_raw: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};
