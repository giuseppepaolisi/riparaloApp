import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../assets/img/logo-riparalo.png";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div style={{ fontFamily: "Open Sans", color: "#009be3" }}>
      <Header isAuthenticated={isAuthenticated} />
      <Benvenuto />
    </div>
  );
};

const Header = ({ isAuthenticated }) => (
  <div className="d-flex justify-content-end p-3">
    {!isAuthenticated && (
      <Link to="/login">
        <Button variant="outline-primary" size="lg">
          Login
        </Button>
      </Link>
    )}
  </div>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const Benvenuto = () => (
  <div className="text-center">
    <h1>Benvenuto!</h1>
    <div className="d-flex justify-content-center">
      <img
        src={logo}
        className="img-fluid"
        style={{ width: "40%" }}
        alt="Logo"
      />
    </div>
  </div>
);

export default HomePage;
