import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faUsers,
  faHandshake,
  faCogs,
  faShapes,
  faSignInAlt,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../img/cropped-LOGO1-1.png";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="dark"
          onClick={handleShow}
          className="mb-2"
          style={{ width: "40px", height: "40px", padding: 0 }}
        >
          <span
            style={{
              display: "inline-block",
              width: "30px",
              height: "30px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.75)' stroke-width='3' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
            }}
          ></span>
        </Button>
      )}

      {isMobile ? (
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="bg-dark text-white"
          style={{ width: "250px" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link
                to="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "50%", margin: "auto" }}
                />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <div style={{ flexGrow: 1 }}>
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <Link to="/" className={getLinkClass("/")}>
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/partner-dashboard"
                    className={getLinkClass("/partner-dashboard")}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/clienti" className={getLinkClass("/clienti")}>
                    <FontAwesomeIcon icon={faUsers} /> Clienti
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/partner" className={getLinkClass("/partner")}>
                    <FontAwesomeIcon icon={faHandshake} /> Partner
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tecnici" className={getLinkClass("/tecnici")}>
                    <FontAwesomeIcon icon={faCogs} /> Tecnici
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboardpartner"
                    className={getLinkClass("/dashboardpartner")}
                  >
                    <FontAwesomeIcon icon={faShapes} /> Modelli
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <Link to="/login" className={getLinkClass("/login")}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account" className={getLinkClass("/account")}>
                    <FontAwesomeIcon icon={faUser} /> Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/logout"
                    className={getLinkClass("/logout")}
                    style={{ color: "#b22222" }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <div
          className="bg-dark text-white d-flex flex-column"
          style={{
            width: "200px",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <div className="d-flex align-items-center mb-3 text-white text-decoration-none p-2">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "60%", margin: "auto" }}
            />
          </div>
          <div className="d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/" className={getLinkClass("/")}>
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/clienti" className={getLinkClass("/clienti")}>
                    <FontAwesomeIcon icon={faUsers} /> Clienti
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/partner" className={getLinkClass("/partner")}>
                    <FontAwesomeIcon icon={faHandshake} /> Partner
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/tecnici" className={getLinkClass("/tecnici")}>
                    <FontAwesomeIcon icon={faCogs} /> Tecnici
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link
                    to="/dashboardpartner"
                    className={getLinkClass("/dashboardpartner")}
                  >
                    <FontAwesomeIcon icon={faShapes} /> Modelli
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/login" className={getLinkClass("/login")}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link to="/account" className={getLinkClass("/account")}>
                    <FontAwesomeIcon icon={faUser} /> Account
                  </Link>
                </li>
                <li className="nav-item" style={{ padding: "5px 0" }}>
                  <Link
                    to="/logout"
                    className={getLinkClass("/logout")}
                    style={{ color: "#b22222" }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
