import { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../components/card/Card";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import { Navbar } from "../components/ui/Navbar";

export const Favorites = () => {
  const { store } = useContext(Context);
  const { favorites } = store;

  // Hook para el efecto en el fondo (ambient)
  const {
    inputRef: bgRef,
    position: bgPosition,
    opacity: bgOpacity,
    handleMouseMove: handleMouseMoveBg,
    handleMouseEnter: handleMouseEnterBg,
    handleMouseLeave: handleMouseLeaveBg,
  } = useSpotlightBorder();

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
            background: `radial-gradient(150px circle at ${bgPosition.x}px ${bgPosition.y}px, rgba(255,255,255,0.05), transparent)`,
          }}
        />
        <Navbar />
        <main className="container-fluid px-5 min-h-screen bg-stone-950">
          {favorites.length === 0 ? (
            <h1 className="text-center pt-3 mt-28 text-4xl animate-pulse text-white font-bold decoration-white tracking-tight">
              Add favorites
            </h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
              {favorites.map((character) => (
                <Card key={character.id} item={character} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};
