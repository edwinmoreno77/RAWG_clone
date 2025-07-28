import { Navbar } from "../components/ui/Navbar";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import { childrenPropType } from "../constants/propTypes";
import PropTypes from "prop-types";

export const GameDetailLayout = ({ children, backgroundImage }) => {
  const {
    inputRef,
    position,
    opacity,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useSpotlightBorder();

  return (
    <main
      className="relative h-screen bg-cover bg-center bg-no-repeat text-white z-0 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8)), url(${backgroundImage})`
          : "linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8))",
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
      ref={inputRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
        style={{
          opacity: opacity,
          WebkitMaskImage: `radial-gradient(50% 500px at ${position.x}px ${position.y}px, black 80%, transparent)`,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(234, 234, 234, 0.06), transparent 50%)`,
        }}
      />

      <Navbar />

      <div className="relative z-10 flex flex-col bg-gradient-to-t from-black via-black/50 to-transparent min-h-screen xl:px-10 pb-5">
        {children}
      </div>
    </main>
  );
};

GameDetailLayout.propTypes = {
  children: childrenPropType.isRequired,
  backgroundImage: PropTypes.string,
};
