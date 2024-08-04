import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchTickets,
  fetchTicketById,
  fetchTicketsByTechnician,
} from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import usePageTitle from "../../CustomHooks/usePageTitle";
import TicketDetailModal from "../../components/Modal/TicketDetailModal";

const DashboardTechnician = () => {
  usePageTitle("Dashboard Tecnico");

  const [ticketDetails, setTicketDetails] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [acceptedTicketIds, setAcceptedTicketIds] = useState([]);

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAcceptedTickets = async () => {
      if (!token) return;
      try {
        const tickets = await fetchTicketsByTechnician(token, user.email);
        setAcceptedTicketIds(tickets.map((ticket) => ticket._id));
      } catch (error) {
        console.error("Error fetching accepted tickets:", error);
      }
    };

    fetchAcceptedTickets();
  }, [token, user.email]);

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

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "ragione_sociale", headerName: "Ragione Sociale", flex: 1 },
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

  const getRowClassName = (params) => {
    return acceptedTicketIds.includes(params.id) ? "accepted-ticket" : "";
  };

  return (
    <React.Fragment>
      <TicketDashboard
        fetchTickets={fetchTickets}
        columns={columns}
        searchFields={[
          "_id",
          "ragione_sociale",
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
        editTicketLink="/edit-ticket-technician"
        getRowClassName={getRowClassName} // Passa la funzione getRowClassName
      />
      <TicketDetailModal
        open={isDetailModalOpen}
        onClose={closeDetailModal}
        ticket={ticketDetails}
      />
    </React.Fragment>
  );
};

export default DashboardTechnician;
