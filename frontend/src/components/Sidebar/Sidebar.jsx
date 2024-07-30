import { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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

  const renderMenuItems = (items) => (
    <ul className="nav nav-pills flex-column mb-auto">
      {items.map((item) => (
        <SidebarLink key={item.path} {...item} />
      ))}
    </ul>
  );

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
          className="text-white"
          style={{ width: "250px", backgroundColor: "#1D2942" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link
                to="/"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
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
            <div style={{ flexGrow: 1 }}>{renderMenuItems(menuItems)}</div>
            <div style={{ marginBottom: "20px" }}>
              {renderMenuItems(commonMenu)}
              <ul className="nav nav-pills flex-column mb-auto">
                <SidebarLink path="/account" label="Account" icon={faUser} />
                <SidebarLink
                  path="/logout"
                  label="Logout"
                  icon={faSignOutAlt}
                />
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <div
          className="text-white d-flex flex-column"
          style={{
            width: "200px",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#1D2942",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mb-3 p-2"
            style={{ height: "100px" }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "60%" }}
              />
            </Link>
          </div>
          <div className="d-flex flex-column justify-content-between flex-grow-1">
            <div>{renderMenuItems(menuItems)}</div>
            <div className="mt-auto">
              {renderMenuItems(commonMenu)}
              <ul className="nav nav-pills flex-column">
                <SidebarLink path="/account" label="Account" icon={faUser} />
                <SidebarLink
                  path="/logout"
                  label="Logout"
                  icon={faSignOutAlt}
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
