// components/Ticket/EstimateDetails.jsx
import PropTypes from "prop-types";
import { Box, Typography, TextField, Paper } from "@mui/material";

const EstimateDetails = ({
  requestedServices,
  extraServices,
  updatedPrices,
  onRequestedServiceChange,
  calculateTotal,
}) => {
  const {
    prezzoStimato,
    prezzoAggiornato,
    prezzoServiziExtra,
    prezzoTotale,
  } = calculateTotal();

  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        DETTAGLI PREVENTIVO
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        <Typography variant="h6">Servizi richiesti</Typography>
        {requestedServices.map((service, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
            <Typography variant="body2">{service.service}</Typography>
            <TextField
              value={updatedPrices[index]}
              onChange={(event) => onRequestedServiceChange(index, event)}
              sx={{ width: "30%", ml: 1 }}
            />
          </Box>
        ))}
        {extraServices.some((service) => service.service && service.price) && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Servizi extra
            </Typography>
            {extraServices.map(
              (service, index) =>
                service.service && service.price && (
                  <Typography key={index} variant="body2">
                    {service.service} {service.price} €
                  </Typography>
                )
            )}
          </>
        )}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Prezzo stimato {prezzoStimato} €
        </Typography>
        <Typography variant="body2">
          Prezzo aggiornato {prezzoAggiornato} €
        </Typography>
        <Typography variant="body2">
          Prezzo servizi extra {prezzoServiziExtra} €
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Prezzo totale {prezzoTotale} €
        </Typography>
      </Box>
    </Paper>
  );
};

EstimateDetails.propTypes = {
  requestedServices: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  extraServices: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  updatedPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRequestedServiceChange: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

export default EstimateDetails;
