import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { GameDescription } from "./GameDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export const GameInfo = ({ data, navigate, like, handlerLikes, id }) => {
  return (
    <div className="w-full md:w-12/12 text-center md:pl-5 pb-5 text-stone-300">
      {/* Título */}
      {data ? (
        <motion.h3
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-3xl md:text-5xl font-extrabold text-white py-2-1 md:py-5 lg:py-0"
        >
          {data?.name}
        </motion.h3>
      ) : (
        <div className="animate-pulse bg-slate-500 h-12 w-1/2 mx-auto rounded mt-16 mb-4" />
      )}

      {/* Descripción */}
      <GameDescription description={data?.description} />

      {/* Botones */}
      <div className="flex justify-between items-center mx-10 mt-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex mt-2 h-8 animate-background-shine items-center justify-center rounded-md border-2 border-stone-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-gray-200 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 font-cursive text-xs"
        >
          Back
        </button>
        {data && (
          <button onClick={() => handlerLikes(like, id)}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={`cursor-pointer text-2xl transition ease-in-out hover:scale-125 ${
                like ? "text-lime-600" : "text-stone-700"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

GameInfo.propTypes = {
  data: PropTypes.object,
  navigate: PropTypes.func.isRequired,
  like: PropTypes.bool.isRequired,
  handlerLikes: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
