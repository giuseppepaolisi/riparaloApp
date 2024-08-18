import PropTypes from "prop-types";
import { Container, Box, Typography } from "@mui/material";

const FormContainer = ({ title, children, maxWidth = "sm" }) => {
  return (
    <Container component="main" maxWidth={maxWidth}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          padding: 3,
          borderRadius: 1,
          boxShadow: 6,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
};

export default FormContainer;
