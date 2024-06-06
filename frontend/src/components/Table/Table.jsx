import { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import GlobalFilter from "./GlobalFilter";
import RowsPerPage from "./RowsPerPage";

const Table = ({ headers, data, columns, actions }) => {
  const [filter, setFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column]
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  );

  const displayedData = filteredData.slice(0, rowsPerPage);

  return (
    <div className="card-body">
      <div className="row mb-4">
        <RowsPerPage
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <GlobalFilter filter={filter} setFilter={setFilter} />
      </div>
      <table
        className="table table-bordered"
        id="dataTable"
        width="100%"
        cellSpacing="0"
      >
        <TableHeader headers={[...headers, "Actions"]} />
        <TableBody data={displayedData} columns={columns} actions={actions} />
        <TableFooter headers={[...headers, "Actions"]} />
      </table>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default Table;
