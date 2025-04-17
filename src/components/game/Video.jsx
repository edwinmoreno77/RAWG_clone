import PropTypes from "prop-types";

export const Video = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      {data?.videos?.length > 0 ? (
        <video
          autoPlay
          playsInline
          loop
          controls
          className="w-full h-auto rounded-xl shadow-lg"
          poster={data.videos[0].preview} // Imagen de vista previa
          ref={(video) => {
            if (video) {
              video.volume = 0.3; // Establece el volumen al 50%
            }
          }}
        >
          <source src={data.videos[0].data.max} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex justify-center items-center w-full h-64  rounded-xl">
          <p className="text-stone-300 text-lg font-bold">
            No video available for this game.
          </p>
        </div>
      )}
    </div>
  );
};

Video.propTypes = {
  data: PropTypes.shape({
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        data: PropTypes.shape({
          max: PropTypes.string.isRequired,
        }).isRequired,
        preview: PropTypes.string.isRequired,
      })
    ),
  }),
};
