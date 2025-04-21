import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storeIcons } from "../../constants/icons";

export const Stores = ({ data }) => {
  return (
    <div className="font-bold mt-2 p-2">
      {data?.stores ? (
        data.stores.length > 0 ? (
          <>
            <span className="text-stone-300 py-3 text-base">Stores:</span>{" "}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
              {data.stores.map((store) => (
                <a
                  key={store.store.id}
                  href={`https://${store.store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-white text-sm underline hover:text-amber-400 transition-colors"
                >
                  {storeIcons[store.store.name] ? (
                    <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center shadow-md">
                      <FontAwesomeIcon
                        icon={storeIcons[store.store.name]}
                        className="text-white text-2xl"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">
                        {store.store.name[0]}
                      </span>
                    </div>
                  )}
                  <span className="mt-1">{store.store.name}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="text-stone-300">No stores available for this game.</p>
        )
      ) : (
        <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
      )}
    </div>
  );
};

Stores.propTypes = {
  data: PropTypes.shape({
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        store: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          domain: PropTypes.string.isRequired,
          logo: PropTypes.string,
        }).isRequired,
      })
    ),
  }),
};
