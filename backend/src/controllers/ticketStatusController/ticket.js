const Ticket = require('../../models/ticket');
const { ErrorResponse } = require('../../middleware/errorManager');
const { TicketContext } = require('./ticketContext');
const { ticketFactory } = require('./ticketFactory');
const { ADMIN, TECHNICIAN, PARTNER } = require('../../conf/role');
const { ATTESA_CONFERMA_PREVENTIVO } = require('../../conf/state');

const updateState = async (req, res, next) => {
  const { id, newstate } = req.body;
  const role = req.user.role;
  const nome = req.user.nome;
  const cognome = req.user.cognome;
  const { descrizione_tecnica, prezzo } = req.body;
  console.log(descrizione_tecnica);
  console.log(prezzo);

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

    // set dello storico
    const storico = {
      stato: newstate,
      data: new Date(),
    };
    if ([ADMIN, TECHNICIAN].includes(role)) {
      storico.tecnico = nome + " " + cognome;
    }
    ticket.storico_stato.push(storico);
    // set descrizione tecnica
    if (descrizione_tecnica) {
      ticket.descrizione_tecnica = descrizione_tecnica;
    }
    // set del prezzo
    if (newstate === ATTESA_CONFERMA_PREVENTIVO) {
      if (!prezzo || prezzo === 0 || prezzo === '') {
        // conferma il prezzo stimato
        ticket.prezzo = ticket.prezzo_stimato;
      } else {
        // aggiunge il nuovo prezzo
        const prezzoFloat = parseFloat(prezzo);
        if (
          typeof prezzo === 'string' ||
          isNaN(prezzoFloat) ||
          prezzoFloat < 0
        ) {
          throw new ErrorResponse('Inserisci un prezzo valido', 400);
        }
        ticket.prezzo = prezzoFloat;
      }
    }

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
