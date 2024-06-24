import PropTypes from "prop-types";
import { Button } from "@mui/material";

const StatusFilterButtons = ({ statuses, onFilterChange }) => {
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#007bff",
          color: "#000",
          border: "1px solid #000",
          margin: "0 5px",
        }}
        onClick={() => onFilterChange("")}
      >
        TUTTI
      </Button>
      {statuses.map((status) => (
        <Button
          key={status.filterValue}
          style={{
            backgroundColor: status.color,
            color: "#000",
            border: "1px solid #000",
            margin: "0 5px",
          }}
          onClick={() => onFilterChange(status.filterValue)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};

StatusFilterButtons.propTypes = {
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      filterValue: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default StatusFilterButtons;
