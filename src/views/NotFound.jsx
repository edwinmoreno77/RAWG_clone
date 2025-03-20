import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen flex flex-col justify-center items-center bg-stone-950">
        <div className="text-center mt-5">
          <h1 className="text-4xl font-bold mb-5">Not Found</h1>
          <Link
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-5"
            to={"/"}
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
};
