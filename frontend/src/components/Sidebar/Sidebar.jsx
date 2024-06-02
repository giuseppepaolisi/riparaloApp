import { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import logo from "../../assets/img/logo-riparalo.png";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ menuItems, commonMenu }) {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50%", margin: "auto" }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <div style={{ flexGrow: 1 }}>
              <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item) => (
                  <SidebarLink key={item.path} {...item} />
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <ul className="nav nav-pills flex-column mb-auto">
                {commonMenu.map((item) => (
                  <SidebarLink key={item.path} {...item} />
                ))}
                <SidebarLink path="/account" label="Account" icon={faUser} />
                <SidebarLink
                  path="/logout"
                  label="Logout"
                  icon={faSignOutAlt}
                  style={{ color: "#b22222" }}
                />
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
                {menuItems.map((item) => (
                  <SidebarLink key={item.path} {...item} />
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <ul className="nav nav-pills flex-column">
                {commonMenu.map((item) => (
                  <SidebarLink key={item.path} {...item} />
                ))}
                <SidebarLink path="/account" label="Account" icon={faUser} />
                <SidebarLink
                  path="/logout"
                  label="Logout"
                  icon={faSignOutAlt}
                  style={{ color: "#b22222" }}
                />
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Sidebar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    })
  ).isRequired,
  commonMenu: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
