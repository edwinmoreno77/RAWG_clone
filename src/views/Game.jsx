import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getGameById } from "../api/getData";
import { Navbar } from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt";
import { Platforms } from "../components/Platforms";

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

  const genres = data?.genres
    ? data.genres.map((g) => g.name).join(", ")
    : "Unknown";

  const developers = data?.developers
    ? data.developers.map((dev) => dev.name).join(", ")
    : "Unknown";

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
        <div className="relative z-10 flex flex-col bg-gradient-to-t from-black via-black/50 to-transparent min-h-screen">
          {/* contenido principal */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-12/12 mx-auto mt-5 lg:mt-0 lg:px-5">
            {/* Imagen principal */}
            {data ? (
              <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="w-11/12  m-0 p-0 sm:mt-7  flex flex-col md:p-5 md:my-2 justify-center h-96 md:h-96 lg:h-[calc(100vh-4rem)]"
              >
                <img
                  src={data?.background_image}
                  className="rounded-lg border mb-4 border-stone-600 w-full h-full shadow-lg object-cover transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
                  alt={data?.name}
                  loading="lazy"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
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
                  className="text-5xl font-extrabold text-white py-5 lg:py-0"
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
            {/* Contenido adicional */}
            <div className="pb-10 pt-5 md:pt-1 text-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full px-5">
                {/* Video del juego */}
                <div className="w-full flex justify-center items-center h-full">
                  {data?.videos?.length > 0 ? (
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className="w-full h-auto rounded-xl shadow-lg"
                      poster={data.videos[0].preview} // Imagen de vista previa
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

                {/* Grid de screenshots */}
                <div className="flex px-4 w-full">
                  {data ? (
                    data?.screenshots?.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
                        {data.screenshots.map((screenshot) => (
                          <div key={screenshot.id} className="relative group">
                            <img
                              src={screenshot.image}
                              alt={`Screenshot ${screenshot.id}`}
                              className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 border border-stone-600 hover:border-2 hover:border-stone-200"
                            />
                          </div>
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
              </div>

              {/* Desarrolladores */}
              <div className="flex flex-col font-bold mt-16 pt-5 w-6/12 text-center mx-auto">
                <span className="text-stone-300 text-xs">Developers:</span>{" "}
                {data ? (
                  <>
                    <span className="text-white text-base">{developers}</span>
                  </>
                ) : (
                  <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
                )}
              </div>

              {/* Tiendas */}
              <div className="font-bold mt-2 p-2">
                {data?.stores ? (
                  data.stores.length > 0 ? (
                    <>
                      <span className="text-stone-300 py-3 text-base">
                        Stores:
                      </span>{" "}
                      <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                        {data.stores.map((store) => (
                          <a
                            key={store.store.id}
                            href={`https://${store.store.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-white text-sm underline hover:text-amber-400 transition-colors"
                          >
                            {store.store.logo ? (
                              <img
                                src={store.store.logo} // URL del logotipo de la tienda
                                alt={store.store.name}
                                className="w-12 h-12 object-contain rounded-full shadow-md"
                              />
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
                    <p className="text-stone-300">
                      No stores available for this game.
                    </p>
                  )
                ) : (
                  <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
                )}
              </div>

              {/* Géneros */}
              <div className="font-bold mt-5">
                {data ? (
                  <>
                    <span className="text-stone-300 text-base">Genres:</span>{" "}
                    <span className="text-white text-base">{genres}</span>
                  </>
                ) : (
                  <div className="animate-pulse bg-slate-500 h-4 w-48 mx-auto rounded" />
                )}
              </div>

              {/* Website */}
              {data?.website && (
                <a
                  href={data?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary underline rounded animate-pulse mt-2 inline-block"
                >
                  {data?.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
