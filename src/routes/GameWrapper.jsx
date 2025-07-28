import { useParams, Navigate } from "react-router-dom";
import { Game } from "../pages/Game";

export const GameWrapper = () => {
  const { id } = useParams();

  // Verificar si el ID es un número válido
  const isValidId = !isNaN(id) && parseInt(id) > 0;

  if (!isValidId) {
    // Redirigir a NotFound si el ID no es válido
    return <Navigate to="/not-found" replace />;
  }

  return <Game />;
};
