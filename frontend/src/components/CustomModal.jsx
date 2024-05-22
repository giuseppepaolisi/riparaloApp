import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

function CustomModal({
  show,
  onHide,
  title,
  body,
  onConfirm,
  confirmText,
  cancelText,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {cancelText && (
          <Button variant="secondary" onClick={onHide}>
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default CustomModal;
