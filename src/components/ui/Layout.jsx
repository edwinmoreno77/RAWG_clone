import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { Navbar } from "./Navbar";
import PropTypes from "prop-types";
import { Sidebar } from "./sidebar/Sidebar";
import { OrderingSelect } from "./OrderingSelect";
import { Pagination } from "../Pagination";
import { useEffect } from "react";

export const Layout = ({ children }) => {
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
      // Forzar un re-render del efecto después de que el componente esté montado
      const timer = setTimeout(() => {
        handleMouseEnterBg();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [handleMouseEnterBg]);

  return (
    <main
      ref={bgRef}
      onMouseMove={handleMouseMoveBg}
      onMouseEnter={handleMouseEnterBg}
      onMouseLeave={handleMouseLeaveBg}
      className="flex flex-col h-screen"
    >
      {/* Efecto de fondo ambient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: bgOpacity,
          background: `radial-gradient(300px circle at ${bgPosition.x}px ${bgPosition.y}px, rgba(255,255,255,0.1), transparent)`,
        }}
      />
      <Navbar />
      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-transparent overflow-hidden ">
          <main className="flex-1 bg-transparent p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
            <OrderingSelect />
            {children}
          </main>
          <div className="bg-transparent">
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
