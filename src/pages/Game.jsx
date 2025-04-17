import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../components/ui/Navbar";
import { getGameById } from "../api/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt";
import { Platforms } from "../components/game/Platforms";
import { Screenshots } from "../components/game/Screenshots";
import { Video } from "../components/game/Video";
import { Genres } from "../components/game/Genres";
import { Stores } from "../components/game/Stores";
import { Website } from "../components/game/Website";
import { Developers } from "../components/game/Developers";

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

  const { rotate, onMouseMove, onMouseLeave } = useTilt();

  // mantener el scroll en la parte superior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white z-0"
        style={{
          backgroundImage: data
            ? `linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8)), url(${data?.background_image_additional})`
            : "linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8))",
        }}
      >
        <Navbar />
        <div className="relative z-10 flex flex-col bg-gradient-to-t from-black via-black/50 to-transparent min-h-screen xl:px-10">
          {/* contenido principal */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-12/12 mx-auto mt-5 lg:mt-0 lg:px-5">
            {/* Imagen principal */}
            {data ? (
              <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="flex flex-col justify-center w-11/12 h-96 m-0 p-0 sm:mt-7 md:p-5 md:my-2 md:h-96 lg:h-[calc(100vh-4rem)]"
              >
                <img
                  src={data?.background_image}
                  className="rounded-lg hover:border mb-4 border-stone-600 w-full h-full shadow-lg object-cover transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform brightness-90 hover:brightness-105"
                  alt={data?.name}
                  loading="lazy"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  style={{
                    transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 2)`,
                    transition:
                      "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                  }}
                />
                <Platforms data={data} />

                {/* Rating y Metacritic */}
                <div className="flex justify-center gap-4 text-xs font-bold text-amber-400 mt-2">
                  {data ? (
                    <>
                      <span>Rating: {data?.rating}</span>
                      <span>
                        Metacritic: {data?.metacritic ?? "Not available"}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="animate-pulse bg-slate-500 h-4 w-20 rounded" />
                      <div className="animate-pulse bg-slate-500 h-4 w-24 rounded" />
                    </>
                  )}
                </div>
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

            {/* Información del juego */}
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
              <div className="flex flex-col items-center mt-4 p-1 font-serif text-sm text-stone-100 prose prose-invert">
                {data ? (
                  <>
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
                          __html: data?.description,
                        }}
                      />
                    </motion.div>
                  </>
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
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="pb-10 pt-5 md:pt-1 text-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full px-2 lg:px-5">
                <Video data={data} />
                <Screenshots data={data} />
              </div>

              <Developers data={data} />

              <Stores data={data} />

              <Genres data={data} />

              <Website data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
