import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import injectContext from "./store/appContext";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default injectContext(App);
