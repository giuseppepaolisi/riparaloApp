import PropTypes from "prop-types";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ExtraServices = ({
  extraServices,
  onAddService,
  onRemoveService,
  onServiceChange,
  isServiceFilled,
}) => {
  return (
    <Paper sx={{ padding: 2, boxShadow: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        AGGIUNGI SERVIZI EXTRA
      </Typography>
      <Box sx={{ border: "1px solid #000", padding: 2 }}>
        {extraServices.map((service, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <TextField
              select
              label="Servizio"
              name="service"
              value={service.service}
              onChange={(event) => onServiceChange(index, event)}
              sx={{ width: "45%" }}
            >
              <MenuItem value="Tasto volume up">Tasto volume up</MenuItem>
              <MenuItem value="Altoparlante">Altoparlante</MenuItem>
            </TextField>
            <TextField
              label="Prezzo"
              name="price"
              value={service.price}
              onChange={(event) => onServiceChange(index, event)}
              sx={{ width: "20%", ml: 1 }}
            />
            {isServiceFilled(service) && (
              <>
                <IconButton
                  color="primary"
                  onClick={onAddService}
                  sx={{ ml: 1 }}
                >
                  <AddIcon />
                </IconButton>
                {extraServices.length > 1 && (
                  <IconButton
                    color="secondary"
                    onClick={() => onRemoveService(index)}
                    sx={{ ml: 1 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

ExtraServices.propTypes = {
  extraServices: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.string,
      price: PropTypes.string,
    })
  ).isRequired,
  onAddService: PropTypes.func.isRequired,
  onRemoveService: PropTypes.func.isRequired,
  onServiceChange: PropTypes.func.isRequired,
  isServiceFilled: PropTypes.func.isRequired,
};

export default ExtraServices;
