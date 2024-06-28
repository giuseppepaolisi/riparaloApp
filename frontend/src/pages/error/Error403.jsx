import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import usePageTitle from "../../CustomHooks/usePageTItle";
import React from "react";

const Error403 = () => {
  usePageTitle("403 Accesso Negato");
  return (
    <React.Fragment>
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" color="warning.main">
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Access Denied.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Go Home
      </Button>
    </Container>
    </React.Fragment>
  );
};

export default Error403;
