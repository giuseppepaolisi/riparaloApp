// frontend/src/utils/ticketUtils.js

import { createTicket } from "../api/apiPartner";

export async function handleTicketCreate(fields, token, setAlert, navigate) {
  const { servizi } = fields;

  const filteredServices = servizi.filter(
    (service) => service.servizio && service.prezzo
  );

  try {
    const response = await createTicket(token, { ...fields, servizi: filteredServices });
    const createdTicket = response.ticket; // Ottieni il ticket dalla risposta
    setAlert({
      open: true,
      msg: "Ticket creato con successo",
      severity: "success",
    });
    setTimeout(() => navigate(`/edit-ticket-partner/${createdTicket._id}`), 2000); // Utilizza l'ID del ticket creato
    return createdTicket;
  } catch (err) {
    setAlert({
      open: true,
      msg: "Errore nella creazione del ticket",
      severity: "error",
    });
    throw err;
  }
}
