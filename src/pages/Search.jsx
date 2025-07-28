import { useState, useEffect } from "react";
import { Card } from "../components/card/Card";
import { getGameByName } from "../api/getData";
import { useSearchParams } from "react-router-dom";
import { useLastRowCards } from "../hooks/useLastRowCards";
import { AmbientLayout } from "../layouts/AmbientLayout";

export const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "call of duty";

  const itemsWithLastRow = useLastRowCards(data, 5, true);

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
    <AmbientLayout>
      <main className="flex-1 bg-stone-950 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
        {/* Título de búsqueda */}
        <div className="relative z-10 flex flex-row items-center justify-center mt-3 mb-1 gap-5">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-stone-500 via-stone-100 to-stone-500 bg-clip-text text-transparent mb-1">
            Search results:
          </h1>
          <span className="text-stone-200 text-lg font-bold">
            &ldquo;{searchQuery}&rdquo;
          </span>
        </div>

        {isLoading ? (
          <div className="relative z-10 flex justify-center items-center h-40 pt-10">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1 pt-5 px-4">
            {itemsWithLastRow?.map((game) => (
              <Card key={game.id} item={game} />
            ))}
          </div>
        )}
      </main>
    </AmbientLayout>
  );
};
