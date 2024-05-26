import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (user.role === "partner") {
      return <Navigate to="/partner-dashboard" />;
    } else if (user.role === "tecnico") {
      return <Navigate to="/tecnico-dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.oneOf(["admin", "partner", "tecnico"]))
    .isRequired,
};

export default PrivateRoute;
