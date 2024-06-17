import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import stateColors from "../assets/json/state.json";

const ModularTable = ({
  headers,
  data,
  onViewEdit,
  onDelete,
  requestSort,
  sortConfig,
}) => (
  <table className="table table-striped table-bordered">
    <TableHeader
      headers={headers}
      sortConfig={sortConfig}
      requestSort={requestSort}
    />
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
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
              {header.key === "actions" ? (
                <>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onViewEdit(item._id)}
                  >
                    Vedi/Modifica
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(item._id)}
                  >
                    Elimina
                  </button>
                </>
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

ModularTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onViewEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["asc", "desc"]),
  }).isRequired,
};

export default ModularTable;
