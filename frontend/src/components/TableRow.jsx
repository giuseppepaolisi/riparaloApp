import PropTypes from "prop-types";
import stateColors from "../assets/json/state.json";

function TableRow({ ticket, onRead, onDelete }) {
  const handleRead = () => {
    onRead(ticket);
  };

  const handleDelete = () => {
    onDelete(ticket.id);
  };

  return (
    <tr>
      <td>{ticket.id}</td>
      <td>{ticket.dataApertura}</td>
      <td>{ticket.nome}</td>
      <td>{ticket.cognome}</td>
      <td>{ticket.marca}</td>
      <td>{ticket.modello}</td>
      <td
        className="text-center"
        style={{ backgroundColor: stateColors[ticket.stato] }}
      >
        {ticket.stato}
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleRead}>
          Leggi
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Elimina
        </button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dataApertura: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    cognome: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    modello: PropTypes.string.isRequired,
    stato: PropTypes.string.isRequired,
  }).isRequired,
  onRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableRow;
