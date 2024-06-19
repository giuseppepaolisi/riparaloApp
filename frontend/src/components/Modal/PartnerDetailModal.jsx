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

const PartnerDetailModal = ({ open, onClose, partner }) => {
  if (!partner) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli del Partner
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography sx={{ mt: 2 }}>
          <strong>Ragione Sociale:</strong> {partner.ragioneSociale}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Nome:</strong> {partner.nome}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Email:</strong> {partner.email}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Provincia:</strong> {partner.provincia}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Telefono:</strong> {partner.telefono}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Pec:</strong> {partner.pec}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Partita IVA:</strong> {partner.partitaIVA}
        </Typography>
      </Box>
    </Modal>
  );
};

PartnerDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  partner: PropTypes.shape({
    ragioneSociale: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    pec: PropTypes.string.isRequired,
    partitaIVA: PropTypes.string.isRequired,
  }),
};

export default PartnerDetailModal;
