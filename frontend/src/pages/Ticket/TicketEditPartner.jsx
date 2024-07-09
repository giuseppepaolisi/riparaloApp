import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import DetailButton from "../../components/Action/DetailButton"; // Assicurati che il percorso sia corretto

const TicketEditPartner = () => {
  usePageTitle("Modifica Ticket Partner");
  useBodyBackgroundColor("#fff");

  const ticketStatus = "In lavorazione"; // Questo dovrebbe essere dinamico, impostato in base ai dati del ticket
  const statusColor = stateColors[ticketStatus] || "#FFFFFF";

  const [extraServices, setExtraServices] = useState([
    { service: "", price: "" },
  ]);
  const [requestedServices] = useState([
    { service: "Riparazione schermo", price: 50 },
    { service: "Connettore batteria", price: 60 },
    { service: "Connettore audio", price: 40 },
  ]);
  const [updatedPrices, setUpdatedPrices] = useState(
    requestedServices.map((service) => service.price)
  );

  const handleAddService = () => {
    setExtraServices([...extraServices, { service: "", price: "" }]);
  };

  const handleRemoveService = (index) => {
    if (extraServices.length > 1) {
      const newServices = extraServices.filter((_, i) => i !== index);
      setExtraServices(newServices);
    }
  };

  const handleServiceChange = (index, event) => {
    const newServices = [...extraServices];
    newServices[index][event.target.name] = event.target.value;
    setExtraServices(newServices);
  };

  const handleRequestedServiceChange = (index, event) => {
    const newPrices = [...updatedPrices];
    newPrices[index] = parseFloat(event.target.value) || 0;
    setUpdatedPrices(newPrices);
  };

  const isServiceFilled = (service) =>
    service.service !== "" && service.price !== "";

  const calculateTotal = () => {
    const priceServiziExtra = extraServices.reduce(
      (acc, service) => acc + (parseFloat(service.price) || 0),
      0
    );
    const prezzoAggiornato = updatedPrices.reduce(
      (acc, price) => acc + price,
      0
    );
    const prezzoStimato = requestedServices.reduce(
      (acc, service) => acc + service.price,
      0
    );

    return {
      prezzoStimato,
      prezzoAggiornato,
      prezzoServiziExtra: priceServiziExtra,
      prezzoTotale: prezzoAggiornato + priceServiziExtra,
    };
  };

  const {
    prezzoStimato,
    prezzoAggiornato,
    prezzoServiziExtra,
    prezzoTotale,
  } = calculateTotal();

  const handleInfoClick = (infoType) => {
    // Gestisci il click del pulsante di dettaglio
    console.log(`Clicked ${infoType}`);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          TICKET ID: 662a6d00eedee8b18bb75f53
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 1 }}>
              STATO TICKET
            </Typography>
            <Chip
              label={ticketStatus}
              sx={{
                backgroundColor: statusColor,
                color: "#000",
                border: "1px solid #000",
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" component="span">
              STAMPA TICKET
            </Typography>
            <IconButton color="primary">
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton color="primary">
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: "100%", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                DATI GENERALI
              </Typography>
              <Box sx={{ border: "1px solid #000", padding: 2 }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  INFORMAZIONI DISPOSITIVO
                  <DetailButton
                    onClick={() => handleInfoClick("INFORMAZIONI DISPOSITIVO")}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  INFORMAZIONI PARTNER
                  <DetailButton
                    onClick={() => handleInfoClick("INFORMAZIONI PARTNER")}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  STORICO TICKET
                  <DetailButton
                    onClick={() => handleInfoClick("STORICO TICKET")}
                  />
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  AGGIUNGI SERVIZI EXTRA
                </Typography>
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
                      onChange={(event) => handleServiceChange(index, event)}
                      sx={{ width: "45%" }}
                    >
                      <MenuItem value="Tasto volume up">
                        Tasto volume up
                      </MenuItem>
                      <MenuItem value="Altoparlante">Altoparlante</MenuItem>
                    </TextField>
                    <TextField
                      label="Prezzo"
                      name="price"
                      value={service.price}
                      onChange={(event) => handleServiceChange(index, event)}
                      sx={{ width: "20%", ml: 1 }}
                    />
                    {isServiceFilled(service) && (
                      <>
                        <IconButton
                          color="primary"
                          onClick={handleAddService}
                          sx={{ ml: 1 }}
                        >
                          <AddIcon />
                        </IconButton>
                        {extraServices.length > 1 && (
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveService(index)}
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
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  AGGIUNGI DESCRIZIONE TECNICA
                </Typography>
                <TextField label="Descrizione" multiline rows={4} fullWidth />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: "100%", boxShadow: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">DETTAGLI PREVENTIVO</Typography>
              </Box>
              <Box sx={{ mt: 1, mb: 1, border: "1px solid", padding: 1 }}>
                <Typography variant="h6">Servizi richiesti</Typography>
                {requestedServices.map((service, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", flexDirection: "column", mb: 1 }}
                  >
                    <Typography variant="body2">{service.service}</Typography>
                    <TextField
                      value={updatedPrices[index]}
                      onChange={(event) =>
                        handleRequestedServiceChange(index, event)
                      }
                      sx={{ width: "30%", ml: 1 }}
                    />
                  </Box>
                ))}
                {extraServices.some(isServiceFilled) && (
                  <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Servizi extra
                    </Typography>
                    {extraServices.map(
                      (service, index) =>
                        isServiceFilled(service) && (
                          <Typography key={index} variant="body2">
                            {service.service} {service.price} €
                          </Typography>
                        )
                    )}
                  </>
                )}
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Prezzo stimato {prezzoStimato} €
                </Typography>
                <Typography variant="body2">
                  Prezzo aggiornato {prezzoAggiornato} €
                </Typography>
                <Typography variant="body2">
                  Prezzo servizi extra {prezzoServiziExtra} €
                </Typography>
                <Typography variant="h6">
                  Prezzo totale {prezzoTotale} €
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", mt: "auto", mb: 3 }}
      >
        <Button variant="contained" color="success" sx={{ marginRight: 2 }}>
          AGGIORNA IN ATTESA CONFERMA PREVENTIVO
        </Button>
        <Button variant="contained" color="error" sx={{ marginRight: 2 }}>
          AGGIORNA IN ANNULLATO
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#1976d2", borderColor: "#1976d2" }}
        >
          INDIETRO
        </Button>
      </Box>
    </Box>
  );
};

export default TicketEditPartner;
