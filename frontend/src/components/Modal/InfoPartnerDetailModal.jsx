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

const InfoPartnerDetailModal = ({ open, onClose, partner }) => {
  console.log("Rendering InfoPartnerDetailModal with partner:", partner);

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
              <strong>Telefono:</strong> {partner.telefono || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Ragione Sociale:</strong> {partner.ragione_sociale || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Partita IVA:</strong> {partner.partita_iva || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Codice Univoco:</strong> {partner.codiceUnivoco || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>PEC:</strong> {partner.pec || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>CAP:</strong> {partner.cap || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Via:</strong> {partner.via || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Provincia:</strong> {partner.provincia || "N/A"}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

InfoPartnerDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  partner: PropTypes.shape({
    telefono: PropTypes.string,
    ragione_sociale: PropTypes.string,
    partita_iva: PropTypes.string,
    codiceUnivoco: PropTypes.string,
    pec: PropTypes.string,
    cap: PropTypes.string,
    via: PropTypes.string,
    provincia: PropTypes.string,
  }), // Non più required
};

export default InfoPartnerDetailModal;
