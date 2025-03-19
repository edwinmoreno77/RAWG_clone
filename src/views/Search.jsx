import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { getGameByName } from "../api/getData";

export const Search = () => {
  const [name, setName] = useState("");
  const [data, setdata] = useState(null);

  const searchByName = async (name) => {
    const data = await getGameByName(name);
    setdata(data);
  };

  return (
    <>
      <Navbar />
      <main className="container-fluid min-h-screen bg-black">
        <h1 className="text-center pt-5 text-3xl font-bold text-white hover:brightness-110">
          Search Game by Name
        </h1>
        <div className="flex flex-col items-center justify-center mt-3">
          <input
            className="form-input :w-1/3 p-1 border rounded shadow-lg"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={() => searchByName(name)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 transition ease-in-out">
          {data?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
};
