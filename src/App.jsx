import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorites } from "./pages/Favorites";
import { Game } from "./pages/Game";
import { PageList } from "./pages/PageList";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";
import injectContext from "./store/appContext";
import "./App.css";

const router = createBrowserRouter(
  [
    { path: "/", element: <PageList /> },
    { path: "/favorites", element: <Favorites /> },
    { path: "/search", element: <Search /> },
    { path: "/search/:id", element: <Game /> },
    { path: "/game/:id", element: <Game /> },
    { path: "/favorites/:id", element: <Game /> },
    { path: "/:id", element: <Game /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default injectContext(App);
