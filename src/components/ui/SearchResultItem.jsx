import PropTypes from "prop-types";
import { useImageOptimizer } from "../../hooks/useImageOptimizer";

export const SearchResultItem = ({ game, onClick }) => {
  const optimizedImageUrl = useImageOptimizer(game.background_image, "search");

  return (
    <div
      className="p-3 hover:bg-stone-700 cursor-pointer transition-colors border-b border-stone-700 last:border-b-0"
      onClick={() => onClick(game)}
    >
      <div className="flex items-center space-x-3">
        <img
          src={optimizedImageUrl}
          alt={game.name}
          className="w-12 h-8 object-cover rounded"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='32' viewBox='0 0 48 32'%3E%3Crect width='48' height='32' fill='%23374151'/%3E%3Ctext x='24' y='20' text-anchor='middle' fill='white' font-size='8'%3ENo img%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium truncate">
            {game.name}
          </h4>
          <p className="text-stone-400 text-xs truncate">
            {game.released ? new Date(game.released).getFullYear() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

SearchResultItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    released: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
