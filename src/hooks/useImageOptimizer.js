import { useMemo } from "react";

/**
 * Función utilitaria para optimizar URLs de imágenes
 * @param {string} originalUrl - URL original de la imagen
 * @param {string} context - Contexto de uso: 'card', 'hero', 'background', 'search', 'screenshot'
 * @returns {string} - URL optimizada
 */
export const optimizeImageUrl = (originalUrl, context = "default") => {
  if (!originalUrl) {
    return originalUrl;
  }

  // Configuraciones según el contexto
  const contextConfigs = {
    card: { width: 400, height: 300, quality: 75 },
    hero: { width: 800, height: 600, quality: 90 },
    background: { width: 1200, height: 800, quality: 90 },
    search: { width: 200, height: 150, quality: 60 },
    screenshot: { width: 600, height: 400, quality: 75 },
    default: { width: 500, height: 400, quality: 75 },
  };

  const config = contextConfigs[context] || contextConfigs.default;

  // Usar el servicio images.weserv.nl para optimización
  const optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
    originalUrl
  )}&w=${config.width}&h=${config.height}&q=${config.quality}&output=webp`;

  return optimizedUrl;
};

/**
 * Hook personalizado para optimizar imágenes usando el servicio images.weserv.nl
 * @param {string} originalUrl - URL original de la imagen
 * @param {string} context - Contexto de uso: 'card', 'hero', 'background', 'search', 'screenshot'
 * @returns {string} - URL optimizada
 */
export const useImageOptimizer = (originalUrl, context = "default") => {
  return useMemo(() => {
    return optimizeImageUrl(originalUrl, context);
  }, [originalUrl, context]);
};
