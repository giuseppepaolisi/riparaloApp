import PropTypes from "prop-types";
import stateColors from "../assets/json/state.json";

const ModularTable = ({
  headers,
  data,
  onRead,
  onDelete,
  requestSort,
  sortConfig,
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return null;
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => requestSort(header.key)}
              className="text-center"
            >
              {header.label} {getSortIcon(header.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td
                key={header.key}
                className="text-center align-middle"
                style={
                  header.key === "stato"
                    ? { backgroundColor: stateColors[item[header.key]] }
                    : {}
                }
              >
                {header.key === "elimina" ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(item.id)}
                  >
                    Elimina
                  </button>
                ) : header.key === "leggi" ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onRead(item)}
                  >
                    Leggi
                  </button>
                ) : (
                  item[header.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ModularTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["asc", "desc"]),
  }).isRequired,
};

export default ModularTable;
