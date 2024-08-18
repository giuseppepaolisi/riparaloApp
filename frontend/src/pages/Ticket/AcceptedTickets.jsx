// frontend\src\pages\Ticket\AcceptedTickets.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchTicketsByTechnician,
  fetchTicketById,
} from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import usePageTitle from "../../CustomHooks/usePageTitle";
import TicketDetailModal from "../../components/Modal/TicketDetailModal";

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "id_partner", headerName: "ID Partner", flex: 1 },
  { field: "marca", headerName: "Marca", flex: 1 },
  { field: "modello", headerName: "Modello", flex: 1 },
  {
    field: "stato",
    headerName: "Stato",
    flex: 1,
    renderCell: (params) => {
      const color = stateColors[params.value] || "#FFFFFF";
      return (
        <div
          style={{
            backgroundColor: color,
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {params.value}
        </div>
      );
    },
  },
  {
    field: "descrizione_problema",
    headerName: "Descrizione Problema",
    flex: 1,
  },
];

const filterStatuses = [
  { label: "Aperto", color: stateColors["Aperto"], filterValue: "aperto" },
  {
    label: "In attesa",
    color: stateColors["Attesa conferma preventivo"],
    filterValue: "attesa",
  },
  {
    label: "Annullato",
    color: stateColors["Annullato"],
    filterValue: "annullato",
  },
  {
    label: "Completato",
    color: stateColors["Completato"],
    filterValue: "completato",
  },
];

const AcceptedTickets = () => {
  usePageTitle("Tickets Tecnico");

  const [ticketDetails, setTicketDetails] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  const handleDetail = async (id) => {
    if (!token) return;
    try {
      const ticket = await fetchTicketById(token, id);
      setTicketDetails(ticket);
      setDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setTicketDetails(null);
  };

  return (
    <React.Fragment>
      <TicketDashboard
        fetchTickets={() =>
          fetchTicketsByTechnician(token, user.nome, user.cognome)
        }
        columns={columns}
        searchFields={[
          "_id",
          "id_partner",
          "marca",
          "modello",
          "stato",
          "descrizione_problema",
        ]}
        addTicketLink="/apri-ticket"
        filterStatuses={filterStatuses}
        alignSearchWithFilters={true}
        onDetail={handleDetail}
        showDeleteButton={false}
        editTicketLink="/edit-ticket-technician" // Provide the edit link for technician
      />
      <TicketDetailModal
        open={isDetailModalOpen}
        onClose={closeDetailModal}
        ticket={ticketDetails}
      />
    </React.Fragment>
  );
};

export default AcceptedTickets;
