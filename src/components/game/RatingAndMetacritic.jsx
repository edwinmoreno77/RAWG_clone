import PropTypes from "prop-types";

export const RatingAndMetacritic = ({ rating, metacritic }) => {
  return (
    <div className="flex justify-center gap-4 text-xs font-bold text-amber-400 mt-2">
      {rating ? (
        <>
          <span>Rating: {rating}</span>
          <span>Metacritic: {metacritic ?? "Not available"}</span>
        </>
      ) : (
        <>
          <div className="animate-pulse bg-slate-500 h-4 w-20 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-24 rounded" />
        </>
      )}
    </div>
  );
};

RatingAndMetacritic.propTypes = {
  rating: PropTypes.number,
  metacritic: PropTypes.number,
};
