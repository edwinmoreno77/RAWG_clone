import { AmbientLayout } from "../layouts/AmbientLayout";
import { FavoritesContent } from "../components/favorites/FavoritesContent";

export const Favorites = () => {
  return (
    <AmbientLayout>
      <FavoritesContent />
    </AmbientLayout>
  );
};
