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

const TicketDetailModal = ({ open, onClose, ticket }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli del Ticket
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {ticket ? (
          <>
            <Typography sx={{ mt: 2 }}>
              <strong>ID:</strong> {ticket._id}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>ID Partner:</strong> {ticket.id_partner}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Nome Cliente:</strong> {ticket.nome_cliente}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Cognome Cliente:</strong> {ticket.cognome_cliente}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Marca:</strong> {ticket.marca}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Modello:</strong> {ticket.modello}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Stato:</strong> {ticket.stato}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Descrizione Problema:</strong>{" "}
              {ticket.descrizione_problema}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

TicketDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ticket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id_partner: PropTypes.string.isRequired,
    nome_cliente: PropTypes.string.isRequired,
    cognome_cliente: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    modello: PropTypes.string.isRequired,
    stato: PropTypes.string.isRequired,
    descrizione_problema: PropTypes.string.isRequired,
  }), // Non più required
};

export default TicketDetailModal;
