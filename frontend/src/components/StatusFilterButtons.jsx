import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";

const StatusFilterButtons = ({ statuses, onFilterChange }) => {
  return (
    <Box mb={3} display="flex" gap={2}>
      <Button
        variant="contained"
        onClick={() => onFilterChange("")}
        style={{ backgroundColor: "#007bff", color: "#fff" }} // ensure contrast and visibility
      >
        TUTTI
      </Button>
      {statuses.map((status) => (
        <Button
          key={status.label}
          variant="contained"
          style={{ backgroundColor: status.color, color: "#000", minWidth: "100px" }} // ensure visibility and spacing
          onClick={() => onFilterChange(status.filterValue)}
        >
          {status.label}
        </Button>
      ))}
    </Box>
  );
};

StatusFilterButtons.propTypes = {
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      filterValue: PropTypes.string.isRequired, // Add filterValue prop
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default StatusFilterButtons;
