import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

function TableHeader({ headers, sortConfig, requestSort }) {
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return faSortUp;
      } else {
        return faSortDown;
      }
    } else {
      return faSort;
    }
  };

  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} onClick={() => requestSort(header.key)}>
            {header.label}
            &nbsp; {/* Spazio */}
            {header.key !== "descrizione" && header.key !== "elimina" && (
              <FontAwesomeIcon icon={getSortIcon(header.key)} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["asc", "desc"]),
  }).isRequired,
  requestSort: PropTypes.func.isRequired,
};

export default TableHeader;
