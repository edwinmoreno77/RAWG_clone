import { Favorites } from "../pages/Favorites";
import { PageList } from "../pages/PageList";
import { NotFound } from "../pages/NotFound";
import { Search } from "../pages/Search";
import { GameWrapper } from "./GameWrapper";

export const routes = [
  { path: "/", element: <PageList /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/search", element: <Search /> },
  // Rutas de GameWrapper con ruta específica
  { path: "/search/:id", element: <GameWrapper route="/search/:id" /> },
  { path: "/game/:id", element: <GameWrapper route="/game/:id" /> },
  { path: "/favorites/:id", element: <GameWrapper route="/favorites/:id" /> },
  { path: "/:id", element: <GameWrapper route="/:id" /> },
  // Ruta específica para NotFound
  { path: "/not-found", element: <NotFound /> },
  // Ruta catch-all para NotFound
  { path: "*", element: <NotFound /> },
];
