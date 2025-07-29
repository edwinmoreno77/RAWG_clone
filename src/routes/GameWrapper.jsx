import { useParams, useLocation, Navigate } from "react-router-dom";
import { Game } from "../pages/Game";
import PropTypes from "prop-types";

export const GameWrapper = ({ route }) => {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  // Verificar si el ID es un número válido
  const isValidId = !isNaN(id) && parseInt(id) > 0;

  if (!isValidId) {
    // Redirigir a NotFound si el ID no es válido
    return <Navigate to="/not-found" replace />;
  }

  // Pasar la ruta actual al componente Game para contexto
  return <Game routePath={currentPath} route={route} />;
};

GameWrapper.propTypes = {
  route: PropTypes.string.isRequired,
};
