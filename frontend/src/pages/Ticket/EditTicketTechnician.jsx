import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Chip,
  Button,
  TextField,
  Paper
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import TicketActions from "../../components/Ticket/TicketActions";
import TicketDetails from "../../components/Ticket/TicketDetails";
import ExtraServices from "../../components/Ticket/ExtraServices";
import EstimateDetails from "../../components/Ticket/EstimateDetails";
import Modals from "../../components/Modal/Modals";

const EditTicketTechnician = () => {
  usePageTitle("Modifica Ticket");
  useBodyBackgroundColor("#fff");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);

  const ticketStatus = "In lavorazione";
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

  const handleInfoClick = (infoType) => {
    console.log(`Clicked ${infoType}`);
  };

  const handleDelete = () => {
    console.log("Ticket eliminato");
    setDeleteModalOpen(false);
  };

  const handleStatusChange = (newStatus) => {
    setCurrentAction(() => () => console.log(`Changed status to ${newStatus}`));
    setModalMessage(
      `Sei sicuro di voler cambiare lo stato del ticket in "${newStatus}"?`
    );
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleConfirm = () => {
    if (currentAction) currentAction();
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Modals
        modalOpen={modalOpen}
        deleteModalOpen={deleteModalOpen}
        modalMessage={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <Box sx={{ flex: 1 }}>
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

        <TicketActions
          ticketStatus={ticketStatus}
          stateColors={stateColors}
          onStatusChange={handleStatusChange}
          onDelete={() => setDeleteModalOpen(true)}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TicketDetails
              ticketInfo={[
                { label: "Samsung Galaxy s10", type: "INFORMAZIONI DISPOSITIVO" },
                { label: "INFORMAZIONI PARTNER", type: "INFORMAZIONI PARTNER" },
                { label: "STORICO TICKET", type: "STORICO TICKET" },
              ]}
              onInfoClick={handleInfoClick}
            />
            <ExtraServices
              extraServices={extraServices}
              onAddService={handleAddService}
              onRemoveService={handleRemoveService}
              onServiceChange={handleServiceChange}
              isServiceFilled={isServiceFilled}
            />
            <Paper sx={{ padding: 2, boxShadow: 3, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                AGGIUNGI DESCRIZIONE TECNICA
              </Typography>
              <Box sx={{ padding: 2 }}>
                <TextField label="Inserisci la descrizione prima di cambiare lo stato" multiline rows={4} fullWidth />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <EstimateDetails
              requestedServices={requestedServices}
              extraServices={extraServices}
              updatedPrices={updatedPrices}
              onRequestedServiceChange={handleRequestedServiceChange}
              calculateTotal={calculateTotal}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", mt: "auto", mb: 3 }}
      >
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

export default EditTicketTechnician;
