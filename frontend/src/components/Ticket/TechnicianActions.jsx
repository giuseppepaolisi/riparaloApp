import PropTypes from "prop-types";
import { Box, Typography, Chip } from "@mui/material";

const TechnicianActions = ({ stateColors, onStatusChange, ticketStatus }) => {
  const getChipsForState = (status) => {
    switch (status) {
      case "Aperto":
        return (
          <Chip
            label="Accettato"
            onClick={() => onStatusChange("Accettato")}
            clickable
            sx={{
              backgroundColor: stateColors["Accettato"],
              color: "#000",
              mr: 2,
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
      case "Ritirato":
        return (
          <Chip
            label="In lavorazione"
            onClick={() => onStatusChange("In lavorazione")}
            clickable
            sx={{
              backgroundColor: stateColors["In lavorazione"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["In lavorazione"],
                opacity: 0.8,
              },
            }}
          />
        );
      case "In lavorazione":
        return (
          <>
            <Chip
              label="Attesa conferma preventivo"
              onClick={() => onStatusChange("Attesa conferma preventivo")}
              clickable
              sx={{
                backgroundColor: stateColors["Attesa conferma preventivo"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Attesa conferma preventivo"],
                  opacity: 0.8,
                },
              }}
            />
            <Chip
              label="Annullato"
              onClick={() => onStatusChange("Annullato")}
              clickable
              sx={{
                backgroundColor: stateColors["Annullato"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Annullato"],
                  opacity: 0.8,
                },
              }}
            />
          </>
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
      case "Annullato":
        return (
          <Chip
            label="In consegna - annullato"
            onClick={() => onStatusChange("In consegna - annullato")}
            clickable
            sx={{
              backgroundColor: stateColors["In consegna - annullato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["In consegna - annullato"],
                opacity: 0.8,
              },
            }}
          />
        );
      case "Preventivo accettato":
        return (
          <>
            <Chip
              label="Attesa ricambio"
              onClick={() => onStatusChange("Attesa ricambio")}
              clickable
              sx={{
                backgroundColor: stateColors["Attesa ricambio"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Attesa ricambio"],
                  opacity: 0.8,
                },
              }}
            />
            <Chip
              label="Completato"
              onClick={() => onStatusChange("Completato")}
              clickable
              sx={{
                backgroundColor: stateColors["Completato"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Completato"],
                  opacity: 0.8,
                },
              }}
            />
            <Chip
              label="Annullato"
              onClick={() => onStatusChange("Annullato")}
              clickable
              sx={{
                backgroundColor: stateColors["Annullato"],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors["Annullato"],
                  opacity: 0.8,
                },
              }}
            />
          </>
        );
      case "Attesa ricambio":
        return (
          <>
          <Chip
            label="Completato"
            onClick={() => onStatusChange("Completato")}
            clickable
            sx={{
              backgroundColor: stateColors["Completato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["Completato"],
                opacity: 0.8,
              },
            }}
          />
          <Chip
            label="Annullato"
            onClick={() => onStatusChange("Annullato")}
            clickable
            sx={{
              backgroundColor: stateColors["Annullato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["Annullato"],
                opacity: 0.8,
              },
            }}
          />
          </>
        );
      case "Completato":
        return (
          <Chip
            label="In consegna - completato"
            onClick={() => onStatusChange("In consegna - completato")}
            clickable
            sx={{
              backgroundColor: stateColors["In consegna - completato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["In consegna - completato"],
                opacity: 0.8,
              },
            }}
          />
        );
      case "Preventivo rifiutato":
        return (
          <Chip
            label="In consegna - rifiutato"
            onClick={() => onStatusChange("In consegna - rifiutato")}
            clickable
            sx={{
              backgroundColor: stateColors["In consegna - rifiutato"],
              color: "#000",
              mr: 2,
              "&:hover": {
                backgroundColor: stateColors["In consegna - rifiutato"],
                opacity: 0.8,
              },
            }}
          />
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

TechnicianActions.propTypes = {
  stateColors: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  ticketStatus: PropTypes.string.isRequired,
};

export default TechnicianActions;
