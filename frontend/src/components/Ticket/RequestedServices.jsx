// frontend\src\components\Ticket\RequestedServices.jsx
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";

const RequestedServices = ({ services }) => {
  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        SERVIZI RICHIESTI
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        {services.map((service, index) => (
          <Typography variant="body2" sx={{ mt: 2 }} key={index}>
            {service.servizio} - {service.prezzo} €
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

RequestedServices.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      servizio: PropTypes.string.isRequired,
      prezzo: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RequestedServices;
