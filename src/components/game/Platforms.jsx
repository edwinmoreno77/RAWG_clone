import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { platformIcons } from "../../constants/icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

export const Platforms = ({ data }) => {
  return (
    <div className="font-bold">
      {data ? (
        <div className="flex flex-wrap justify-center items-center gap-2">
          {data?.platforms?.map((p) => {
            const platformName = p.platform.name;
            const icon = platformIcons[platformName] || faGamepad; // Default icon if not found
            return (
              <div key={platformName} className="flex items-center gap-1">
                <FontAwesomeIcon icon={icon} className="text-white text-lg" />
                <span className="text-white text-xs">{platformName}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
      )}
    </div>
  );
};

Platforms.propTypes = {
  data: PropTypes.shape({
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }),
};
