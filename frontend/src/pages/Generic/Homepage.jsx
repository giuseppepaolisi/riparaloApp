import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo-riparalo.png";
import React from "react";
import usePageTitle from "../../CustomHooks/usePageTitle";

const HomePage = () => {
  usePageTitle("Homepage");

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container style={{ fontFamily: "Open Sans", color: "#009be3" }}>
      <Benvenuto isAuthenticated={isAuthenticated} />
    </Container>
  );
};

const Benvenuto = ({ isAuthenticated }) => (
  <React.Fragment>
    <Box textAlign="center" mt={5}>
      <Box display="flex" justifyContent="center" mt={5}>
        <img src={logo} style={{ width: "40%" }} alt="Logo" />
      </Box>
      {!isAuthenticated && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="large" color="primary">
              Login
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  </React.Fragment>
);

Benvenuto.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;
