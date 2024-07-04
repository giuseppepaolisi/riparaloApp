// frontend/src/utils/ticketUtils.js
import { createTicket } from "../api/apiPartner";

export async function handleTicketCreate(fields, token, setAlert, navigate) {
  const { servizi } = fields;

  const filteredServices = servizi.filter(
    (service) => service.servizio && service.prezzo
  );

  try {
    await createTicket(token, { ...fields, servizi: filteredServices });
    setAlert({
      open: true,
      msg: "Ticket creato con successo",
      severity: "success",
    });
    setTimeout(() => navigate("/partner-dashboard"), 2000);
  } catch (err) {
    setAlert({
      open: true,
      msg: "Errore nella creazione del ticket",
      severity: "error",
    });
  }
}
