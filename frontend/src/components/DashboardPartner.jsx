import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ticketsData from "./tickets.json";
import fs from "fs";

function DashboardPartner() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // Carica i dati dei ticket da tickets.json al caricamento del componente
    setTickets(ticketsData);
  }, []);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const deleteTicket = (ticketId) => {
    // Elimina il ticket dallo stato locale
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);

    // Aggiorna il file tickets.json
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

  return (
    <div className="container">
      <h1 className="text-center">Dashboard</h1>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>ID Ticket</th>
            <th>Data apertura</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Marca</th>
            <th>Modello</th>
            <th>Stato</th>
            <th>Descrizione</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.dataApertura}</td>
              <td>{ticket.nome}</td>
              <td>{ticket.cognome}</td>
              <td>{ticket.marca}</td>
              <td>{ticket.modello}</td>
              <td>{ticket.stato}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => openModal(ticket)}
                >
                  Leggi
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTicket(ticket.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modale per visualizzare la descrizione del problema */}
      <Modal show={selectedTicket !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Descrizione Problema</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedTicket && selectedTicket.descrizione}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DashboardPartner;
