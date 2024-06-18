import { fetchTickets } from '../../api/apiPartner';
import TicketDashboard from '../../components/Ticket/TicketDashboard';
import stateColors from '../../assets/json/state.json';

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "nome_cliente", headerName: "Nome Cliente", flex: 1 },
  { field: "cognome_cliente", headerName: "Cognome Cliente", flex: 1 },
  { field: "marca", headerName: "Marca", flex: 1 },
  { field: "modello", headerName: "Modello", flex: 1 },
  { field: "stato", headerName: "Stato", flex: 1, renderCell: (params) => {
    const color = stateColors[params.value] || '#FFFFFF';
    return (
      <div style={{ backgroundColor: color, padding: '8px', borderRadius: '4px' }}>
        {params.value}
      </div>
    );
  }},
  { field: "descrizione_problema", headerName: "Descrizione Problema", flex: 1 }
];

const DashboardPartner = () => {
  return (
    <TicketDashboard
      title="Dashboard Partner"
      fetchTickets={fetchTickets}
      columns={columns}
      searchFields={["_id", "nome_cliente", "cognome_cliente", "marca", "modello", "stato", "descrizione_problema"]}
      addTicketLink="/apri-ticket"
    />
  );
};

export default DashboardPartner;
