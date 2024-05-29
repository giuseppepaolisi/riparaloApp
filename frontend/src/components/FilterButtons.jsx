import PropTypes from "prop-types";
import { memo, useCallback } from "react";

const FilterButtons = memo(({ filters, onFilterChange, stateColors }) => {
  const handleFilterChange = useCallback(
    (key) => {
      onFilterChange(key);
    },
    [onFilterChange]
  );

  return (
    <div className="d-flex">
      {Object.entries(filters).map(([key, label]) => (
        <button
          key={key}
          className="btn mx-1"
          style={{
            backgroundColor: key === "ALL" ? "#4B4B4B" : stateColors[key],
            color: "white",
          }}
          onClick={() => handleFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = "FilterButtons";

FilterButtons.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  stateColors: PropTypes.object.isRequired,
};

export default FilterButtons;
