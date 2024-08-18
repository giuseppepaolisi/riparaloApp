import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Chip,
  Button,
  TextField,
} from "@mui/material";
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
} from "../../api/apiPartner";
import { useSelector } from "react-redux";
import DetailModals from "../../components/Modal/DetailModals";
import CustomAlert from "../../components/Alert/CustomAlert";
import TicketDetails from "../../components/Ticket/TicketDetails";
import RequestedServices from "../../components/Ticket/RequestedServices";
import ExtraServices from "../../components/Ticket/ExtraServices";

const EditTicketTechnician = () => {
  usePageTitle("Dettagli Ticket Tecnico");
  useBodyBackgroundColor("#fff");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [technicalDescription, setTechnicalDescription] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await fetchTicketById(token, id);
        setTicket(data);
        setExtraServices(data.extraServices || []);
        setTechnicalDescription(data.descrizione_tecnica || "");
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

  const handleStatusChange = async (newStatus) => {
    try {
      const descriptionText = extraServices
        .map((service) => `${service.nome} ${service.prezzo} €`)
        .join("; ");
      const updatedTicket = await editTicket(token, {
        id: ticket._id,
        newstate: newStatus,
        technicianId: newStatus === "Accettato" ? user._id : undefined,
        extraServices: extraServices,
        descrizione_tecnica:
          technicalDescription +
          (descriptionText ? "\n" + descriptionText : ""),
        prezzo:
          ticket.prezzo_stimato +
          extraServices.reduce(
            (total, service) => total + parseFloat(service.prezzo || 0),
            0
          ),
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
        description: technicalDescription,
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
    const prezzoTotale =
      ticket.prezzo_stimato +
      extraServices.reduce(
        (total, service) => total + parseFloat(service.prezzo || 0),
        0
      );
    const prezzoDaSaldare = prezzoTotale - ticket.acconto;
    const prezzoServiziExtra = extraServices.reduce(
      (total, service) => total + parseFloat(service.prezzo || 0),
      0
    );
    return {
      prezzoStimato: ticket.prezzo_stimato,
      acconto: ticket.acconto,
      prezzoServiziExtra: prezzoServiziExtra || null,
      prezzo: ticket.prezzo,
      prezzoDaSaldare: prezzoDaSaldare,
    };
  };

  const handleAddExtraService = () => {
    if (serviceName && servicePrice) {
      setExtraServices([
        ...extraServices,
        { nome: serviceName, prezzo: parseFloat(servicePrice) },
      ]);
      setServiceName("");
      setServicePrice("");
    }
  };

  const handleRemoveExtraService = (index) => {
    setExtraServices(extraServices.filter((_, i) => i !== index));
  };

  const isTechnicalDescriptionVisible = [
    "Attesa conferma preventivo",
    "Preventivo accettato",
    "Preventivo rifiutato",
    "Completato",
    "Annullato",
    "Attesa ricambio",
    "In consegna - completato",
    "In consegna - annullato",
    "In consegna - rifiutato",
  ].includes(ticketStatus);

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
        deleteModalOpen={false}
        modalMessage={modalMessage}
        onConfirm={handleConfirm}
        onCancel={() => setModalOpen(false)}
        onDelete={() => {}}
      />
      <DetailModals
        partnerDetailModal={partnerDetailModal}
        setPartnerDetailModal={setPartnerDetailModal}
        historyDetailModal={historyDetailModal}
        setHistoryDetailModal={setHistoryDetailModal}
        deviceDetailModal={deviceDetailModal}
        setDeviceDetailModal={setDeviceDetailModal}
        descriptionDetailModal={descriptionDetailModal}
        setDescriptionDetailModal={setDescriptionDetailModal}
        technicalDescription={technicalDescription}
        showTechnician={true}
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
                  condition: isTechnicalDescriptionVisible,
                },
              ]}
              onInfoClick={handleInfoClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RequestedServices services={ticket.servizi} />
            <TechnicianCostDetails
              ticketStatus={ticketStatus}
              calculateTotal={calculateTotal}
            />
          </Grid>
        </Grid>

        {ticketStatus === "In lavorazione" && (
          <ExtraServices
            extraServices={extraServices}
            setExtraServices={setExtraServices}
            serviceName={serviceName}
            setServiceName={setServiceName}
            servicePrice={servicePrice}
            setServicePrice={setServicePrice}
            handleAddExtraService={handleAddExtraService}
            handleRemoveExtraService={handleRemoveExtraService}
          />
        )}

        {ticketStatus !== "Aperto" &&
          ticketStatus !== "Accettato" &&
          ticketStatus !== "Ritirato" && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                DESCRIZIONE TECNICA
              </Typography>
              <TextField
                value={technicalDescription}
                onChange={(e) => setTechnicalDescription(e.target.value)}
                fullWidth
                multiline
                rows={2}
                margin="normal"
              />
            </Box>
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
