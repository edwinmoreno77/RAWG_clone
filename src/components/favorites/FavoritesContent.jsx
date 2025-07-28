import { EmptyState } from "../ui/EmptyState";
import { FavoritesGrid } from "./FavoritesGrid";
import { useFavorites } from "../../hooks/useFavorites";

export const FavoritesContent = () => {
  const { hasFavorites } = useFavorites();

  return (
    <main className="flex-1 bg-stone-950 px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
      {!hasFavorites ? <EmptyState title="Add favorites" /> : <FavoritesGrid />}
    </main>
  );
};
