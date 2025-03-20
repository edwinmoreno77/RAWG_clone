import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getGameById } from "../api/getData";
import { Navbar } from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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

  const platforms = data?.platforms
    ? data.platforms.map((p) => p.platform.name).join(", ")
    : "Unknown";

  const genres = data?.genres
    ? data.genres.map((g) => g.name).join(", ")
    : "Unknown";

  return (
    <>
      <Navbar />
      <main
        className="relative h-[calc(100vh-6rem)] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 1)), url(${data?.background_image_additional})`,
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row bg-gradient-to-t from-black via-black/50 to-transparent h-[calc(100vh-3rem)]">
          {data ? (
            <motion.div
              initial={{ opacity: 0.2 }} // Estado inicial (poco visible)
              animate={{ opacity: 1 }} // Estado final (visible)
              transition={{ duration: 1.2 }} // Duración de la animación
              className="md:w-5/12 p-5 flex justify-center"
            >
              <img
                src={data?.background_image}
                className="rounded-lg w-full shadow-lg aspect-[4/3] object-cover "
                alt={data?.name}
              />
            </motion.div>
          ) : (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded bg-slate-500 m-5 h-96 w-96 md:ms-10 md:mt-7"></div>
            </div>
          )}

          {/* Información del juego */}
          <div className="w-full md:w-7/12 text-center md:pl-5 pb-5 text-stone-300  h-[calc(100vh-6rem)]">
            {data ? (
              <>
                <motion.h3
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="text-5xl my-5 font-extrabold text-white"
                >
                  {data?.name}
                </motion.h3>
                <div
                  className="mt-4 p-5 font-mono text-sm text-stone-100"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <p className="font-bold">
                  <span className="text-stone-300 text-base"> Platforms:</span>{" "}
                  <span className="text-white text-base">{platforms}</span>
                </p>
                <p className="font-bold">
                  <span className="text-stone-300 text-base"> genres:</span>{" "}
                  <span className="text-white text-base">{genres}</span>
                </p>
                <div className="flex justify-center gap-4 text-xs font-bold text-amber-400">
                  <span>Rating: {data?.rating}</span>{" "}
                  <span>Metacritic: {data?.metacritic ?? "Not available"}</span>
                </div>
                <p className="text-sm pt-2">Released: {data?.released}</p>

                {data.website && (
                  <a
                    href={data?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lime-500 animate-pulse"
                  >
                    Website: {data?.website}
                  </a>
                )}

                <p className="text-xs">ID: {data?.id}</p>

                <div className="flex justify-between items-center mx-10 mt-2 pb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn-primary px-4 py-1 hover:bg-lime-500 hover:scale-110 transition rounded bg-stone-700"
                  >
                    Back
                  </button>
                  <button onClick={() => handlerLikes(like, id)}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`cursor-pointer text-2xl transition ease-in-out hover:scale-125 ${
                        like ? "text-lime-600" : "text-stone-700"
                      }`}
                    />
                  </button>
                </div>
              </>
            ) : (
              <p className="ps-10 mt-6 animate-pulse w-full">
                <span className="block bg-gray-300 h-6 w-9/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-8/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-4/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-6/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-8/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-8/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-11/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-11/12 mb-2"></span>
                <br />
                <span className="block bg-gray-300 h-6 w-11/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-11/12 mb-2"></span>
                <span className="block bg-gray-300 h-6 w-11/12 mb-2"></span>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
