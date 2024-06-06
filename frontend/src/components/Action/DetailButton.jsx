import { FaInfoCircle } from "react-icons/fa";
import PropTypes from "prop-types";

DetailButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function DetailButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-primary mx-1 py-0 border-0"
    >
      <FaInfoCircle />
    </button>
  );
}
