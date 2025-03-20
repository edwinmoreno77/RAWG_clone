import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const PageList = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await actions.getPages();
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center text-white text-xl mt-44 font-bold animate-pulse">
          Loading...
        </div>
      ) : !store.filteredData || store.filteredData.length === 0 ? (
        <div className="text-center text-white text-xl mt-44 font-bold">
          No results found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {store.filteredData.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </Layout>
  );
};
