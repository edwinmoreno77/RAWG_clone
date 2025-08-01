import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
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

export default App;
