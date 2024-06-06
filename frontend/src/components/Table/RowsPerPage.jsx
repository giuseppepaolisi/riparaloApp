import PropTypes from "prop-types";

const RowsPerPage = ({ rowsPerPage, setRowsPerPage }) => {
  const handleChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  return (
    <div className="col-sm-12 col-md-6">
      <div className="dataTables_length" id="dataTable_length">
        <label className="d-inline-flex ">
          Show
          <select
            name="dataTable_length"
            aria-controls="dataTable"
            className="custom-select custom-select-sm form-control form-control-sm"
            value={rowsPerPage}
            onChange={handleChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </label>
      </div>
    </div>
  );
};

RowsPerPage.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

export default RowsPerPage;
