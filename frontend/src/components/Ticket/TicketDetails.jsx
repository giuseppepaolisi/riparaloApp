// components/Ticket/TicketDetails.jsx
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
import DetailButton from "../Action/DetailButton"; // Assicurati che il percorso sia corretto

const TicketDetails = ({ ticketInfo, onInfoClick }) => {
  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        DATI GENERALI
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        {ticketInfo.map((info) => (
          <Typography
            key={info.label}
            variant="body1"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            {info.label}
            <DetailButton onClick={() => onInfoClick(info.type)} />
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

TicketDetails.propTypes = {
  ticketInfo: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  onInfoClick: PropTypes.func.isRequired,
};

export default TicketDetails;
