import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const GameDescription = ({ description }) => {
  return (
    <div className="flex flex-col items-center mt-4 p-1 font-serif text-sm text-stone-100 prose prose-invert">
      {description ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden whitespace-pre-line text-xs"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </motion.div>
      ) : (
        <div className="space-y-2 w-full px-5">
          {/* Skeleton de la descripción */}
          <div className="animate-pulse bg-slate-500 h-4 w-full rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-5/6 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-3/4 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-2/3 rounded" />
          <br />
          <div className="animate-pulse bg-slate-500 h-4 w-full rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-5/6 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-3/4 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-2/3 rounded" />
          <br />
          <div className="animate-pulse bg-slate-500 h-4 w-full rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-5/6 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-3/4 rounded" />
          <div className="animate-pulse bg-slate-500 h-4 w-2/3 rounded" />
        </div>
      )}
    </div>
  );
};

GameDescription.propTypes = {
  description: PropTypes.string,
};
