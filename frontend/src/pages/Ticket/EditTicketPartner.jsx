// EditTicketPartner.jsx
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Chip,
  Button,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import TicketActions from "../../components/Ticket/TicketActions";
import TicketDetails from "../../components/Ticket/TicketDetails";
import EstimateDetails from "../../components/Ticket/EstimateDetails";
import Modals from "../../components/Modal/Modals";

const EditTicketPartner = () => {
  usePageTitle("Dettagli Ticket");
  useBodyBackgroundColor("#fff");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);

  const ticketStatus = "Aperto";
  const statusColor = stateColors[ticketStatus] || "#FFFFFF";

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

  const handleInfoClick = (infoType) => {
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
      <Modals
        modalOpen={modalOpen}
        deleteModalOpen={deleteModalOpen}
        modalMessage={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
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
              STATO
            </Typography>
            <Chip
              label={ticketStatus}
              sx={{
                backgroundColor: statusColor,
                color: "#000",
                border: "1px solid #000",
                mr: 2,
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" component="span" sx={{ mr: 1 }}>
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
                { label: "Samsung Galaxy s10", type: "DISPOSITIVO" },
                { label: "INFORMAZIONI CLIENTE", type: "CLIENTE" },
                { label: "STORICO TICKET", type: "STORICO" },
              ]}
              onInfoClick={handleInfoClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <EstimateDetails
              requestedServices={[
                { service: "Riparazione schermo", price: 40 },
                { service: "Connettore batteria", price: 50 },
                { service: "Connettore audio", price: 30 },
              ]}
              extraServices={[]}
              updatedPrices={[40, 50, 30]}
              onRequestedServiceChange={() => {}}
              calculateTotal={() => ({
                prezzoStimato: 120,
                prezzoAggiornato: 120,
                prezzoServiziExtra: 0,
                prezzoTotale: 120,
              })}
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

export default EditTicketPartner;
