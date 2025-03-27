import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardSkeleton } from "../components/CardSkeleton";

export const PageList = () => {
  const { store, actions } = useContext(Context);
  const { filteredData, isLoading } = store;
  const { setIsLoading } = actions;

  useEffect(() => {
    actions.getPages();
    // TODO: Mejorar la logica de loading
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 600);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {[...Array(12)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : !filteredData || filteredData.length === 0 ? (
        <div className="text-center text-white text-xl mt-44 font-bold">
          No results found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {filteredData.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </Layout>
  );
};
