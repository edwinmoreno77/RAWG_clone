import PropTypes from "prop-types";

export const Genres = ({ data }) => {
  const genres = data?.genres
    ? data.genres.map((g) => g.name).join(", ")
    : "Unknown";

  return (
    <div className="font-bold mt-5">
      {data ? (
        <>
          <span className="text-stone-300 text-base">Genres:</span>{" "}
          <span className="text-white text-base">{genres}</span>
        </>
      ) : (
        <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
      )}
    </div>
  );
};

Genres.propTypes = {
  data: PropTypes.shape({
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};
