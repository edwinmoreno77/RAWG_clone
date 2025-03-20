import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";

export const PageList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {!store.filteredData || store.filteredData.length === 0 ? (
        <div className="text-center text-white text-xl mt-44 font-bold animate-pulse">
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
