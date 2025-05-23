import { useState, useCallback } from "react";

export const useTilt = ({ max = 25 } = {}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const calculateTilt = useCallback(
    (e) => {
      if (!e.currentTarget) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      // Cálculo directo para un efecto más inmediato
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const tiltX = ((mouseY - centerY) / (height / 2)) * -max;
      const tiltY = ((mouseX - centerX) / (width / 2)) * max;

      return { x: tiltX, y: tiltY };
    },
    [max]
  );

  const onMouseMove = useCallback(
    (e) => {
      const tilt = calculateTilt(e);
      if (tilt) {
        setRotate(tilt);
      }
    },
    [calculateTilt]
  );

  const onMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  return { rotate, onMouseMove, onMouseLeave };
};
