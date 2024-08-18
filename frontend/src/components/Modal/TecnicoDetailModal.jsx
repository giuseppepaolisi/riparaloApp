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

const TecnicoDetailModal = ({ open, onClose, tecnico }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli del Tecnico
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {tecnico ? (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Nome:</strong> {tecnico.nome}
            </Typography>
            <Typography variant="body1">
              <strong>Cognome:</strong> {tecnico.cognome}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {tecnico.email}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

TecnicoDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tecnico: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    cognome: PropTypes.string.isRequired,
  }),
};

export default TecnicoDetailModal;
