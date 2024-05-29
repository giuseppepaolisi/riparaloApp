import PropTypes from "prop-types";
import TableHeader from "./TableHeaderPartner";
import TableRow from "./TableRow";

function TicketTable({
  headers,
  tickets,
  sortConfig,
  requestSort,
  onRead,
  onDelete,
}) {
  return (
    <table className="table table-bordered text-center">
      <TableHeader
        headers={headers}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />
      <tbody>
        {tickets.map((ticket) => (
          <TableRow
            key={ticket.id}
            ticket={ticket}
            onRead={onRead}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

TicketTable.propTypes = {
  headers: PropTypes.array.isRequired,
  tickets: PropTypes.array.isRequired,
  sortConfig: PropTypes.object.isRequired,
  requestSort: PropTypes.func.isRequired,
  onRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketTable;
