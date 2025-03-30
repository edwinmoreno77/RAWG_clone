import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { platformIcons } from "../constants/icons";

export const PlatformIcons = ({ platforms }) => {
  // Normalizar nombres de plataformas para eliminar duplicados
  const normalizePlatformName = (platformName) => {
    if (platformName.includes("PlayStation")) return "PlayStation";
    if (platformName.includes("Xbox")) return "Xbox";
    if (platformName.includes("Nintendo")) return "Nintendo";
    if (platformName.includes("iOS")) return "macOS";
    return platformName; // Devuelve el nombre original si no necesita normalización
  };

  // Obtener plataformas únicas con nombres normalizados
  const uniquePlatforms = Array.from(
    new Set(platforms?.map((p) => normalizePlatformName(p.platform.name)))
  );

  return (
    <div className="flex gap-2">
      {uniquePlatforms.map((platformName) => {
        const icon = platformIcons[platformName] || faGamepad; // Ícono por defecto si no se encuentra
        return (
          <FontAwesomeIcon
            key={platformName}
            icon={icon}
            className="text-stone-500 text-lg"
            title={platformName}
          />
        );
      })}
    </div>
  );
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
