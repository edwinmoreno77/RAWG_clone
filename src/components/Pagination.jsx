import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export const Pagination = () => {
  const { page, increasePage, decreasePage, setPage, getPages, totalPages } =
    useGameStore();

  useEffect(() => {
    getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getPageNumbers = () => {
    const range = 3; // Número de páginas a mostrar a cada lado de la actual
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages || 100, page + range);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex bg-transparent justify-center my-2 text-xs">
      <nav>
        <ul className="inline-flex items-center user-select-none">
          {/* Botón "Previous" */}
          <li
            onClick={() => {
              if (page > 1) {
                decreasePage();
              }
            }}
            className="user-select-none bg-white"
          >
            <a
              className={`py-1 px-3 ml-0 shadow-lg leading-tight text-white bg-stone-700 hover:bg-black border border-gray-300 rounded-l-lg cursor-pointer user-select-none ${
                page <= 1 ? "bg-lime-900 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </a>
          </li>

          {/* Números de página */}
          {getPageNumbers().map((pageNumber) => (
            <li
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`py-1 px-3 leading-tight border border-gray-300 hover:brightness-90 cursor-pointer shadow-lg user-select-none ${
                pageNumber === page
                  ? "bg-black text-white"
                  : "bg-stone-700 text-white"
              }`}
            >
              <a>{pageNumber}</a>
            </li>
          ))}

          {/* Botón "Next" */}
          <li
            onClick={() => {
              if (page < (totalPages || 100)) {
                increasePage();
              }
            }}
            className={`py-1 px-3 shadow-lg user-select-none leading-tight text-white bg-stone-700 hover:bg-black border border-gray-300  rounded-r-lg cursor-pointer user-select-none ${
              page >= (totalPages || 100)
                ? "bg-lime-900 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            <a>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
