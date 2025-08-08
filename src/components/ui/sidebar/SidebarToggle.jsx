import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useGameStore } from "../../../store/gameStore";

export const SidebarToggle = () => {
  const { isSidebarOpen, toggleSidebar } = useGameStore();

  return (
    <motion.button
      onClick={toggleSidebar}
      className={`hidden lg:flex fixed z-30 bg-stone-800 hover:bg-stone-700 text-white p-2.5 rounded-full shadow-lg border transition-all duration-300 hover:scale-110 backdrop-blur-sm cursor-pointer ${
        isSidebarOpen ? "border-stone-400 " : "border-lime-600"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: "translateY(-50%)",
        transition: "all 0.3s ease-in-out",
        left: isSidebarOpen ? "325px" : "16px",
        top: "50%",
        position: "fixed",
      }}
    >
      <motion.div
        animate={{ rotate: isSidebarOpen ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        title={isSidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={`text-lg ${
            isSidebarOpen ? "" : "animate-pulse text-lime-300"
          }`}
        />
      </motion.div>
    </motion.button>
  );
};
