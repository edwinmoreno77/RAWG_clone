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
      // Mostrar error específico con mensaje claro
      setInsights({
        error: true,
        message: error.message.includes("no generó")
          ? "La IA no pudo generar análisis para este juego. Intenta con otro juego o verifica tu conexión."
          : error.message || "Error al conectar con la IA",
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
      className=" backdrop-blur-sm rounded-lg p-6 mt-6 border border-stone-700"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FontAwesomeIcon icon={faBrain} className="text-stone-300 text-xl" />
        <h3 className="text-xl font-bold text-white">AI Insights</h3>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {["analysis", "recommendations", "tips", "tricks", "summary"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-stone-600 text-white"
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
              {tab === "tricks" && (
                <FontAwesomeIcon icon={faBrain} className="mr-2" />
              )}
              {tab === "summary" && (
                <FontAwesomeIcon icon={faBrain} className="mr-2" />
              )}
              {tab === "tricks"
                ? "Tricks"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-400"></div>
          <span className="ml-3 text-stone-300">Analyzing with AI...</span>
        </div>
      ) : insights?.error ? (
        <div className="bg-stone-900/20 border border-stone-600/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FontAwesomeIcon
              icon={faBrain}
              className="text-stone-400 text-lg"
            />
            <h4 className="font-semibold text-stone-400">AI Error</h4>
          </div>
          <p className="text-stone-300 text-sm">{insights.message}</p>
          <p className="text-stone-400 text-xs mt-2">
            {insights.message.includes("no pudo generar")
              ? "This can happen if the AI doesn't have enough information about the game or there are connection issues."
              : "Verify that your API key is configured correctly in the .env file"}
          </p>
        </div>
      ) : insights ? (
        <div className="space-y-4">
          {activeTab === "analysis" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-stone-300 mb-2">
                  Sentiment Analysis
                </h4>
                <p className="text-stone-300 capitalize">
                  {insights.analysis?.sentiment || "Not available"}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-stone-300 mb-2">
                  Difficulty
                </h4>
                <p className="text-stone-300 capitalize">
                  {insights.analysis?.difficulty || "Not available"}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-stone-300 mb-2">
                  Replayability
                </h4>
                <p className="text-stone-300 capitalize">
                  {insights.analysis?.replayability || "Not available"}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-stone-300 mb-2">
                  Target Audience
                </h4>
                <p className="text-stone-300">
                  {insights.analysis?.targetAudience || "Not available"}
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "recommendations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {insights.recommendations &&
              insights.recommendations.length > 0 ? (
                insights.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-stone-800/50 p-4 rounded-lg"
                  >
                    <h4 className="font-semibold text-stone-300 mb-2">
                      {rec.name}
                    </h4>
                    <p className="text-stone-300 mb-3">{rec.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.games && rec.games.length > 0 ? (
                        rec.games.map((game, gameIndex) => (
                          <motion.span
                            key={gameIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.1 + gameIndex * 0.05,
                            }}
                            className="bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-300"
                          >
                            {game}
                          </motion.span>
                        ))
                      ) : (
                        <span className="text-stone-500 text-sm">
                          No recommendations available
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-800/50 p-4 rounded-lg"
                >
                  <p className="text-stone-500 text-center">
                    No recommendations available
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "tips" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              {insights.tips && insights.tips.length > 0 ? (
                insights.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-stone-800/50 p-4 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-stone-300 mt-1 flex-shrink-0"
                    />
                    <p className="text-stone-300">{tip}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-800/50 p-4 rounded-lg"
                >
                  <p className="text-stone-500 text-center">
                    No tips available
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "tricks" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              {insights.tricks && insights.tricks.length > 0 ? (
                insights.tricks.map((trick, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-stone-800/50 p-4 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faBrain}
                      className="text-stone-300 mt-1 flex-shrink-0"
                    />
                    <p className="text-stone-300">{trick}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-800/50 p-4 rounded-lg"
                >
                  <p className="text-stone-500 text-center">
                    No tricks available
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "summary" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-bold text-stone-400 mb-3">Pros</h4>
                {insights.summary?.pros && insights.summary.pros.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.summary.pros.map((pro, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + index * 0.05,
                        }}
                        className="text-stone-300 flex items-start"
                      >
                        <span className="text-green-400 mr-3 mt-1">✓</span>
                        <span>{pro}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-stone-500">No pros available</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-stone-800/50 p-4 rounded-lg"
              >
                <h4 className="font-bold text-stone-400 mb-3">Cons</h4>
                {insights.summary?.cons && insights.summary.cons.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.summary.cons.map((con, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + index * 0.05,
                        }}
                        className="text-stone-300 flex items-start"
                      >
                        <span className="text-red-400 mr-3 mt-1">✗</span>
                        <span>{con}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-stone-500">No cons available</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-stone-600/20 p-4 rounded-lg border border-stone-600/30"
              >
                <h4 className="font-semibold text-stone-300 mb-2">
                  Final Verdict
                </h4>
                <p className="text-white font-medium capitalize">
                  {insights.summary?.verdict || "Not available"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      ) : null}
    </motion.div>
  );
};

AIInsights.propTypes = {
  gameData: PropTypes.object,
};
