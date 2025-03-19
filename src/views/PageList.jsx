import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { getFilteredGames } from "../api/getData";

export const PageList = () => {
  const { store, actions } = useContext(Context);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData(store.pageData);
  }, [store.pageData]);

  const handleFilter = async (filters) => {
    const results = await getFilteredGames(filters);
    setFilteredData(results);
  };

  return (
    <Layout onFilter={handleFilter}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {filteredData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Pagination />
    </Layout>
  );
};
