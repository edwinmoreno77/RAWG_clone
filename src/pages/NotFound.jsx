import { Link } from "react-router-dom";
import { AmbientLayout } from "../layouts/AmbientLayout";

export const NotFound = () => {
  return (
    <AmbientLayout>
      <main className="flex-1 bg-stone-950 px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Número 404 con estilo */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-stone-500 via-stone-100 to-stone-500 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>

          {/* Mensaje principal */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Oops! Page not found
            </h2>
            <p className="text-stone-400 text-lg max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to another dimension.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/"
              className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border-2 border-stone-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-200 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex h-12 items-center justify-center rounded-md border-2 border-stone-700 bg-stone-800 px-6 font-medium text-gray-300 hover:bg-stone-700 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:ring-offset-stone-50"
            >
              Go Back
            </button>
          </div>

          {/* Elemento decorativo */}
          <div className="mt-12 opacity-30">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </main>
    </AmbientLayout>
  );
};
