import { useMemo, useState, useEffect } from "react";

/**
 * Hook personalizado para marcar las últimas cards como isLastRow con lógica responsive
 * @param {Array} items - Array de items (cards)
 * @param {number} lastRowItems - Cantidad de items en la última fila (por defecto 4)
 * @param {boolean} responsive - Si es true, ajusta automáticamente según el tamaño de pantalla
 * @returns {Array} Array de items con la propiedad isLastRow agregada
 */
export const useLastRowCards = (
  items,
  lastRowItems = 4,
  responsive = false
) => {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Establecer el tamaño inicial
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    if (!items || items.length === 0) return [];

    // Determinar la cantidad de items en la última fila según el tamaño de pantalla
    let itemsInLastRow = lastRowItems;

    if (responsive) {
      switch (screenSize) {
        case "mobile":
          itemsInLastRow = 1;
          break;
        case "tablet":
          itemsInLastRow = 2;
          break;
        case "desktop":
        default:
          itemsInLastRow = lastRowItems;
          break;
      }
    }

    return items.map((item, index) => ({
      ...item,
      isLastRow: index >= items.length - itemsInLastRow,
    }));
  }, [items, lastRowItems, responsive, screenSize]);
};
