import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({ item }) => {
  const { actions, store } = useContext(Context);
  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id == item.id);
  const [like, setlike] = useState(isFavorite);

  const handlerLikes = (like, id) => {
    if (!favorites.some((favorite) => favorite.id == id)) {
      addFavorites(item);
    } else {
      removeFavorites(item);
    }
    setlike(!like);
  };

  return (
    <>
      <article key={item?.id} className="flex justify-center items-center p-2">
        <div className="w-auto h-auto transition ease-in-out duration-300 bg-stone-900 text-white hover:text-black hover:bg-white scale-95 hover:scale-105 rounded-lg shadow-md hover:shadow-2xl brightness-95 hover:brightness-105 hover:skew-y-1">
          <Link to={`${item?.id}`}>
            <img
              src={item?.background_image}
              className="w-full h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
              alt={item.name}
            />
          </Link>
          <div className="p-4 brightness-110">
            <h5 className="text-lg font-semibold">{item?.name}</h5>
            <div className="flex justify-between">
              <span>rating: {item.rating}</span>
              <p>{item.species}</p>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to={`${item?.id}`}
                className="mt-2  text-xs inline-block transition ease-in-out  hover:scale-105 bg-slate-500 text-white py-1 px-2 rounded hover:bg-slate-900"
              >
                Read more
              </Link>
              <button onClick={() => handlerLikes(like, item.id)}>
                <FontAwesomeIcon
                  icon="heart"
                  className={`cursor-pointer text-lg transition ease-in-out  hover:scale-125 ${
                    like ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    species: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
