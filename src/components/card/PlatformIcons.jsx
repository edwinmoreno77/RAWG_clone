import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { platformIcons } from "../../constants/icons";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";

export const PlatformIcons = ({ platforms }) => {
  // Normalizar nombres de plataformas para eliminar duplicados
  const normalizePlatformName = (platformName) => {
    if (platformName.includes("PlayStation")) return "PlayStation";
    if (platformName.includes("Xbox")) return "Xbox";
    if (platformName.includes("Nintendo")) return "Nintendo";
    if (platformName.includes("iOS") || platformName.includes("macOS"))
      return "macOS";
    return platformName; // Devuelve el nombre original si no necesita normalización
  };

  // Obtener plataformas únicas con nombres normalizados y filtrar las que no tienen íconos específicos
  const uniquePlatforms = Array.from(
    new Set(
      platforms
        ?.map((p) => normalizePlatformName(p.platform.name))
        .filter((platformName) => platformIcons[platformName]) // Filtrar solo plataformas con íconos definidos
    )
  );

  return (
    <div className="flex gap-2">
      {uniquePlatforms.map((platformName) => {
        const icon = platformIcons[platformName] || faGamepad;
        return (
          <IconWithEffect
            key={platformName}
            icon={icon}
            platformName={platformName}
          />
        );
      })}
    </div>
  );
};

// Componente individual para cada icono con efecto
const IconWithEffect = ({ icon, platformName }) => {
  // Hook para el efecto en cada icono individual
  const {
    inputRef: iconRef,
    position: iconPosition,
    opacity: iconOpacity,
    handleMouseMove: handleMouseMoveIcon,
    handleMouseEnter: handleMouseEnterIcon,
    handleMouseLeave: handleMouseLeaveIcon,
  } = useSpotlightBorder();

  return (
    <div
      ref={iconRef}
      onMouseMove={handleMouseMoveIcon}
      onMouseEnter={handleMouseEnterIcon}
      onMouseLeave={handleMouseLeaveIcon}
      className="group relative p-1 rounded-lg"
    >
      {/* Efecto de borde animado para cada icono */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
        style={{
          opacity: iconOpacity,
          border: "1px solid #ffffff",
          WebkitMaskImage: `radial-gradient(50% 50px at ${iconPosition.x}px ${iconPosition.y}px, black 50%, transparent)`,
          background: `radial-gradient(circle at ${iconPosition.x}px ${iconPosition.y}px, rgba(100, 204, 22, 0.15), rgba(201, 163, 13, 0.15), transparent 50%)`,
        }}
      />
      <FontAwesomeIcon
        icon={icon}
        className="text-stone-500 text-sm md:text-xl transition-all duration-200 group-hover:scale-110 group-hover:text-stone-300 relative z-10"
        title={platformName}
      />
    </div>
  );
};

IconWithEffect.propTypes = {
  icon: PropTypes.object.isRequired,
  platformName: PropTypes.string.isRequired,
};

PlatformIcons.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
