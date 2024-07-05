import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchTicketsByTechnician, fetchTicketById } from "../../api/apiPartner";
import usePageTitle from "../../CustomHooks/usePageTitle";
import TicketDetailModal from "../../components/Modal/TicketDetailModal";
import stateColors from "../../assets/json/state.json";

const AcceptedTickets = () => {
  usePageTitle("Tickets Tecnico");

  const [ticketDetails, setTicketDetails] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const { token, user } = useSelector((state) => state.auth);

  const fetchTickets = useCallback(async () => {
    if (!token) return;
    try {
      const fetchedTickets = await fetchTicketsByTechnician(token, user._id);
      setTickets(fetchedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }, [token, user._id]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

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
    <div>
      <h1>Tickets del Tecnico</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Cliente</th>
            <th>Cognome Cliente</th>
            <th>Marca</th>
            <th>Modello</th>
            <th>Stato</th>
            <th>Descrizione Problema</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.nome_cliente}</td>
              <td>{ticket.cognome_cliente}</td>
              <td>{ticket.marca}</td>
              <td>{ticket.modello}</td>
              <td style={{ backgroundColor: stateColors[ticket.stato] || "#FFFFFF" }}>
                {ticket.stato}
              </td>
              <td>{ticket.descrizione_problema}</td>
              <td>
                <button onClick={() => handleDetail(ticket._id)}>Dettagli</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDetailModalOpen && (
        <TicketDetailModal
          open={isDetailModalOpen}
          onClose={closeDetailModal}
          ticket={ticketDetails}
        />
      )}
    </div>
  );
};

export default AcceptedTickets;
