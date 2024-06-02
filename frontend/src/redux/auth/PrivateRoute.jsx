import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      case "partner":
        return <Navigate to="/partner-dashboard" />;
      case "tecnico":
        return <Navigate to="/tecnico-dashboard" />;
      default:
        return <Navigate to="/403" />;
    }
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.oneOf(["admin", "partner", "tecnico"]))
    .isRequired,
};

export default PrivateRoute;
