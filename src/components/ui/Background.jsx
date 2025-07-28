import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { useEffect } from "react";
import { childrenPropType, classNamePropType } from "../../constants/propTypes";

export const Background = ({ children, className = "" }) => {
  const {
    inputRef: bgRef,
    position: bgPosition,
    opacity: bgOpacity,
    handleMouseMove: handleMouseMoveBg,
    handleMouseEnter: handleMouseEnterBg,
    handleMouseLeave: handleMouseLeaveBg,
  } = useSpotlightBorder();

  // Asegurar que el efecto se inicialice correctamente
  useEffect(() => {
    if (bgRef.current) {
      const timer = setTimeout(() => {
        handleMouseEnterBg();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [handleMouseEnterBg]);

  return (
    <div
      ref={bgRef}
      onMouseMove={handleMouseMoveBg}
      onMouseEnter={handleMouseEnterBg}
      onMouseLeave={handleMouseLeaveBg}
      className={`flex flex-col h-screen bg-stone-950 ${className}`}
    >
      {/* Efecto de fondo ambient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: bgOpacity,
          background: `radial-gradient(300px circle at ${bgPosition.x}px ${bgPosition.y}px, rgba(255,255,255,0.1), transparent)`,
        }}
      />
      {children}
    </div>
  );
};

Background.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
};
