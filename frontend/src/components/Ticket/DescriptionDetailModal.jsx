/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
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

const DescriptionDetailModal = ({
  open,
  onClose,
  description,
  onAddService,
  onRemoveService,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box css={modalStyle}>
        <div css={headerStyle}>
          <Typography variant="h6" component="h2">
            Descrizione Tecnica
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <TextField
          label="Descrizione Tecnica"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField label="Nome servizio" variant="outlined" sx={{ mr: 2 }} />
          <TextField label="Prezzo" variant="outlined" sx={{ mr: 2 }} />
          <Button variant="contained" color="primary" onClick={onAddService}>
            +
          </Button>
        </Box>
        <Box>
          {description.split(";").map((service, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body1" sx={{ mr: 2 }}>
                {service}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onRemoveService(index)}
              >
                -
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

DescriptionDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onAddService: PropTypes.func.isRequired,
  onRemoveService: PropTypes.func.isRequired,
};

export default DescriptionDetailModal;
