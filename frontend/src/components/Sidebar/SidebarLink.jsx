import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const SidebarLink = ({ path, icon, label, ...props }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const linkStyle = label === "Logout" ? { color: "#b22222" } : { color: "#ffffff" };

  return (
    <li className="nav-item" style={{ padding: "5px 0" }}>
      <Link to={path} className={getLinkClass(path)} style={linkStyle} {...props}>
        <FontAwesomeIcon icon={icon} /> {label}
      </Link>
    </li>
  );
};

SidebarLink.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default SidebarLink;
