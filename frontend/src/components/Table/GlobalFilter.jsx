import PropTypes from "prop-types";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="col-sm-12 col-md-6">
      <div id="dataTable_filter" className="dataTables_filter">
        <label className="d-inline-flex align-items-right">
          <span>Cerca: </span>
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder=""
            aria-controls="dataTable"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

GlobalFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
