import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import CustomModal from "./CustomModal";
import FilterButtons from "./FilterButtons";
import SearchBar from "./SearchBar";
import ModularTable from "./ModularTable";
import stateColors from "../assets/json/state.json";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import fs from "fs";
import useTickets from "../CustomHooks/useTickets";

function Dashboard({
  ticketsData,
  tableHeaders,
  buttonLabels,
  searchFields,
  showOpenTicketButton = true,
}) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    ticketId: null,
  });
  const [filter, setFilter] = useState("ALL");
  const [searchField, setSearchField] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTickets(ticketsData);
  }, [ticketsData]);

  const openModal = useCallback((ticket) => setSelectedTicket(ticket), []);
  const closeModal = useCallback(() => setSelectedTicket(null), []);
  const openConfirmModal = useCallback(
    (ticketId) => setConfirmModal({ show: true, ticketId }),
    []
  );
  const closeConfirmModal = useCallback(
    () => setConfirmModal({ show: false, ticketId: null }),
    []
  );

  const deleteTicket = useCallback(() => {
    const ticketId = confirmModal.ticketId;
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);
    closeConfirmModal();
    fs.writeFile("./tickets.json", JSON.stringify(updatedTickets), (err) => {
      if (err)
        console.error(
          "Errore durante il salvataggio del file tickets.json:",
          err
        );
      else console.log("Ticket eliminato con successo.");
    });
  }, [confirmModal.ticketId, tickets, closeConfirmModal]);

  const { sortedTickets, requestSort, sortConfig } = useTickets(
    tickets,
    filter,
    searchField,
    searchQuery
  );

  return (
    <div className="container">
      <h2 className="text-left mb-2">DASHBOARD - TICKET</h2>
      {showOpenTicketButton && (
        <Link to="/apri-ticket" className="btn btn-primary mb-4">
          + Apri ticket
        </Link>
      )}
      <div className="d-flex justify-content-between mb-3">
        <FilterButtons
          filters={buttonLabels}
          onFilterChange={setFilter}
          stateColors={stateColors}
        />
        <SearchBar
          searchFields={searchFields}
          selectedSearchField={searchField}
          onSearchFieldChange={setSearchField}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      </div>
      <ModularTable
        headers={tableHeaders}
        data={sortedTickets}
        onRead={openModal}
        onDelete={openConfirmModal}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
      <CustomModal
        show={selectedTicket !== null}
        onHide={closeModal}
        title="Descrizione Problema"
        body={selectedTicket ? selectedTicket.descrizione : ""}
        cancelText="Chiudi"
      />
      <CustomModal
        show={confirmModal.show}
        onHide={closeConfirmModal}
        title="Conferma Eliminazione"
        body="Sei sicuro di voler davvero eliminare questo elemento?"
        onConfirm={deleteTicket}
        confirmText="Conferma"
        cancelText="Annulla"
      />
    </div>
  );
}

Dashboard.propTypes = {
  ticketsData: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired,
  buttonLabels: PropTypes.object.isRequired,
  searchFields: PropTypes.object.isRequired,
  showOpenTicketButton: PropTypes.bool,
};

export default Dashboard;
