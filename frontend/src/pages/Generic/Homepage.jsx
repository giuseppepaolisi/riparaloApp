import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo-riparalo.png";
import usePageTitle from "../../CustomHooks/usePageTitle";

const HomePage = () => {
  usePageTitle("Homepage");

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container
      style={{
        fontFamily: "Open Sans",
        color: "#009be3",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Benvenuto isAuthenticated={isAuthenticated} />
    </Container>
  );
};

const Benvenuto = ({ isAuthenticated }) => (
  <Box textAlign="center">
    <img src={logo} style={{ width: "80%" }} alt="Logo" />
    {!isAuthenticated && (
      <Box mt={3}>
        <Link to="/login" style={{ textDecoration: "none" }}>
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
