import PropTypes from "prop-types";

const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div
      className="dataTables_paginate paging_simple_numbers"
      id="dataTable_paginate"
    >
      <ul className="pagination">
        <li
          className={`paginate_button page-item previous ${
            currentPage === 1 ? "disabled" : ""
          }`}
          id="dataTable_previous"
        >
          <a
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            aria-controls="dataTable"
            data-dt-idx="0"
            tabIndex="0"
            className="page-link"
          >
            Indietro
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`paginate_button page-item ${
              currentPage === page ? "active" : ""
            }`}
          >
            <a
              href="#"
              onClick={() => onPageChange(page)}
              aria-controls="dataTable"
              data-dt-idx={page}
              tabIndex="0"
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`paginate_button page-item next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          id="dataTable_next"
        >
          <a
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            aria-controls="dataTable"
            data-dt-idx="7"
            tabIndex="0"
            className="page-link"
          >
            Avanti
          </a>
        </li>
      </ul>
    </div>
  );
};

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TablePagination;
