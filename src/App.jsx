import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorites } from "./views/Favorites";
import { Game } from "./views/Game";
import { PageList } from "./views/PageList";
import { NotFound } from "./views/NotFound";
import { Search } from "./views/Search";
import injectContext from "./store/appContext";
import "./App.css";

const router = createBrowserRouter(
  [
    { path: "/", element: <PageList /> },
    { path: "/favorites", element: <Favorites /> },
    { path: "/search", element: <Search /> },
    { path: "/search/:id", element: <Game /> },
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
