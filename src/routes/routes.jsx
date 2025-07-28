import { Favorites } from "../pages/Favorites";
import { PageList } from "../pages/PageList";
import { NotFound } from "../pages/NotFound";
import { Search } from "../pages/Search";
import { GameWrapper } from "./GameWrapper";

export const routes = [
  { path: "/", element: <PageList /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/search", element: <Search /> },
  { path: "/search/:id", element: <GameWrapper /> },
  { path: "/game/:id", element: <GameWrapper /> },
  { path: "/favorites/:id", element: <GameWrapper /> },
  { path: "/:id", element: <GameWrapper /> },
  { path: "/not-found", element: <NotFound /> },
  // Ruta catch-all para NotFound
  { path: "*", element: <NotFound /> },
];
