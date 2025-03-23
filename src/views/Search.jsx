import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { getGameByName } from "../api/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";

export const Search = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hook para el efecto en el input (spotlight)
  const {
    inputRef: inputRefInput,
    position: positionInput,
    opacity: opacityInput,
    handleMouseMove: handleMouseMoveInput,
    handleFocus: handleFocusInput,
    handleBlur: handleBlurInput,
    handleMouseEnter: handleMouseEnterInput,
    handleMouseLeave: handleMouseLeaveInput,
  } = useSpotlightBorder();

  // Hook para el efecto en el fondo (ambient)
  const {
    inputRef: bgRef,
    position: bgPosition,
    opacity: bgOpacity,
    handleMouseMove: handleMouseMoveBg,
    handleMouseEnter: handleMouseEnterBg,
    handleMouseLeave: handleMouseLeaveBg,
  } = useSpotlightBorder();

  const searchByName = async (name) => {
    setIsLoading(true);
    const results = await getGameByName(name);
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    searchByName("call of duty");
  }, []);

  const clearInput = () => {
    setName("");
    inputRefInput.current.blur();
  };

  return (
    <>
      {/* Fondo con efecto ambient */}
      <main
        ref={bgRef}
        onMouseMove={handleMouseMoveBg}
        onMouseEnter={handleMouseEnterBg}
        onMouseLeave={handleMouseLeaveBg}
        className="relative container-fluid min-h-screen bg-stone-950 overflow-hidden"
      >
        {/* Efecto de fondo ambient */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: bgOpacity,
            background: `radial-gradient(150px circle at ${bgPosition.x}px ${bgPosition.y}px, rgba(255,255,255,0.05), transparent)`,
          }}
        />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center justify-center mt-3">
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
            {/* Input con efecto spotlight */}
            <input
              className="form-input w-full p-3 pl-10 bg-stone-800 text-white rounded-xl shadow-lg focus:bg-black focus:text-white"
              type="text"
              placeholder="What game are you looking for?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={() => searchByName(name)}
              ref={inputRefInput}
              onMouseMove={handleMouseMoveInput}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
              onMouseEnter={handleMouseEnterInput}
              onMouseLeave={handleMouseLeaveInput}
            />
            {/* Efecto de borde para el input */}
            <input
              disabled
              style={{
                border: "1.5px solid #ffffff",
                opacity: opacityInput,
                WebkitMaskImage: `radial-gradient(30% 30px at ${positionInput.x}px ${positionInput.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full rounded-xl bg-transparent transition-opacity duration-500"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="relative z-10 flex justify-center items-center h-40 pt-10">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 pt-5">
            {data?.map((game) => (
              <Card key={game.id} item={game} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
