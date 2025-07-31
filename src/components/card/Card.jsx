import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState, useCallback } from "react";
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPause } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { motion } from "framer-motion";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { PlatformIcons } from "./PlatformIcons";
import { useTilt } from "../../hooks/useTilt";
import { useImageOptimizer } from "../../hooks/useImageOptimizer";
import { useCardMedia } from "../../hooks/useCardMedia";

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

  // Hook para manejar media (videos y screenshots)
  const {
    currentImage,
    currentVideo,
    hasVideo,
    hasScreenshots,
    isVideoPlaying,
    videoRef,
    imageContainerRef,
    pauseVideo,
    handleImageMouseMove,
    currentImageIndex,
    totalImages,
  } = useCardMedia(
    item.screenshots || [],
    item.videos || [],
    isHovered,
    item?.background_image
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
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500 z-50"
          style={{
            opacity: cardOpacity,
            border: "1.5px solid #ffffff",
            WebkitMaskImage: `radial-gradient(50% 200px at ${cardPosition.x}px ${cardPosition.y}px, black 50%, transparent)`,
            background: `radial-gradient(circle at ${cardPosition.x}px ${cardPosition.y}px, rgba(100, 204, 22, 0.06), rgba(201, 163, 13, 0.06), transparent 80%)`,
          }}
        />
        <div
          ref={imageContainerRef}
          onMouseMove={handleImageMouseMove}
          className="relative w-full h-72 md:h-52 lg:h-44 overflow-hidden rounded-t-lg cursor-pointer"
        >
          {/* Video overlay */}
          {hasVideo && isHovered && (
            <video
              ref={videoRef}
              src={currentVideo}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              onPlay={() => {
                // El estado se maneja en el hook useCardMedia
              }}
              onPause={() => {
                // El estado se maneja en el hook useCardMedia
              }}
            />
          )}

          {/* Imagen de fondo o slideshow */}
          <img
            src={useImageOptimizer(currentImage || DEFAULT_IMAGE, "card")}
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='32' viewBox='0 0 48 32'%3E%3Crect width='48' height='32' fill='%23374151'/%3E%3Ctext x='24' y='20' text-anchor='middle' fill='white' font-size='8'%3ENo img%3C/text%3E%3C/svg%3E";
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              hasVideo && isHovered ? "opacity-0" : "opacity-100"
            }`}
            alt={item.name}
          />

          {/* Indicadores de slideshow */}
          {hasScreenshots && totalImages > 1 && !hasVideo && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {Array.from({ length: totalImages }, (_, index) => (
                <div
                  key={index}
                  className={`hidden group-hover:block w-8  h-1 mb-1 rounded-full transition-all duration-100 ${
                    index === currentImageIndex ? "bg-white/90" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Indicador de scroll horizontal */}
          {hasScreenshots && totalImages > 1 && !hasVideo && isHovered && (
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              move mouse to change image
            </div>
          )}

          {/* Botón de pause para video (opcional) */}
          {hasVideo && isVideoPlaying && isHovered && (
            <button
              onClick={pauseVideo}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faPause} className="text-white text-lg" />
            </button>
          )}

          {/* Link overlay para navegación */}
          {/* <Link to={`${item?.id}`} className="absolute inset-0 z-10" /> */}
        </div>
        <div className="p-4 brightness-110">
          <PlatformIcons platforms={item?.platforms} />
          <Link to={`${item?.id}`} className="block">
            <h5 className="text-lg font-bold bg-gradient-to-r from-stone-400 via-white to-stone-500 group-hover:from-stone-200 group-hover:via-white group-hover:to-stone-200 transition-all duration-300 bg-clip-text text-transparent cursor-pointer relative">
              {item?.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-br from-lime-400 via-white to-lime-200 transition-all duration-500 group-hover:w-10/12"></span>
            </h5>
          </Link>
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
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        data: PropTypes.object,
      })
    ),
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
