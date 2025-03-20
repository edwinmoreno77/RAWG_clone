import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const PageList = () => {
  const { store } = useContext(Context);

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {store.filteredData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Pagination />
    </Layout>
  );
};
