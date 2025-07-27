import { useState, useEffect } from "react";
import { Navbar } from "../components/ui/Navbar";
import { Card } from "../components/card/Card";
import { getGameByName } from "../api/getData";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "call of duty";

  const searchByName = async (name) => {
    setIsLoading(true);
    const results = await getGameByName(name);
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    searchByName(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <main className="relative container-fluid min-h-screen bg-stone-950 overflow-hidden">
        <Navbar />

        {/* Título de búsqueda */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Resultados de búsqueda
          </h1>
          <p className="text-stone-400 text-lg">&ldquo;{searchQuery}&rdquo;</p>
        </div>

        {isLoading ? (
          <div className="relative z-10 flex justify-center items-center h-40 pt-10">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1 pt-5 px-4">
            {data?.map((game) => (
              <Card key={game.id} item={game} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
