import ticketsData from "../../assets/json/tickets.json";
import Dashboard from "../../components/Dashboard";

const tableHeaders = [
  { key: "id", label: "ID Ticket" },
  { key: "id partner", label: "ID Partner" },
  { key: "dataApertura", label: "Data apertura" },
  { key: "stato", label: "Stato" },
  { key: "leggi", label: "Leggi" },
  { key: "elimina", label: "Elimina" },
];

const buttonLabels = {
  ALL: "TUTTI",
  Accettato: "ACCETTATO",
  "Attesa conferma preventivo": "ATTESA CONFERMA PREVENTIVO",
  Annullato: "ANNULLATO",
};

const searchFields = {
  id: "ID Ticket",
  "id partner": "ID Partner",
  dataApertura: "Data Apertura",
};

function DashboardAdmin() {
  return (
    <Dashboard
      ticketsData={ticketsData}
      tableHeaders={tableHeaders}
      buttonLabels={buttonLabels}
      searchFields={searchFields}
      showOpenTicketButton={false}
    />
  );
}

export default DashboardAdmin;
