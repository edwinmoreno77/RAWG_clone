import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState, useCallback } from "react";
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
  // Primero declarar los estados que no dependen de otros
  const [isHovered, setIsHovered] = useState(false);
  const [like, setLike] = useState(() =>
    favorites.some((favorite) => favorite.id === item.id)
  );

  // Hook para el efecto en el card
  const {
    inputRef: cardRef,
    position: cardPosition,
    opacity: cardOpacity,
    handleMouseMove: handleMouseMoveCard,
    handleMouseEnter: handleMouseEnterCard,
    handleMouseLeave: handleMouseLeaveCard,
  } = useSpotlightBorder();
  // Hook para el efecto tilt
  const {
    rotate: cardRotate,
    onMouseMove: cardOnMouseMove,
    onMouseLeave: cardOnMouseLeave,
  } = useTilt({ max: 4 });

  // Optimizar el manejo de eventos del mouse
  const handleMouseMove = useCallback(
    (e) => {
      handleMouseMoveCard(e);
      cardOnMouseMove(e);
    },
    [handleMouseMoveCard, cardOnMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e) => {
      handleMouseEnterCard(e);
      setIsHovered(true);
    },
    [handleMouseEnterCard]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      handleMouseLeaveCard(e);
      cardOnMouseLeave(e);
      setIsHovered(false);
    },
    [handleMouseLeaveCard, cardOnMouseLeave]
  );

  // Memoizar handlerLikes para evitar recreaciones
  const handlerLikes = useCallback(() => {
    const newLikeState = !like;
    if (newLikeState) {
      addFavorites(item);
    } else {
      removeFavorites(item);
    }
    setLike(newLikeState);
  }, [like, addFavorites, removeFavorites, item]);

  return (
    <motion.article
      key={item?.id}
      className="flex justify-center items-center p-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", zIndex: isHovered ? 50 : 1 }}
      layoutId={`card-${item.id}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
          position: "relative",
          willChange: "transform",
          transition: "transform 0.1s ease-out",
        }}
        className="relative group w-[500px] md:max-w-96 transition-colors duration-200 bg-stone-900 hover:bg-stone-800 text-white scale-95 hover:scale-105 rounded-lg shadow-md hover:shadow-2xl brightness-95 hover:brightness-105"
      >
        {/* Efecto de borde animado igual que en el input */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{
            opacity: cardOpacity,
            border: "1.5px solid #ffffff",
            WebkitMaskImage: `radial-gradient(50% 200px at ${cardPosition.x}px ${cardPosition.y}px, black 50%, transparent)`,
            background: `radial-gradient(circle at ${cardPosition.x}px ${cardPosition.y}px, rgba(100, 204, 22, 0.06), rgba(201, 163, 13, 0.06), transparent 80%)`,
          }}
        />
        <Link to={`${item?.id}`}>
          <img
            src={item?.background_image || DEFAULT_IMAGE}
            className="w-full h-72 md:h-52 lg:h-44 object-cover rounded-t-lg"
            alt={item.name}
          />
        </Link>
        <div className="p-4 brightness-110">
          <PlatformIcons platforms={item?.platforms} />
          <h5 className="text-lg font-bold bg-gradient-to-r from-stone-400 via-white to-stone-500 group-hover:from-stone-200 group-hover:via-white group-hover:to-stone-200 transition-all duration-300 bg-clip-text text-transparent">
            {item?.name}
          </h5>
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
            </Link>{" "}
            <button onClick={handlerLikes}>
              <FontAwesomeIcon
                icon={faBookmark}
                className={`cursor-pointer text-lg transition-all duration-300 ease-in-out hover:scale-125 ${
                  like ? "text-lime-600" : "text-stone-600 hover:text-stone-400"
                }`}
              />
            </button>
          </div>
        </div>{" "}
        {/* Contenido expandido */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: item.isLastRow ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: item.isLastRow ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              item.isLastRow ? "bottom-full mb-1" : "top-full mt-1"
            } left-0 w-full overflow-hidden border border-stone-700 rounded-lg z-50`}
            layoutId={`hover-${item.id}`}
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

              {item.developers && item.developers.length > 0 && (
                <div className="text-xs mb-2 text-stone-300">
                  <span className="font-semibold">Developer:</span>{" "}
                  {item.developers.map((d) => d.name).join(", ")}
                </div>
              )}
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
    isLastRow: PropTypes.bool,
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
