import { fetchTickets } from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import React from "react";
import usePageTitle from "../../CustomHooks/usePageTItle";

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
  return (
    <React.Fragment>
    <TicketDashboard
      fetchTickets={fetchTickets}
      columns={columns}
      searchFields={["_id", "id_partner", "stato"]}
      addTicketLink="/apri-ticket"
      filterStatuses={filterStatuses}
      alignSearchWithFilters={true}
    />
    </React.Fragment>
  );
};

export default DashboardAdmin;
