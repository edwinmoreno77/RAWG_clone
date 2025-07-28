import { SidebarLayout } from "../layouts/SidebarLayout";
import { Card } from "../components/card/Card";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardSkeleton } from "../components/card/CardSkeleton";
import { useLastRowCards } from "../hooks/useLastRowCards";

export const PageList = () => {
  const { store, actions } = useContext(Context);
  const { filteredData, isLoading } = store;

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsWithLastRow = useLastRowCards(filteredData, 4, true);

  return (
    <SidebarLayout>
      {isLoading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-1">
            {[...Array(12)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </>
      ) : !filteredData || filteredData.length === 0 ? (
        <div className="text-center text-white text-xl mt-44 font-bold">
          No results found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-1">
            {itemsWithLastRow.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </SidebarLayout>
  );
};
