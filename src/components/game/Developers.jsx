import PropTypes from "prop-types";

export const Developers = ({ data }) => {
  const developers = data?.developers
    ? data.developers.map((dev) => dev.name).join(", ")
    : "Unknown";

  return (
    <div className="flex flex-col font-bold mt-16 pt-5 w-6/12 text-center mx-auto">
      <span className="text-stone-300 text-xs">Developers:</span>{" "}
      {data ? (
        <>
          <span className="text-white text-base">{developers}</span>
        </>
      ) : (
        <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
      )}
    </div>
  );
};

Developers.propTypes = {
  data: PropTypes.shape({
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};
