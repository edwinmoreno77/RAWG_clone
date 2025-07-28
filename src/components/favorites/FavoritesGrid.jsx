import { Card } from "../card/Card";
import { useLastRowCards } from "../../hooks/useLastRowCards";
import { useFavorites } from "../../hooks/useFavorites";

export const FavoritesGrid = () => {
  const { favorites, lastRowItems } = useFavorites();
  const itemsWithLastRow = useLastRowCards(favorites, lastRowItems, false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
      {itemsWithLastRow.map((character) => (
        <Card key={character.id} item={character} />
      ))}
    </div>
  );
};
