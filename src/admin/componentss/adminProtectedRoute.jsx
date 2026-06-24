import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(
    (state) => state.admin
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;