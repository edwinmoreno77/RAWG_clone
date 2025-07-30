import { useState, useEffect, useRef } from "react";
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

  // Precargar screenshots cuando estén disponibles (solo las primeras 3 para no sobrecargar)
  useEffect(() => {
    if (screenshots && screenshots.length > 0) {
      const firstScreenshots = screenshots.slice(0, 3);
      preloadScreenshots(firstScreenshots, "screenshot");
    }
  }, [screenshots]);

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

  // Precargar imágenes cuando se detecte hover y hay screenshots
  useEffect(() => {
    if (isHovered && screenshots.length > 0) {
      // Precargar las próximas 2 imágenes para una transición más suave
      const nextScreenshots = screenshots.slice(0, 2);
      preloadScreenshots(nextScreenshots, "screenshot");
    }
  }, [isHovered, screenshots]);

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
    currentImage: getCurrentImage(),
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
