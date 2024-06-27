import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo-riparalo.png";
import { useEffect } from "react";
import Title from "../../components/Title";

const HomePage = () => {
  useEffect(() => {}, []);

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container style={{ fontFamily: "Open Sans", color: "#009be3" }}>
      <Title title="Home" />
      <Benvenuto isAuthenticated={isAuthenticated} />
    </Container>
  );
};

const Benvenuto = ({ isAuthenticated }) => (
  <Box textAlign="center" mt={5}>
    <Box display="flex" justifyContent="center" mt={5}>
      <img
        src={logo}
        style={{ width: "40%" }}
        alt="Logo"
      />
    </Box>
    {!isAuthenticated && (
      <Box display="flex" justifyContent="center" mt={3}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="large" color="primary">
            Login
          </Button>
        </Link>
      </Box>
    )}
  </Box>
);

Benvenuto.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;
