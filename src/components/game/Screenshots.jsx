import PropTypes from "prop-types";
import { ScreenshotItem } from "./ScreenshotItem";

export const Screenshots = ({ data }) => {
  return (
    <div className="flex px-0 md:px-4 w-full">
      {data ? (
        data?.screenshots?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
            {data.screenshots.map((screenshot) => (
              <ScreenshotItem key={screenshot.id} screenshot={screenshot} />
            ))}
          </div>
        ) : (
          <p className="text-stone-300 text-center w-full">
            No screenshots available for this game.
          </p>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-slate-500 h-36 w-full rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

Screenshots.propTypes = {
  data: PropTypes.shape({
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
  }),
};
