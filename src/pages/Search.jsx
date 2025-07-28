import { useState, useEffect } from "react";
import { Navbar } from "../components/ui/Navbar";
import { Card } from "../components/card/Card";
import { getGameByName } from "../api/getData";
import { useSearchParams } from "react-router-dom";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";

export const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "call of duty";

  // Hook para el efecto en el fondo (ambient)
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

  const searchByName = async (name) => {
    setIsLoading(true);
    const results = await getGameByName(name);
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    searchByName(searchQuery);
  }, [searchQuery]);

  return (
    <>
      {/* Fondo con efecto ambient */}
      <div
        ref={bgRef}
        onMouseMove={handleMouseMoveBg}
        onMouseEnter={handleMouseEnterBg}
        onMouseLeave={handleMouseLeaveBg}
        className="relative container-fluid min-h-screen bg-stone-950 overflow-hidden"
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

        {/* Título de búsqueda */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Resultados de búsqueda
          </h1>
          <p className="text-stone-400 text-lg">&ldquo;{searchQuery}&rdquo;</p>
        </div>

        {isLoading ? (
          <div className="relative z-10 flex justify-center items-center h-40 pt-10">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1 pt-5 px-4">
            {data?.map((game) => (
              <Card key={game.id} item={game} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
