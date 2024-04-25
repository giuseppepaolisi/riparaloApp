const Ticket = require('../../models/ticket');
const { ErrorResponse } = require('../../middleware/errorManager');
const {TicketContext} = require('./ticketContext');
const {tickFactory} = require('./ticketFactory');
const { findOne } = require('../../models/customer');

const updateState = async (req, res, next) => {
    const { id, newstate } = req.body;

    try {

        // retrive dello stato attuale del ticket
        const ticket = await Ticket.findById({_id:id});
        if(!ticket) {
            // ticket non trovato
            return new ErrorResponse('Ticket non trovato', 404);
        }

        let context = new TicketContext(tickFactory(ticket.stato));
        if(!context.action(newstate)) {
            // transizione di stato non valida
            return new ErrorResponse('Tranzazione di stato illegale: ' + ticket.stato + " -/-> " + newstate, 404);
        }

        // aggiornamento dello stato

    } catch(error){
        next(error);
    }
}