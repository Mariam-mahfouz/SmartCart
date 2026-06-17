import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // ⛔ not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ⛔ admin route only
  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;