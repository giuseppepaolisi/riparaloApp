import PropTypes from "prop-types";

export default function DeleteModal({ message, onDelete, onCancel }) {
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
            <button className="btn btn-danger" onClick={onDelete}>
              Elimina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  message: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
