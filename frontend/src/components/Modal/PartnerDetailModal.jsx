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
        {partner ? (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Nome:</strong> {partner.nome}
            </Typography>
            <Typography variant="body1">
              <strong>Cognome:</strong> {partner.cognome}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {partner.email}
            </Typography>
            <Typography variant="body1">
              <strong>Telefono:</strong> {partner.telefono}
            </Typography>
            <Typography variant="body1">
              <strong>Ragione Sociale:</strong> {partner.ragioneSociale}
            </Typography>
            <Typography variant="body1">
              <strong>Partita IVA:</strong> {partner.partitaIVA}
            </Typography>
            <Typography variant="body1">
              <strong>Codice Univoco:</strong> {partner.codiceUnivoco}
            </Typography>
            <Typography variant="body1">
              <strong>PEC:</strong> {partner.pec}
            </Typography>
            <Typography variant="body1">
              <strong>CAP:</strong> {partner.cap}
            </Typography>
            <Typography variant="body1">
              <strong>Via:</strong> {partner.via}
            </Typography>
            <Typography variant="body1">
              <strong>Provincia:</strong> {partner.provincia}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

PartnerDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  partner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    cognome: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    ragioneSociale: PropTypes.string.isRequired,
    partitaIVA: PropTypes.string.isRequired,
    codiceUnivoco: PropTypes.string.isRequired,
    pec: PropTypes.string.isRequired,
    cap: PropTypes.string.isRequired,
    via: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
  }), // Non più required
};

export default PartnerDetailModal;
