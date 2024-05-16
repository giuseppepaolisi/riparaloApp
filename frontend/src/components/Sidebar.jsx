/*import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
*/

/*
import { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import logo from "../img/cropped-LOGO1-1.png"; // Assicurati che il percorso sia corretto
function NavigationBar() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="dark"
        onClick={handleShow}
        className="mb-2"
        style={{ borderRadius: "50%" }}
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
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import logo from "../img/cropped-LOGO1-1.png"; // Assicurati che il percorso sia corretto

function NavigationBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="dark"
        onClick={handleShow}
        className="mb-2"
        style={{ borderRadius: "50%" }}
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
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
