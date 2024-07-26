import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ExtraServices = ({
  extraServices,
  setExtraServices,
  serviceName,
  setServiceName,
  servicePrice,
  setServicePrice,
  handleAddExtraService,
  handleRemoveExtraService
}) => (
  <Box mt={3}>
    <Typography variant="h6" gutterBottom>
      AGGIUNGI SERVIZI EXTRA
    </Typography>
    {extraServices.map((service, index) => (
      <Grid container spacing={2} key={index} alignItems="center">
        <Grid item xs={5}>
          <TextField
            label="Servizio"
            value={service.nome}
            onChange={(e) =>
              setExtraServices((prev) =>
                prev.map((s, i) =>
                  i === index ? { ...s, nome: e.target.value } : s
                )
              )
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Prezzo"
            type="number"
            value={service.prezzo}
            onChange={(e) =>
              setExtraServices((prev) =>
                prev.map((s, i) =>
                  i === index ? { ...s, prezzo: parseFloat(e.target.value) } : s
                )
              )
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="error"
            onClick={() => handleRemoveExtraService(index)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    ))}
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <TextField
          label="Servizio"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          label="Prezzo"
          type="number"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          color="primary"
          onClick={handleAddExtraService}
          size="small"
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Box>
);

ExtraServices.propTypes = {
  extraServices: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      prezzo: PropTypes.number.isRequired,
    })
  ).isRequired,
  setExtraServices: PropTypes.func.isRequired,
  serviceName: PropTypes.string.isRequired,
  setServiceName: PropTypes.func.isRequired,
  servicePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setServicePrice: PropTypes.func.isRequired,
  handleAddExtraService: PropTypes.func.isRequired,
  handleRemoveExtraService: PropTypes.func.isRequired,
};

export default ExtraServices;
