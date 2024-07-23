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

const InfoDeviceDetailModal = ({ open, onClose, device }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli Dispositivo
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {device ? (
          <>
            <Typography sx={{ mt: 2 }}>
              <strong>Descrizione Problema:</strong> {device.descrizione_problema}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>IMEI:</strong> {device.imei}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>PIN:</strong> {device.pin}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Seriale:</strong> {device.seriale}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2 }}>Caricamento...</Typography>
        )}
      </Box>
    </Modal>
  );
};

InfoDeviceDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  device: PropTypes.shape({
    descrizione_problema: PropTypes.string.isRequired,
    imei: PropTypes.string.isRequired,
    pin: PropTypes.string.isRequired,
    seriale: PropTypes.string.isRequired,
  }),
};

export default InfoDeviceDetailModal;