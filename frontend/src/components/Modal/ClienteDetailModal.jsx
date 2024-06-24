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

const ClienteDetailModal = ({ open, onClose, cliente }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli del Cliente
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {cliente && (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Nome:</strong> {cliente.nome}
            </Typography>
            <Typography variant="body1">
              <strong>Cognome:</strong> {cliente.cognome}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {cliente.email}
            </Typography>
            <Typography variant="body1">
              <strong>Telefono:</strong> {cliente.telefono}
            </Typography>
            <Typography variant="body1">
              <strong>Indirizzo:</strong> {cliente.indirizzo}
            </Typography>
            {/* Aggiungi altri campi come necessario */}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

ClienteDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cliente: PropTypes.object,
};

export default ClienteDetailModal;
