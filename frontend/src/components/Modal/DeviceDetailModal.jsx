/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const DeviceDetailModal = ({ open, onClose, device }) => {
  const columns = [
    { field: "servizio", headerName: "Servizio", flex: 1 },
    { field: "prezzo", headerName: "Prezzo (€)", flex: 1, type: "number" },
  ];

  const rows = device.servizi.map((servizio, index) => ({
    id: index,
    servizio: servizio.servizio,
    prezzo: servizio.prezzo,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Dettagli del Dispositivo
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography sx={{ mt: 2 }}>
          <strong>Marca:</strong> {capitalizeFirstLetter(device.marca)}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Modello:</strong> {capitalizeFirstLetter(device.modello)}
        </Typography>
        {/*
        <Typography sx={{ mt: 1 }}>
          <strong>ID:</strong> {device._id}
        </Typography>
        */}

        <Typography sx={{ mt: 2 }}>
          <strong>Servizi:</strong>
        </Typography>
        <div style={{ height: 300, width: "100%", marginTop: "8px" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </div>
      </Box>
    </Modal>
  );
};

DeviceDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  device: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    modello: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    servizi: PropTypes.arrayOf(
      PropTypes.shape({
        servizio: PropTypes.string.isRequired,
        prezzo: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default DeviceDetailModal;
