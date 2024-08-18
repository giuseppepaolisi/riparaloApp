import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
import DetailButton from "../Action/DetailButton";

const TicketDetails = ({ ticketInfo, onInfoClick }) => {
  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        DATI GENERALI
      </Typography>
      <Box sx={{ border: "1px solid", padding: 1 }}>
        {ticketInfo.map(
          (info) =>
            (info.condition === undefined || info.condition) && (
              <Typography
                key={info.label}
                variant="body1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                {info.label}
                <DetailButton onClick={() => onInfoClick(info.type)} />
              </Typography>
            )
        )}
      </Box>
    </Paper>
  );
};

TicketDetails.propTypes = {
  ticketInfo: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      condition: PropTypes.bool,
    })
  ).isRequired,
  onInfoClick: PropTypes.func.isRequired,
};

export default TicketDetails;
