const Ticket = require('../../models/ticket');
const { ErrorResponse } = require('../../middleware/errorManager');
const { TicketContext } = require('./ticketContext');
const { ticketFactory } = require('./ticketFactory');
const { findOne } = require('../../models/customer');

const updateState = async (req, res, next) => {
  // includere anche: descrizione del problema, prezzo effettivo, storico

  const { id, newstate } = req.body;
  const role = req.user.role;
  console.log(role);

  try {
    // retrive dello stato attuale del ticket
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) {
      // ticket non trovato
      throw new ErrorResponse('Ticket non trovato', 404);
    }

    let context = new TicketContext(ticketFactory(ticket.stato));
    // controlla se l'utente è autorizzato a cambiare stato
    if (!context.isAuthorized(role)) {
      console.log('sono nel if');
      throw new ErrorResponse('Non sei autorizzato a cambiare stato', 400);
    }

    if (!context.isValid(newstate)) {
      // transizione di stato non valida
      throw new ErrorResponse(
        'Transizione di stato illegale: ' + ticket.stato + ' -/-> ' + newstate,
        400
      );
    }

    // set del nuovo stato
    ticket.stato = newstate;

    // aggiornamento dello stato
    const newTicket = await ticket.save();
    res.status(200).json({ newTicket });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateState,
};
