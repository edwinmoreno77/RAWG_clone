import { useState, useEffect, useRef, useMemo } from "react";
import { preloadScreenshots } from "./useImageOptimizer";

export const useCardMedia = (
  screenshots = [],
  videos = [],
  isHovered,
  backgroundImage
) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Crear array de imágenes incluyendo la imagen principal
  const allImages = backgroundImage
    ? [backgroundImage, ...screenshots]
    : screenshots;

  // Precargar TODOS los screenshots cuando se detecte hover por primera vez
  useEffect(() => {
    if (isHovered && screenshots && screenshots.length > 0) {
      // Precargar todos los screenshots de una vez cuando se hace hover
      preloadScreenshots(screenshots, "screenshot");
    }
  }, [isHovered, screenshots]);

  // Función para obtener la imagen actual
  const getCurrentImage = () => {
    if (allImages.length === 0) return null;

    if (currentImageIndex === 0 && backgroundImage) {
      return backgroundImage;
    }

    const screenshotIndex = backgroundImage
      ? currentImageIndex - 1
      : currentImageIndex;
    return (
      screenshots[screenshotIndex]?.image || screenshots[screenshotIndex]?.url
    );
  };

  // Memoizar la imagen actual para evitar recálculos innecesarios
  const currentImage = useMemo(
    () => getCurrentImage(),
    [currentImageIndex, backgroundImage, screenshots]
  );

  // Función para obtener el primer video disponible
  const getFirstVideo = () => {
    if (videos.length === 0) return null;
    return (
      videos[0]?.data?.max ||
      videos[0]?.data?.["480"] ||
      videos[0]?.data?.["720"]
    );
  };

  // Función para manejar el movimiento del mouse sobre la imagen
  const handleImageMouseMove = (e) => {
    if (!isHovered || videos.length > 0 || allImages.length <= 1) return;

    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const percentage = mouseX / containerWidth;

    // Calcular el índice basado en la posición del cursor
    const newIndex = Math.floor(percentage * allImages.length);
    const clampedIndex = Math.max(0, Math.min(newIndex, allImages.length - 1));

    setCurrentImageIndex(clampedIndex);
  };

  // Manejar reproducción automática de video y resetear cuando cambia el hover
  useEffect(() => {
    if (isHovered && videos.length > 0) {
      // Reproducir video automáticamente al hacer hover
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch((error) => {
            console.log("Error reproduciendo video:", error);
          });
      }
    } else {
      // Resetear cuando se desactiva el hover
      setCurrentImageIndex(0);
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, videos.length]);

  // No necesitamos precargar en hover porque ya está todo precargado desde el inicio

  // Función para reproducir video
  const playVideo = () => {
    if (videoRef.current && getFirstVideo()) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // Función para pausar video
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return {
    currentImage: currentImage,
    currentVideo: getFirstVideo(),
    hasVideo: videos.length > 0,
    hasScreenshots: allImages.length > 1,
    isVideoPlaying,
    videoRef,
    imageContainerRef,
    playVideo,
    pauseVideo,
    handleImageMouseMove,
    currentImageIndex,
    totalImages: allImages.length,
  };
};
