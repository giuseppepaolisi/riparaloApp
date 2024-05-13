import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "250px", height: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none fs-2"
      >
        Riparalo
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            Partner
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboardpartner" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Clienti
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <a
          href="/"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Account
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/logout">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
