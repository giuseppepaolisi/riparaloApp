import { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Chip, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json";
import TechnicianActions from "../../components/Ticket/TechnicianActions";
import TechnicianCostDetails from "../../components/Ticket/TechnicianCostDetails";
import Modals from "../../components/Modal/Modals";
import {
  fetchTicketById,
  editTicket,
  downloadPDF,
  viewPDF,
  deleteTicket,
} from "../../api/apiPartner";
import { useSelector } from "react-redux";
import InfoPartnerDetailModal from "../../components/Modal/InfoPartnerDetailModal";
import HistoryDetailModal from "../../components/Modal/HistoryDetailModal";
import InfoDeviceDetailModal from "../../components/Modal/InfoDeviceDetailModal";
import DescriptionDetailModal from "../../components/Modal/DescriptionDetailModal";
import CustomAlert from "../../components/Alert/CustomAlert";
import ExtraServices from "../../components/Ticket/ExtraServices";
import TicketDetails from "../../components/Ticket/TicketDetails";

const EditTicketTechnician = () => {
  usePageTitle("Dettagli Ticket Tecnico");
  useBodyBackgroundColor("#fff");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const [partnerDetailModal, setPartnerDetailModal] = useState({
    isOpen: false,
    partner: null,
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
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  const [extraServices, setExtraServices] = useState([]);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await fetchTicketById(token, id);
        setTicket(data);
        setExtraServices(data.extraServices || []);
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
      setAlert({
        open: true,
        msg: "Ticket eliminato con successo!",
        severity: "success",
      });
      setDeleteModalOpen(false);
      setTimeout(() => {
        navigate(-1);
      }, 1500); // Aggiungi un ritardo di 1,5 secondi
    } catch (error) {
      console.error("Errore nell'eliminazione del ticket:", error);
      setAlert({
        open: true,
        msg: "Errore nell'eliminazione del ticket",
        severity: "error",
      });
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTicket = await editTicket(token, {
        id: ticket._id,
        newstate: newStatus,
        technicianId: newStatus === "Accettato" ? user._id : undefined,
        extraServices: extraServices,
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
    if (infoType === "PARTNER") {
      setPartnerDetailModal({
        isOpen: true,
        partner: {
          telefono_partner: ticket.telefono_partner,
          ragione_sociale: ticket.ragione_sociale,
          partita_iva: ticket.partita_iva,
          codiceUnivoco: ticket.codiceUnivoco,
          pec: ticket.pec,
          cap: ticket.cap,
          via: ticket.via,
          provincia: ticket.provincia,
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
    const prezzoStimato = ticket.prezzo_stimato;
    const prezzoServiziExtra = extraServices.reduce(
      (total, service) => total + parseFloat(service.prezzo || 0),
      0
    );
    const prezzoTotale = prezzoStimato + prezzoServiziExtra;

    return {
      prezzoStimato: ticket.prezzo_stimato,
      prezzoServiziExtra:
        ticketStatus === "Aperto" ||
        ticketStatus === "Accettato" ||
        ticketStatus === "Ritirato"
          ? null
          : prezzoServiziExtra,
      prezzoTotale: prezzoTotale,
    };
  };

  const handleAddExtraService = () => {
    setExtraServices([...extraServices, { nome: "", prezzo: "" }]);
  };

  const handleRemoveExtraService = (index) => {
    const newServices = [...extraServices];
    newServices.splice(index, 1);
    setExtraServices(newServices);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...extraServices];
    newServices[index][field] = value;
    setExtraServices(newServices);
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
        confirmButtonColor="error" // Imposta il colore del pulsante di conferma su rosso
      />
      <InfoPartnerDetailModal
        open={partnerDetailModal.isOpen}
        onClose={() => setPartnerDetailModal({ isOpen: false, partner: null })}
        partner={partnerDetailModal.partner}
      />
      <HistoryDetailModal
        open={historyDetailModal.isOpen}
        onClose={() => setHistoryDetailModal({ isOpen: false, history: null })}
        history={historyDetailModal.history}
      />
      <InfoDeviceDetailModal
        open={deviceDetailModal.isOpen}
        onClose={() => setDeviceDetailModal({ isOpen: false, device: null })}
        device={deviceDetailModal.device}
      />
      <DescriptionDetailModal
        open={descriptionDetailModal.isOpen}
        onClose={() =>
          setDescriptionDetailModal({ isOpen: false, description: null })
        }
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

        <TechnicianActions
          ticketStatus={ticketStatus}
          stateColors={stateColors}
          onStatusChange={(newStatus) => {
            setCurrentAction(() => () => handleStatusChange(newStatus));
            setModalMessage(
              `Sei sicuro di voler cambiare lo stato del ticket in "${newStatus}"?`
            );
            setModalOpen(true);
          }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TicketDetails
              ticketInfo={[
                {
                  label: `${ticket.marca} ${ticket.modello}`,
                  type: "DISPOSITIVO",
                },
                { label: "INFORMAZIONI PARTNER", type: "PARTNER" },
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
            <TechnicianCostDetails calculateTotal={calculateTotal} ticketStatus={ticketStatus} />
          </Grid>
        </Grid>

        {ticketStatus === "In lavorazione" && (
          <ExtraServices
            extraServices={extraServices}
            onAddService={handleAddExtraService}
            onRemoveService={handleRemoveExtraService}
            onServiceChange={handleServiceChange}
          />
        )}
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
      {alert.open && (
        <CustomAlert
          msg={alert.msg}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      )}
    </Box>
  );
};

export default EditTicketTechnician;
