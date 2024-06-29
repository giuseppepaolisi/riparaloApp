import React, { useState} from "react";
import { useSelector } from "react-redux";
import { fetchTickets, fetchTicketById } from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import usePageTitle from "../../CustomHooks/usePageTItle";
import TicketDetailModal from "../../components/Modal/TicketDetailModal";

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "id_partner", headerName: "ID Partner", flex: 1 },
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
  {
    label: "Completato",
    color: stateColors["Completato"],
    filterValue: "completato",
  },
  {
    label: "Rifiutato",
    color: stateColors["Preventivo rifiutato"],
    filterValue: "rifiutato",
  },
];

const DashboardAdmin = () => {
  usePageTitle("Dashboard Admin");

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
        searchFields={["_id", "id_partner", "stato"]}
        addTicketLink="/apri-ticket"
        filterStatuses={filterStatuses}
        alignSearchWithFilters={true}
        onDetail={handleDetail} // Pass the detail handler to TicketDashboard
      />
      <TicketDetailModal
        open={isDetailModalOpen}
        onClose={closeDetailModal}
        ticket={ticketDetails}
      />
    </React.Fragment>
  );
};

export default DashboardAdmin;
