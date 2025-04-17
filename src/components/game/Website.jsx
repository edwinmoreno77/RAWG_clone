import PropTypes from "prop-types";

export const Website = ({ data }) => {
  return (
    <>
      {data?.website && (
        <a
          href={data?.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary underline rounded animate-pulse mt-2 inline-block"
        >
          {data?.website}
        </a>
      )}
    </>
  );
};

Website.propTypes = {
  data: PropTypes.shape({
    website: PropTypes.string,
  }),
};
