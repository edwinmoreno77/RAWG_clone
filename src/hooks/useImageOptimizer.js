import { useMemo, useEffect } from "react";

// Cache global para imágenes precargadas (persiste entre navegaciones)
const imageCache = new Map();
const preloadQueue = new Set();

// Cache de cards que ya han sido precargadas para evitar precargas duplicadas
const cardPreloadCache = new Set();

// Configuración de limpieza inteligente
const CLEANUP_INTERVAL = 1000 * 60 * 5; // 5 minutos
const MAX_CACHE_SIZE = 250; // Máximo 250 imágenes en caché
const CACHE_TTL = 1000 * 60 * 15; // 15 minutos TTL

// Variables para control de limpieza
let lastCleanup = Date.now();

/**
 * Función de limpieza inteligente que se ejecuta en segundo plano
 */
const smartCleanup = () => {
  const now = Date.now();

  // Solo limpiar si han pasado 5 minutos desde la última limpieza
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return;
  }

  // Solo limpiar si el caché supera el tamaño máximo
  if (imageCache.size <= MAX_CACHE_SIZE) {
    return;
  }

  // Limpiar entradas expiradas
  for (const [url, timestamp] of imageCache.entries()) {
    if (now - timestamp >= CACHE_TTL) {
      imageCache.delete(url);
    }
  }

  // Limpiar cardPreloadCache si es muy grande
  if (cardPreloadCache.size > 80) {
    cardPreloadCache.clear();
  }

  lastCleanup = now;
  console.log(
    `🧹 Cache cleanup: ${imageCache.size} images, ${cardPreloadCache.size} cards`
  );
};

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
    card: { width: 600, height: 400, quality: 85 },
    hero: { width: 800, height: 600, quality: 90 },
    background: { width: 1200, height: 800, quality: 90 },
    search: { width: 200, height: 150, quality: 75 },
    screenshot: { width: 600, height: 400, quality: 85 },
    default: { width: 500, height: 400, quality: 85 },
  };

  const config = contextConfigs[context] || contextConfigs.default;

  // Usar el servicio images.weserv.nl para optimización
  const optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
    originalUrl
  )}&w=${config.width}&h=${config.height}&q=${
    config.quality
  }&output=webp&fit=cover&sharp=1`;

  return optimizedUrl;
};

/**
 * Función para precargar una imagen
 * @param {string} url - URL de la imagen a precargar
 * @returns {Promise} - Promise que se resuelve cuando la imagen está cargada
 */
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    // Verificar caché simple (sin TTL en cada acceso)
    if (imageCache.has(url)) {
      resolve(url);
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Guardar timestamp para limpieza futura
      imageCache.set(url, Date.now());
      resolve(url);
    };
    img.onerror = () => {
      // También guardar errores con timestamp
      imageCache.set(url, Date.now());
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });
};

/**
 * Función para precargar múltiples imágenes
 * @param {string[]} urls - Array de URLs a precargar
 */
export const preloadImages = async (urls) => {
  const validUrls = urls.filter((url) => url && !imageCache.has(url));

  if (validUrls.length === 0) return;

  // Ejecutar limpieza inteligente en segundo plano
  setTimeout(smartCleanup, 0);

  // Precargar en paralelo, pero limitar a 3 simultáneas para no sobrecargar
  const batchSize = 3;
  for (let i = 0; i < validUrls.length; i += batchSize) {
    const batch = validUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map((url) => preloadImage(url)));
  }
};

/**
 * Función para generar ID único de card basado en screenshots
 * @param {Array} screenshots - Array de objetos screenshot
 * @returns {string} - ID único de la card
 */
const generateCardId = (screenshots) => {
  if (!screenshots || screenshots.length === 0) return null;

  const urls = screenshots
    .map((screenshot) => screenshot.image || screenshot.url)
    .filter(Boolean)
    .sort(); // Ordenar para consistencia

  return urls.join("|");
};

/**
 * Función para precargar screenshots optimizados
 * @param {Array} screenshots - Array de objetos screenshot
 * @param {string} context - Contexto de optimización
 */
export const preloadScreenshots = async (
  screenshots,
  context = "screenshot"
) => {
  if (!screenshots || screenshots.length === 0) return;

  const cardId = generateCardId(screenshots);

  // Si esta card ya fue precargada, no hacer nada
  if (cardId && cardPreloadCache.has(cardId)) {
    return;
  }

  const urls = screenshots
    .map((screenshot) => screenshot.image || screenshot.url)
    .filter(Boolean);

  if (urls.length > 0) {
    const optimizedUrls = urls.map((url) => optimizeImageUrl(url, context));

    // Filtrar URLs que ya están en cache para evitar peticiones duplicadas
    const urlsToPreload = optimizedUrls.filter((url) => !imageCache.has(url));

    if (urlsToPreload.length > 0) {
      await preloadImages(urlsToPreload);
    }

    // Marcar esta card como precargada
    if (cardId) {
      cardPreloadCache.add(cardId);
    }
  }
};

/**
 * Hook personalizado para optimizar imágenes usando el servicio images.weserv.nl
 * @param {string} originalUrl - URL original de la imagen
 * @param {string} context - Contexto de uso: 'card', 'hero', 'background', 'search', 'screenshot'
 * @returns {string} - URL optimizada
 */
export const useImageOptimizer = (originalUrl, context = "default") => {
  const optimizedUrl = useMemo(() => {
    return optimizeImageUrl(originalUrl, context);
  }, [originalUrl, context]);

  // Precargar la imagen cuando cambie la URL (solo una vez)
  useEffect(() => {
    if (!optimizedUrl) return;

    // Si ya está en cache, no hacer nada
    if (imageCache.has(optimizedUrl)) {
      return;
    }

    // Si ya está en cola de precarga, no hacer nada
    if (preloadQueue.has(optimizedUrl)) {
      return;
    }

    // Precargar solo si no está en cache ni en cola
    preloadQueue.add(optimizedUrl);
    preloadImage(optimizedUrl)
      .then(() => {
        preloadQueue.delete(optimizedUrl);
      })
      .catch(() => {
        preloadQueue.delete(optimizedUrl);
      });
  }, [optimizedUrl]);

  return optimizedUrl;
};
