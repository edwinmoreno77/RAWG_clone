import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { getGameByName } from "../api/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Search = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <Navbar />
      <main className="container-fluid min-h-screen bg-stone-950">
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="relative w-11/12 md:w-5/12">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              className="form-input w-full p-3 pl-10 border rounded-xl shadow-lg"
              type="text"
              placeholder="What game are you looking for?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={() => searchByName(name)}
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
