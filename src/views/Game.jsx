import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getGameById } from "../api/getData";
import { Navbar } from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { store, actions } = useContext(Context);

  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id == id);
  const [like, setLike] = useState(isFavorite);

  const handlerLikes = (like, id) => {
    if (!favorites.some((favorite) => favorite.id == id)) {
      addFavorites(data);
    } else {
      removeFavorites(data);
    }
    setLike(!like);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGameById(id);
      setData(data);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="container-fluid min-h-screen text-white bg-stone-950">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-5/12 p-5 flex justify-center">
            {data ? (
              <div className="w-full rounded-lg ">
                <img
                  src={data?.background_image}
                  className="rounded w-full shadow-lg"
                  alt="..."
                />
              </div>
            ) : (
              <div className="animate-pulse flex space-x-4">
                <div className="rounded bg-slate-500 h-96 w-96"></div>
              </div>
            )}
          </div>
          <div className="w-full md:w-7/12 text-center md:pl-5">
            {data ? (
              <>
                <h3 className="text-3xl font-bold my-5 p-1bv       ">
                  {data?.name}
                </h3>
                <div className="mt-4">
                  <div
                    className="text-base mt-2 p-5"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                </div>
                <p className="text-lg pt-2">released: {data?.released}</p>
                <p className="text-lg">rating: {data?.rating}</p>
                <p className="text-lg">id: {data?.id}</p>
                {data.website && (
                  <Link
                    to={data?.website}
                    className="bg-stone-500 transition ease-in-out  hover:scale-105 hover:bg-lime-700 text-white py-2 px-4 rounded my-5 inline-block"
                  >
                    website
                  </Link>
                )}

                <div className="flex justify-evenly items-center mt-9">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-stone-500 transition ease-in-out  hover:scale-105 hover:bg-lime-700 text-white py-2 px-4 rounded my-5 inline-block"
                  >
                    Back
                  </button>
                  <button onClick={() => handlerLikes(like, id)}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`cursor-pointer text-2xl transition ease-in-out  hover:scale-125 ${
                        like ? "text-lime-600" : "text-stone-700"
                      }`}
                    />
                  </button>
                </div>
              </>
            ) : (
              <p className="animate-pulse">
                <span className="block bg-gray-300 h-6 w-7/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-4/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-4/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-6/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-8/12 mb-2"></span>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
