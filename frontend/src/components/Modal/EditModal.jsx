import PropTypes from "prop-types";

export default function EditModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Annulla
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              Conferma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
