import PropTypes from "prop-types";
import EditModal from "./EditModal"; // Assicurati che il percorso sia corretto
import DeleteModal from "./DeleteModal"; // Assicurati che il percorso sia corretto

const Modals = ({
  modalOpen,
  deleteModalOpen,
  modalMessage,
  onConfirm,
  onCancel,
  onDelete,
}) => {
  return (
    <>
      {modalOpen && (
        <EditModal
          message={modalMessage}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          message="Sei sicuro di voler eliminare il ticket?"
          onDelete={onDelete}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

Modals.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  deleteModalOpen: PropTypes.bool.isRequired,
  modalMessage: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Modals;
