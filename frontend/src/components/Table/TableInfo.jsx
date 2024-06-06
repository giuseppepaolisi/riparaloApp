import PropTypes from "prop-types";

const TableInfo = ({ currentPage, rowsPerPage, totalEntries }) => {
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalEntries);

  return (
    <div
      className="dataTables_info"
      id="dataTable_info"
      role="status"
      aria-live="polite"
    >
      {`Da ${start} a ${end} di ${totalEntries} elementi`}
    </div>
  );
};

TableInfo.propTypes = {
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
};

export default TableInfo;
