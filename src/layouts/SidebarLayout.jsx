import { useContext } from "react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import { OrderingSelect } from "../components/ui/OrderingSelect";
import { Pagination } from "../components/Pagination";
import { childrenPropType } from "../constants/propTypes";
import { SidebarToggle } from "../components/ui/sidebar/SidebarToggle";
import { Context } from "../store/appContext";

export const SidebarLayout = ({ children }) => {
  const { store } = useContext(Context);

  return (
    <Background>
      <Navbar />
      {/* Botón toggle para desktop - fuera del contenedor principal */}
      <SidebarToggle />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <div
          className={`flex flex-col flex-1 bg-transparent overflow-hidden transition-all duration-300 ${
            store.isSidebarOpen ? "lg:pl-80" : "lg:pl-0"
          }`}
        >
          <main className="flex-1 bg-transparent p-3 ps-12 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
            <OrderingSelect />
            {children}
          </main>
          <div className="bg-transparent">
            <Pagination />
          </div>
        </div>
      </div>
    </Background>
  );
};

SidebarLayout.propTypes = {
  children: childrenPropType.isRequired,
};
