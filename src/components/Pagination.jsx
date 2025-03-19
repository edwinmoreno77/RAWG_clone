import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Pagination = () => {
  const { store, actions } = useContext(Context);
  const { increasePage, decreasePage, setPage } = actions;
  const { page } = store;

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = 42; // Número total de páginas
  const getPageNumbers = () => {
    const range = 3; // Número de páginas a mostrar a cada lado de la actual
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center my-3">
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
              className={`py-2 px-3 ml-0 shadow-lg leading-tight text-black bg-white border border-gray-300 rounded-l-lg cursor-pointer user-select-none ${
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
              className={`py-2 px-3 leading-tight border border-gray-300 cursor-pointer shadow-lg user-select-none ${
                pageNumber === page
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              <a>{pageNumber}</a>
            </li>
          ))}

          {/* Botón "Next" */}
          <li
            onClick={() => {
              if (page < totalPages) {
                increasePage();
              }
            }}
            className={`py-2 px-3 shadow-lg user-select-none leading-tight text-black bg-white border border-gray-300 rounded-r-lg cursor-pointer user-select-none ${
              page >= totalPages
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
