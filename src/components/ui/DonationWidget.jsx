import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const DonationWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar cuántas veces se ha mostrado
    const showCount = parseInt(
      localStorage.getItem("donationWidgetShown") || "0"
    );

    // Solo mostrar si no se ha mostrado más de 2 veces
    if (showCount < 2) {
      // Primer timer: 60 segundos
      const firstTimer = setTimeout(() => {
        if (showCount === 0) {
          setIsVisible(true);
          localStorage.setItem("donationWidgetShown", "1");
        }
      }, 60000);

      // Segundo timer: 4 minutos (240 segundos)
      const secondTimer = setTimeout(() => {
        if (showCount === 1) {
          setIsVisible(true);
          localStorage.setItem("donationWidgetShown", "2");
        }
      }, 240000);

      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-gradient-to-br from-stone-950 via-stone-800 to-stone-950 p-6 rounded-xl shadow-2xl border border-stone-700 max-w-sm z-50"
    >
      <div className="flex items-center space-x-3 mb-4">
        <FontAwesomeIcon
          icon={faHeart}
          className="text-red-500 text-xl animate-pulse"
        />
        <h3 className="text-white font-bold text-lg">
          Do you like RAWG clone?
        </h3>
      </div>

      <p className="text-stone-200 text-sm mb-4">
        This project is 100% free and open source. If you like it, consider
        supporting it to keep it alive.
      </p>

      <div className="space-y-3">
        <a
          href="https://github.com/edwinmoreno77/_game_finder_page_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-900 hover:from-stone-400 hover:via-stone-500 hover:to-stone-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
          <span>⭐ Give a star</span>
        </a>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-stone-400 hover:text-white transition-colors duration-200"
      >
        ×
      </button>
    </motion.div>
  );
};

export default DonationWidget;
