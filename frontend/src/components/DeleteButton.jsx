import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-danger mx-1 py-0 border-0"
    >
      <FaTrash />
    </button>
  );
}
