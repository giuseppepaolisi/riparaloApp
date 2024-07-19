import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import DetailButton from "../../components/Action/DetailButton";
import EditModal from "../../components/Modal/EditModal";
import DeleteModal from "../../components/Modal/DeleteModal";

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
      {modalOpen && (
        <EditModal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          message="Sei sicuro di voler eliminare il ticket?"
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
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

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            AZIONI
          </Typography>
          {["Attesa conferma preventivo", "Annullato"].map((status) => (
            <Chip
              key={status}
              label={status}
              onClick={() => handleStatusChange(status)}
              clickable
              sx={{
                backgroundColor: stateColors[status],
                color: "#000",
                mr: 2,
                "&:hover": {
                  backgroundColor: stateColors[status],
                  opacity: 0.8,
                },
              }}
            />
          ))}
          <Chip
            label="ELIMINA TICKET"
            onClick={() => setDeleteModalOpen(true)}
            clickable
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              mr: 2,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: "100%", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                DATI GENERALI
              </Typography>
              <Box sx={{ mt: 1, mb: 1, border: "1px solid", padding: 1 }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Samsung Galaxy s10
                  <DetailButton
                    onClick={() => handleInfoClick("DISPOSITIVO")}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  INFORMAZIONI CLIENTE
                  <DetailButton onClick={() => handleInfoClick("CLIENTE")} />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  STORICO TICKET
                  <DetailButton onClick={() => handleInfoClick("STORICO")} />
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: "100%", boxShadow: 3 }}>
              <Typography variant="h6">DETTAGLI PREVENTIVO</Typography>
              <Box sx={{ mt: 1, mb: 1, border: "1px solid", padding: 1 }}>
                <Typography variant="body2">
                  Riparazione schermo 40 €
                </Typography>
                <Typography variant="body2">
                  Connettore batteria 50 €
                </Typography>
                <Typography variant="body2">Connettore audio 30 €</Typography>
                <Typography variant="h6">Prezzo stimato 110 €</Typography>
              </Box>
            </Paper>
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
