import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-warning mx-1 py-0 border-0"
    >
      <FaEdit />
    </button>
  );
}
