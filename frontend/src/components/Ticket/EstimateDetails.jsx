import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";

const EstimateDetails = ({
  ticketStatus,
  calculateTotal,
}) => {
  const {
    prezzoStimato,
    acconto,
    prezzoTotale,
    prezzoDaSaldare,
  } = calculateTotal();

  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        DETTAGLI PREVENTIVO
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Prezzo stimato: {prezzoStimato} €
        </Typography>
        {(ticketStatus === "Attesa conferma preventivo" ||
          ["Preventivo accettato", "Preventivo rifiutato", "Completato"].includes(
            ticketStatus
          )) && (
          <>
            <Typography variant="body2">
              Acconto: {acconto} €
            </Typography>
            <Typography variant="body2">
              Prezzo finale: {prezzoTotale} €
            </Typography>
            <Typography variant="body2">
              Prezzo da saldare: {prezzoDaSaldare} €
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};

EstimateDetails.propTypes = {
  ticketStatus: PropTypes.string.isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

export default EstimateDetails;
