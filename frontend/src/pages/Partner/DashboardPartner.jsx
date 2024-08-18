import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchTickets, fetchTicketById } from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import usePageTitle from "../../CustomHooks/usePageTitle";
import TicketDetailModal from "../../components/Modal/TicketDetailModal";

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "nome_cliente", headerName: "Nome Cliente", flex: 1 },
  { field: "cognome_cliente", headerName: "Cognome Cliente", flex: 1 },
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
  {
    label: "Accettato",
    color: stateColors["Accettato"],
    filterValue: "accettato",
  },
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
];

const DashboardPartner = () => {
  usePageTitle("Dashboard Partner");

  const [ticketDetails, setTicketDetails] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);

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
        fetchTickets={fetchTickets}
        columns={columns}
        searchFields={[
          "_id",
          "nome_cliente",
          "cognome_cliente",
          "marca",
          "modello",
          "stato",
          "descrizione_problema",
        ]}
        addTicketLink="/apri-ticket"
        showAddButton={true}
        filterStatuses={filterStatuses}
        alignSearchWithFilters={false}
        onDetail={handleDetail}
        showDeleteButton={true}
        showDeleteButtonOnlyOpen={true}
        editTicketLink="/edit-ticket-partner"
      />
      <TicketDetailModal
        open={isDetailModalOpen}
        onClose={closeDetailModal}
        ticket={ticketDetails}
      />
    </React.Fragment>
  );
};

export default DashboardPartner;
