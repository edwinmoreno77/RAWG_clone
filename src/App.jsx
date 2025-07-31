import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import injectContext from "./store/appContext";
import DonationWidget from "./components/ui/DonationWidget";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <DonationWidget />
    </>
  );
}

export default injectContext(App);
