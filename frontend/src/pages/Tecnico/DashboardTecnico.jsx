import { fetchTickets } from "../../api/apiPartner";
import TicketDashboard from "../../components/Ticket/TicketDashboard";
import stateColors from "../../assets/json/state.json";
import usePageTitle from "../../CustomHooks/usePageTItle";
import React from "react";

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

const DashboardTecnico = () => {
  usePageTitle("Dashboard Tecnico");
  return (
    <React.Fragment>
    <TicketDashboard
      fetchTickets={fetchTickets}
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
    />
  </React.Fragment>
  );
};

export default DashboardTecnico;
