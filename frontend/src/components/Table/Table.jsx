import { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import GlobalFilter from "./GlobalFilter";
import RowsPerPage from "./RowsPerPage";
import TableInfo from "./TableInfo";
import TablePagination from "./TablePagination";

const Table = ({ headers, data, columns, actions }) => {
  const [filter, setFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column]
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <div className="card-body">
      <div className="row mb-4">
        <RowsPerPage
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <GlobalFilter filter={filter} setFilter={handleFilterChange} />
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
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <TableInfo
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalEntries={totalEntries}
          />
        </div>
        <div className="col-sm-12 col-md-7">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
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
