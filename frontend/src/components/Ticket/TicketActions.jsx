import PropTypes from "prop-types";
import { Box, Typography, Chip } from "@mui/material";

const TicketActions = ({ stateColors, onStatusChange, onDelete }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography variant="h6" sx={{ mr: 2 }}>
        AZIONI
      </Typography>
      {["Attesa conferma preventivo", "Annullato"].map((status) => (
        <Chip
          key={status}
          label={status}
          onClick={() => onStatusChange(status)}
          clickable
          sx={{
            backgroundColor: stateColors[status],
            color: "#000",
            mr: 2,
            "&:hover": {
              backgroundColor: stateColors[status],
              opacity: 0.8,
            },
          }}
        />
      ))}
      <Chip
        label="ELIMINA TICKET"
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
    </Box>
  );
};

TicketActions.propTypes = {
  stateColors: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketActions;
