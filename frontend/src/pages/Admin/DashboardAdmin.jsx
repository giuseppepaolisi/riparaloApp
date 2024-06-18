import { fetchTickets } from '../../api/apiPartner';
import TicketDashboard from '../../components/Ticket/TicketDashboard';
import stateColors from '../../assets/json/state.json';

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "id_partner", headerName: "ID Partner", flex: 1 },
  { field: "stato", headerName: "Stato", flex: 1, renderCell: (params) => {
    const color = stateColors[params.value] || '#FFFFFF';
    return (
      <div style={{ backgroundColor: color, padding: '8px', borderRadius: '4px' }}>
        {params.value}
      </div>
    );
  }},
];

const DashboardAdmin = () => {
  return (
    <TicketDashboard
      title="Dashboard Admin"
      fetchTickets={fetchTickets}
      columns={columns}
      searchFields={["_id", "id_partner", "stato"]}
      addTicketLink="/apri-ticket"
    />
  );
};

export default DashboardAdmin;
