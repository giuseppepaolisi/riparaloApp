import PropTypes from "prop-types";

const TableBody = ({ data, columns, actions }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>{item[column]}</td>
          ))}
          <td>
            {actions.map((ActionComponent, actionIndex) => (
              <ActionComponent key={actionIndex} item={item} />
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default TableBody;
