import { useContext } from "react";
import { Context } from "../../../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export const SidebarToggle = () => {
  const { store, actions } = useContext(Context);

  const toggleSidebar = () => {
    actions.toggleSidebar();
  };

  return (
    <motion.button
      onClick={toggleSidebar}
      className="hidden lg:flex fixed z-50 bg-stone-800 hover:bg-stone-700 text-white p-3 rounded-full shadow-lg border border-stone-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: "translateY(-50%)",
        transition: "all 0.3s ease-in-out",
        left: store.isSidebarOpen ? "320px" : "16px",
        top: "50%",
        position: "fixed",
      }}
    >
      <motion.div
        animate={{ rotate: store.isSidebarOpen ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        title={store.isSidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={`text-lg ${
            store.isSidebarOpen ? "" : "animate-pulse text-lime-300"
          }`}
        />
      </motion.div>
    </motion.button>
  );
};
