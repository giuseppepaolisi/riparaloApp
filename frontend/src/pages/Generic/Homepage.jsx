import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo-riparalo.png";
import { useEffect } from "react";
import Title from "../../components/Title";

const HomePage = () => {
  useEffect(() => {}, []);

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div style={{ fontFamily: "Open Sans", color: "#009be3" }}>
      <Title title="Home" />
      <Benvenuto isAuthenticated={isAuthenticated} />
    </div>
  );
};

const Benvenuto = ({ isAuthenticated }) => (
  <div className="text-center">
    <div className="d-flex justify-content-center mt-5">
      <img
        src={logo}
        className="img-fluid"
        style={{ width: "40%" }}
        alt="Logo"
      />
    </div>
    {!isAuthenticated && (
      <div className="d-flex justify-content-center mt-3">
        <Link to="/login">
          <Button variant="outline-primary" size="lg">
            Login
          </Button>
        </Link>
      </div>
    )}
  </div>
);

Benvenuto.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;
