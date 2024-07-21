// components/Ticket/TicketActions.jsx
import PropTypes from "prop-types";
import { Box, Typography, Chip } from "@mui/material";

const TicketActions = ({ stateColors, onStatusChange, onDelete, ticketStatus }) => {
  const getChipsForState = (status) => {
    switch (status) {
      case "Aperto":
        return (
          <Chip
            label="Elimina Ticket"
            onClick={onDelete}
            clickable
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              mr: 2,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          />
        );
      case "Accettato":
        return (
          <Chip
            label="Ritirato"
            onClick={() => onStatusChange("Ritirato")}
            clickable
            sx={{
              backgroundColor: stateColors["Ritirato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["Ritirato"],
                opacity: 0.8,
              },
            }}
          />
        );
      case "Attesa conferma preventivo":
        return (
          <>
            <Chip
              label="Preventivo accettato"
              onClick={() => onStatusChange("Preventivo accettato")}
              clickable
              sx={{
                backgroundColor: stateColors["Preventivo accettato"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Preventivo accettato"],
                  opacity: 0.8,
                },
              }}
            />
            <Chip
              label="Preventivo rifiutato"
              onClick={() => onStatusChange("Preventivo rifiutato")}
              clickable
              sx={{
                backgroundColor: stateColors["Preventivo rifiutato"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Preventivo rifiutato"],
                  opacity: 0.8,
                },
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography variant="h6" sx={{ mr: 2 }}>
        AZIONI
      </Typography>
      {getChipsForState(ticketStatus)}
    </Box>
  );
};

TicketActions.propTypes = {
  stateColors: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  ticketStatus: PropTypes.string.isRequired,
};

export default TicketActions;
