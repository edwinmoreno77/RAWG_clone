import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { getGameByName } from "../api/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const Search = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    inputRef,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useSpotlightBorder();

  const searchByName = async (name) => {
    setIsLoading(true);
    const results = await getGameByName(name);
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    searchByName("call of duty");
    setIsLoading(false);
  }, []);

  const clearInput = () => {
    setName("");
    inputRef.current.blur(); //quitar el foco del input
  };

  return (
    <>
      <Navbar />
      <main className="container-fluid min-h-screen bg-stone-950">
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="relative w-11/12 md:w-5/12">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white ${
                name !== "" ? "animate-pulse" : ""
              }`}
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-200 hover:text-white hover:scale-125 transition ${
                name !== "" ? "block" : "hidden"
              } cursor-pointer`}
              onClick={clearInput}
            />
            <input
              className="form-input w-full p-3 pl-10 bg-stone-800 text-white rounded-xl shadow-lg focus:bg-black focus:text-white"
              type="text"
              placeholder="What game are you looking for?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={() => searchByName(name)}
              ref={inputRef}
              onMouseMove={handleMouseMove}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* Borde animado */}
            <input
              disabled
              style={{
                border: "1.5px solid #ffffff",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full rounded-xl bg-transparent transition-opacity duration-500"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40 pt-10">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 pt-5">
            {data?.map((game) => (
              <Card key={game.id} item={game} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
