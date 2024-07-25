import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";

const TechnicianCostDetails = ({ calculateTotal }) => {
  const { prezzoStimato, prezzoServiziExtra, prezzoTotale } = calculateTotal();

  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        DETTAGLI COSTI
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Prezzo stimato: {prezzoStimato} €
        </Typography>
        {prezzoServiziExtra !== null && (
          <Typography variant="body2">
            Prezzo servizi extra: {prezzoServiziExtra} €
          </Typography>
        )}
        <Typography variant="body2">Prezzo totale: {prezzoTotale} €</Typography>
      </Box>
    </Paper>
  );
};

TechnicianCostDetails.propTypes = {
  calculateTotal: PropTypes.func.isRequired,
};

export default TechnicianCostDetails;
