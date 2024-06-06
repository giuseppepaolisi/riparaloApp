import PropTypes from "prop-types";

const TableFooter = ({ headers }) => {
  return (
    <tfoot>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </tfoot>
  );
};

TableFooter.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableFooter;
