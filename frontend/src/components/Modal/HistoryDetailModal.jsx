/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const modalStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: white;
  border: none;
  box-shadow: 24px 24px 48px rgba(0, 0, 0, 0.2);
  padding: 24px;
  border-radius: 8px;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryDetailModal = ({ open, onClose, history, showTechnician }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Storico Stato
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {history ? (
          <>
            {history.map((item, index) => (
              <Typography key={index} sx={{ mt: 2 }}>
                {item.stato} - <strong>Data:</strong>{" "}
                {new Date(item.data).toLocaleDateString()}
                {showTechnician && item.tecnico && (
                  <> - <strong>Tecnico:</strong> {item.tecnico}</>
                )}
              </Typography>
            ))}
          </>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

HistoryDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      stato: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      tecnico: PropTypes.string,
    })
  ),
  showTechnician: PropTypes.bool,
};

export default HistoryDetailModal;
