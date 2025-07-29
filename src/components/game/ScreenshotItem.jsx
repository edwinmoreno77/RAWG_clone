import { useImageOptimizer } from "../../hooks/useImageOptimizer";
import PropTypes from "prop-types";

// Componente individual para cada screenshot
export const ScreenshotItem = ({ screenshot }) => {
  const optimizedImageUrl = useImageOptimizer(screenshot.image, "screenshot");

  return (
    <div className="relative group">
      <img
        src={optimizedImageUrl}
        alt={`Screenshot ${screenshot.id}`}
        className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 border border-stone-600 hover:border-2 hover:border-stone-200"
      />
    </div>
  );
};

ScreenshotItem.propTypes = {
  screenshot: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
