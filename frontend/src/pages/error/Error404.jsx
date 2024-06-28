import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const Error404 = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page not found.
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
  );
};

export default Error404;
