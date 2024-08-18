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

const CustomerDetailModal = ({ open, onClose, customer }) => {
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
        {customer ? (
          <>
            <Typography sx={{ mt: 2 }}>
              <strong>Nome:</strong> {customer.nome}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Cognome:</strong> {customer.cognome}
            </Typography>
            {customer.email && (
              <Typography sx={{ mt: 1 }}>
                <strong>Email:</strong> {customer.email}
              </Typography>
            )}
            <Typography sx={{ mt: 1 }}>
              <strong>Telefono:</strong> {customer.telefono}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

CustomerDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    cognome: PropTypes.string.isRequired,
    email: PropTypes.string, // Non required
    telefono: PropTypes.string.isRequired,
  }),
};

export default CustomerDetailModal;
