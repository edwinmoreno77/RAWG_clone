import { motion } from "framer-motion";
import { Platforms } from "./Platforms";
import { RatingAndMetacritic } from "./RatingAndMetacritic";
import PropTypes from "prop-types";

export const GameHero = ({ data, rotate, onMouseMove, onMouseLeave }) => {
  return (
    <>
      {data ? (
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          className="flex flex-col justify-center w-11/12 h-96 m-0 p-0 sm:mt-7 md:p-5 md:my-2 md:h-96 lg:pt-10 lg:h-[calc(100vh-4rem)]"
        >
          <img
            src={data?.background_image}
            className="rounded-lg  mb-4  w-full h-full shadow-lg object-cover transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform brightness-90 hover:brightness-110"
            alt={data?.name}
            loading="lazy"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1.5)`,
              transition: "all 200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
            }}
          />
          <Platforms data={data} />

          <RatingAndMetacritic
            rating={data?.rating}
            metacritic={data?.metacritic}
          />

          {/* Fecha de lanzamiento */}
          <div className="text-sm text-center pt-2 mb-5">
            {data ? (
              `Released: ${data?.released}`
            ) : (
              <div className="animate-pulse bg-slate-500 h-4 w-36 mx-auto rounded" />
            )}
          </div>
        </motion.div>
      ) : (
        <div className="w-full p-5 flex justify-center h-96 mb-2 md:h-96 lg:h-[calc(100vh-14rem)]">
          <div className="animate-pulse rounded bg-slate-500 m-5 w-full h-full md:ms-10 md:mt-7" />
        </div>
      )}
    </>
  );
};

GameHero.propTypes = {
  data: PropTypes.shape({
    background_image: PropTypes.string,
    name: PropTypes.string,
    released: PropTypes.string,
    rating: PropTypes.number,
    metacritic: PropTypes.number,
  }),
  rotate: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
