import { SidebarLayout } from "../layouts/SidebarLayout";
import { Card } from "../components/card/Card";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardSkeleton } from "../components/card/CardSkeleton";
import { useLastRowCards } from "../hooks/useLastRowCards";

export const PageList = () => {
  const { store, actions } = useContext(Context);
  const { filteredData, isLoading, isSidebarOpen } = store;

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ajustar el número de cards por fila según el estado del sidebar
  const cardsPerRow = isSidebarOpen ? 3 : 4;
  const itemsWithLastRow = useLastRowCards(filteredData, cardsPerRow, true);

  return (
    <SidebarLayout>
      {isLoading ? (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-${
              isSidebarOpen ? "4" : "5"
            } gap-1 transition-all duration-300`}
          >
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
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-${
              isSidebarOpen ? "4" : "5"
            } gap-1 transition-all duration-300`}
          >
            {itemsWithLastRow.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </SidebarLayout>
  );
};
