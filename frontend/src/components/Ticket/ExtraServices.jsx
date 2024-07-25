import PropTypes from "prop-types";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ExtraServices = ({
  extraServices,
  onAddService,
  onRemoveService,
  onServiceChange,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        AGGIUNGI SERVIZI EXTRA
      </Typography>
      {extraServices.map((service, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TextField
            label="Nome Servizio"
            value={service.nome}
            onChange={(e) => onServiceChange(index, "nome", e.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            label="Prezzo"
            value={service.prezzo}
            onChange={(e) => onServiceChange(index, "prezzo", e.target.value)}
            sx={{ mr: 1 }}
          />
          <IconButton
            color="secondary"
            onClick={() => onRemoveService(index)}
            size="small"
          >
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton color="primary" onClick={onAddService} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

ExtraServices.propTypes = {
  extraServices: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      prezzo: PropTypes.string,
    })
  ).isRequired,
  onAddService: PropTypes.func.isRequired,
  onRemoveService: PropTypes.func.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};

export default ExtraServices;
