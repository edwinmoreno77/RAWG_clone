import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import { OrderingSelect } from "../components/ui/OrderingSelect";
import { Pagination } from "../components/Pagination";
import { childrenPropType } from "../constants/propTypes";

export const SidebarLayout = ({ children }) => {
  return (
    <Background>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-transparent overflow-hidden">
          <main className="flex-1 bg-transparent p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900">
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
