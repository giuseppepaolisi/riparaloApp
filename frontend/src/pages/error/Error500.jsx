import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import usePageTitle from "../../CustomHooks/usePageTitle";

const Error500 = () => {
  usePageTitle("500 Errore Interno");
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
        500
      </Typography>
      <Typography variant="h5" gutterBottom>
        Internal Server Error.
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

export default Error500;
