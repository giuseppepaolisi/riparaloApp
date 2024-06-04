import { useSelector } from "react-redux";
import CustomModal from "../../components/CustomModal";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import { Link } from "react-router-dom";
import stateColors from "../../assets/json/state.json";
import fs from "fs";

import { useCallback, useState, useEffect } from "react";
import { fetchTickets } from "../../api/apiPartner";

function DashboardPartner() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    ticketId: null,
  });
  const [filter, setFilter] = useState("ALL");
  const [searchField, setSearchField] = useState("_id");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { token } = useSelector((state) => state.auth);

  const loadTickets = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      const tickets = await fetchTickets(token);
      setTickets(tickets);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const openConfirmModal = (ticketId) => {
    setConfirmModal({ show: true, ticketId });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ show: false, ticketId: null });
  };

  const deleteTicket = () => {
    const ticketId = confirmModal.ticketId;
    const updatedTickets = tickets.filter((ticket) => ticket._id !== ticketId);
    setTickets(updatedTickets);

    closeConfirmModal();

    fs.writeFile("./tickets.json", JSON.stringify(updatedTickets), (err) => {
      if (err) {
        console.error(
          "Errore durante il salvataggio del file tickets.json:",
          err
        );
      } else {
        console.log("Ticket eliminato con successo.");
      }
    });
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter !== "ALL" && ticket.stato !== filter) {
      return false;
    }
    if (searchQuery) {
      const field = searchField;
      const value = ticket[field] ? ticket[field].toString().toLowerCase() : "";
      return value.startsWith(searchQuery.toLowerCase());
    }
    return true;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const buttonLabels = {
    ALL: "TUTTI",
    ACCETTATO: "ACCETTATO",
    ATTESA_CONFERMA_PREVENTIVO: "ATTESA CONFERMA PREVENTIVO",
    ANNULLATO: "ANNULLATO",
  };

  const searchFields = {
    _id: "ID Ticket",
    nome: "Nome",
    cognome: "Cognome",
    marca: "Marca",
    modello: "Modello",
  };

  const tableHeaders = [
    { key: "_id", label: "ID Ticket" },
    { key: "dataApertura", label: "Data apertura" },
    { key: "nome", label: "Nome" },
    { key: "cognome", label: "Cognome" },
    { key: "marca", label: "Marca" },
    { key: "modello", label: "Modello" },
    { key: "stato", label: "Stato" },
    { key: "descrizione", label: "Descrizione" },
    { key: "elimina", label: "Elimina" },
  ];

  return (
    <div className="container">
      <h2 className="text-left mb-4">DASHBOARD - TICKET</h2>
      <Link to="/apri-ticket" className="btn btn-primary mb-4">
        + Apri ticket
      </Link>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          {Object.entries(buttonLabels).map(([key, label]) => (
            <button
              key={key}
              className="btn mx-1"
              style={{
                backgroundColor: key === "ALL" ? "#4B4B4B" : stateColors[key],
                color: "white",
              }}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="d-flex">
          <select
            className="form-select mx-2"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            {Object.entries(searchFields).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder={`Cerca per ${searchFields[searchField].toLowerCase()}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-bordered text-center">
        <TableHeader
          headers={tableHeaders}
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
        <tbody>
          {sortedTickets.map((ticket) => (
            <TableRow
              key={ticket._id}
              ticket={ticket}
              onRead={openModal}
              onDelete={openConfirmModal}
            />
          ))}
        </tbody>
      </table>
      <CustomModal
        show={selectedTicket !== null}
        onHide={closeModal}
        title="Descrizione Problema"
        body={selectedTicket && selectedTicket.descrizione_problema}
        cancelText="Chiudi"
      />
      <CustomModal
        show={confirmModal.show}
        onHide={closeConfirmModal}
        title="Conferma Eliminazione"
        body="Sei sicuro di voler davvero eliminare questo ticket?"
        onConfirm={deleteTicket}
        confirmText="Conferma"
        cancelText="Annulla"
      />
    </div>
  );
}

export default DashboardPartner;
