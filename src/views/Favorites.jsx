import { useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";

export const Favorites = () => {
  const { store } = useContext(Context);
  const { favorites } = store;

  return (
    <>
      <Navbar />
      <main className="container-fluid px-5 min-h-screen bg-stone-950">
        {favorites.length === 0 ? (
          <h1 className="text-center pt-3 mt-28 text-4xl animate-pulse text-white font-bold decoration-white tracking-tight">
            Add favorites
          </h1>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {favorites.map((character) => (
              <Card key={character.id} item={character} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
