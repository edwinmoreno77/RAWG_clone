import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-stone-950 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
