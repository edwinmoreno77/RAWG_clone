import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faLightbulb,
  faStar,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { AIService } from "../../services/aiService";

export const AIInsights = ({ gameData }) => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");

  // Usar el servicio de IA
  const generateAIInsights = async (game) => {
    setIsLoading(true);

    try {
      const insights = await AIService.analyzeGame(game);
      setInsights(insights);
    } catch (error) {
      console.error("Error generando insights de IA:", error);
      // Fallback a insights básicos
      setInsights({
        analysis: {
          sentiment: "Neutral",
          difficulty: "Moderado",
          replayability: "Moderada",
          targetAudience: "Gamers casuales",
        },
        recommendations: [],
        tips: ["Comienza con el tutorial"],
        summary: {
          pros: ["Buen juego"],
          cons: ["Algunas limitaciones"],
          verdict: "Recomendado",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameData) {
      generateAIInsights(gameData);
    }
  }, [gameData]);

  if (!gameData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-stone-900/80 backdrop-blur-sm rounded-lg p-6 mt-6 border border-stone-700"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FontAwesomeIcon icon={faBrain} className="text-lime-400 text-xl" />
        <h3 className="text-xl font-bold text-white">AI Insights</h3>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {["analysis", "recommendations", "tips", "summary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-lime-600 text-white"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            {tab === "analysis" && (
              <FontAwesomeIcon icon={faStar} className="mr-2" />
            )}
            {tab === "recommendations" && (
              <FontAwesomeIcon icon={faGamepad} className="mr-2" />
            )}
            {tab === "tips" && (
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
            )}
            {tab === "summary" && (
              <FontAwesomeIcon icon={faBrain} className="mr-2" />
            )}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
          <span className="ml-3 text-stone-300">Analizando con IA...</span>
        </div>
      ) : insights ? (
        <div className="space-y-4">
          {activeTab === "analysis" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lime-400 mb-2">
                  Análisis de Sentimiento
                </h4>
                <p className="text-stone-300">{insights.analysis.sentiment}</p>
              </div>
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lime-400 mb-2">Dificultad</h4>
                <p className="text-stone-300">{insights.analysis.difficulty}</p>
              </div>
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lime-400 mb-2">
                  Rejugabilidad
                </h4>
                <p className="text-stone-300">
                  {insights.analysis.replayability}
                </p>
              </div>
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lime-400 mb-2">
                  Audiencia Objetivo
                </h4>
                <p className="text-stone-300">
                  {insights.analysis.targetAudience}
                </p>
              </div>
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="space-y-4">
              {insights.recommendations.map((rec, index) => (
                <div key={index} className="bg-stone-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lime-400 mb-2">
                    {rec.name}
                  </h4>
                  <p className="text-stone-300 mb-2">{rec.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.games.map((game, gameIndex) => (
                      <span
                        key={gameIndex}
                        className="bg-stone-700 px-2 py-1 rounded text-xs text-stone-300"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div className="space-y-3">
              {insights.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-stone-800/50 p-4 rounded-lg"
                >
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-lime-400 mt-1 flex-shrink-0"
                  />
                  <p className="text-stone-300">{tip}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "summary" && (
            <div className="space-y-4">
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1">
                  {insights.summary.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="text-stone-300 flex items-center"
                    >
                      <span className="text-green-400 mr-2">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">Contras</h4>
                <ul className="space-y-1">
                  {insights.summary.cons.map((con, index) => (
                    <li
                      key={index}
                      className="text-stone-300 flex items-center"
                    >
                      <span className="text-red-400 mr-2">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-lime-600/20 p-4 rounded-lg border border-lime-600/30">
                <h4 className="font-semibold text-lime-400 mb-2">
                  Veredicto Final
                </h4>
                <p className="text-white font-medium">
                  {insights.summary.verdict}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </motion.div>
  );
};

AIInsights.propTypes = {
  gameData: PropTypes.object,
};
