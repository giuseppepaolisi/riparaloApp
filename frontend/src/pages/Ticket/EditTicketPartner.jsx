import { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Chip, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import TicketActions from "../../components/Ticket/TicketActions";
import TicketDetails from "../../components/Ticket/TicketDetails";
import EstimateDetails from "../../components/Ticket/EstimateDetails";
import Modals from "../../components/Modal/Modals";
import {
  fetchTicketById,
  editTicket,
  downloadPDF,
  viewPDF,
  deleteTicket
} from "../../api/apiPartner";
import { useSelector } from "react-redux";
import CustomerDetailModal from "../../components/Modal/CustomerDetailModal";
import HistoryDetailModal from "../../components/Modal/HistoryDetailModal";
import InfoDeviceDetailModal from "../../components/Modal/InfoDeviceDetailModal";
import DescriptionDetailModal from "../../components/Modal/DescriptionDetailModal";

const EditTicketPartner = () => {
  usePageTitle("Dettagli Ticket");
  useBodyBackgroundColor("#fff");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const [customerDetailModal, setCustomerDetailModal] = useState({
    isOpen: false,
    customer: null,
  });
  const [historyDetailModal, setHistoryDetailModal] = useState({
    isOpen: false,
    history: null,
  });
  const [deviceDetailModal, setDeviceDetailModal] = useState({
    isOpen: false,
    device: null,
  });
  const [descriptionDetailModal, setDescriptionDetailModal] = useState({
    isOpen: false,
    description: null,
  });

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await fetchTicketById(token, id);
        setTicket(data);
      } catch (error) {
        console.error("Errore nel caricamento del ticket:", error);
      }
    };

    loadTicket();
  }, [token, id]);

  if (!ticket) {
    return <Typography>Caricamento...</Typography>;
  }

  const ticketStatus = ticket.stato;
  const statusColor = stateColors[ticketStatus] || "#FFFFFF";

  const handleDelete = async () => {
    try {
      await deleteTicket(token, ticket._id);
      console.log("Ticket eliminato");
      setDeleteModalOpen(false);
      navigate(-1);
    } catch (error) {
      console.error("Errore nell'eliminazione del ticket:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTicket = await editTicket(token, {
        id: ticket._id,
        newstate: newStatus,
      });
      setTicket(updatedTicket);
      console.log(`Changed status to ${newStatus}`);
      setModalOpen(false);
    } catch (error) {
      console.error("Errore nel cambiamento dello stato del ticket:", error);
    }
  };

  const handleConfirm = () => {
    if (currentAction) currentAction();
  };

  const handleInfoClick = (infoType) => {
    if (infoType === "CLIENTE") {
      setCustomerDetailModal({
        isOpen: true,
        customer: {
          nome: ticket.nome_cliente,
          cognome: ticket.cognome_cliente,
          email: ticket.email_cliente,
          telefono: ticket.telefono_cliente,
        },
      });
    } else if (infoType === "STORICO") {
      setHistoryDetailModal({
        isOpen: true,
        history: ticket.storico_stato,
      });
    } else if (infoType === "DISPOSITIVO") {
      setDeviceDetailModal({
        isOpen: true,
        device: {
          descrizione_problema: ticket.descrizione_problema,
          imei: ticket.imei,
          pin: ticket.pin,
          seriale: ticket.seriale,
        },
      });
    } else if (infoType === "DESCRIZIONE") {
      setDescriptionDetailModal({
        isOpen: true,
        description: ticket.descrizione_tecnica,
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(token, ticket);
    } catch (error) {
      console.error("Errore nel download del PDF:", error);
    }
  };

  const handleViewPDF = async () => {
    try {
      await viewPDF(token, ticket._id);
    } catch (error) {
      console.error("Errore nella visualizzazione del PDF:", error);
    }
  };

  const calculateTotal = () => {
    const prezzoFinale = ticket.servizi.reduce(
      (total, service) => total + service.prezzo,
      0
    );
    const prezzoDaSaldare = prezzoFinale - ticket.acconto;
    return {
      prezzoStimato: ticket.prezzo_stimato,
      acconto: ticket.acconto,
      prezzoTotale: prezzoFinale,
      prezzoDaSaldare,
    };
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
        onCancel={() => setModalOpen(false)}
        onDelete={handleDelete}
      />
      <CustomerDetailModal
        open={customerDetailModal.isOpen}
        onClose={() =>
          setCustomerDetailModal({ isOpen: false, customer: null })
        }
        customer={customerDetailModal.customer}
      />
      <HistoryDetailModal
        open={historyDetailModal.isOpen}
        onClose={() =>
          setHistoryDetailModal({ isOpen: false, history: null })
        }
        history={historyDetailModal.history}
      />
      <InfoDeviceDetailModal
        open={deviceDetailModal.isOpen}
        onClose={() => setDeviceDetailModal({ isOpen: false, device: null })}
        device={deviceDetailModal.device}
      />
      <DescriptionDetailModal
        open={descriptionDetailModal.isOpen}
        onClose={() => setDescriptionDetailModal({ isOpen: false, description: null })}
        description={descriptionDetailModal.description}
      />
      <Box>
        <Typography variant="h6" gutterBottom>
          TICKET ID: {ticket._id}
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
            <IconButton color="primary" onClick={handleDownloadPDF}>
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleViewPDF}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>

        <TicketActions
          ticketStatus={ticketStatus}
          stateColors={stateColors}
          onStatusChange={(newStatus) => {
            setCurrentAction(() => () => handleStatusChange(newStatus));
            setModalMessage(
              `Sei sicuro di voler cambiare lo stato del ticket in "${newStatus}"?`
            );
            setModalOpen(true);
          }}
          onDelete={() => setDeleteModalOpen(true)}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TicketDetails
              ticketInfo={[
                {
                  label: `${ticket.marca} ${ticket.modello}`,
                  type: "DISPOSITIVO",
                },
                { label: "INFORMAZIONI CLIENTE", type: "CLIENTE" },
                { label: "STORICO TICKET", type: "STORICO" },
                {
                  label: "LEGGI DESCRIZIONE TECNICA",
                  type: "DESCRIZIONE",
                  condition: ticket.stato === "Attesa conferma preventivo",
                },
              ]}
              onInfoClick={handleInfoClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <EstimateDetails
              ticketStatus={ticketStatus}
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
          onClick={() => navigate(-1)}
        >
          INDIETRO
        </Button>
      </Box>
    </Box>
  );
};

export default EditTicketPartner;
