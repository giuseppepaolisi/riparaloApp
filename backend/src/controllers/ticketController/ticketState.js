const {
    APERTO,
    ACCETTATO,
    RITIRATO,
    IN_LAVORAZIONE,
    ATTESA_CONFERMA_PREVENTIVO,
    PREVENTIVO_ACCETTATO,
    PREVENTIVO_RIFIUTATO,
    COMPLETATO,
    ANNULLATO,
    ATTESA_RICAMBIO,
    IN_CONSEGNA_COMPLETATO,
    IN_CONSEGNA_ANNULLATO,
    IN_CONSEGNA_RIFIUTATO,
  } = require('../conf/state');

// State interface
class TicketState {
    constructor(ticket) {
        this.ticket = ticket;
    }

    handleAction() {
        throw new Error("Il metodo 'handleAction(action)' deve essere implementato");
    }

}

// Stato APERTO
class OpenTicket extends TicketState {
    handleAction(action) {
        if(action === ACCETTATO) {
            this.ticket.transitionTo (new AcceptedTicket(this.ticket));
        }
    }
}

// Stato ACCETTATO
class AcceptedTicket extends TicketState {
    handleAction(action) {
        if(action === RITIRATO) {
            this.ticket.transitionTo (new RetrivedTicket(this.ticket));
        } else if(action === IN_LAVORAZIONE) {
            this.ticket.transitionTo (new InProgressTicket(this.ticket));
        }
    }
}

// Stato RITIRATO
class RetrivedTicket extends TicketState {
    handleAction(action) {
        if(action === RITIRATO) {
            this.ticket.transitionTo (new InProgressTicket(this.ticket));
        }
    }
}

// Stato IN LAVORAZIONE
class InProgressTicket extends TicketState {
    handleAction(action) {
        if(action === ATTESA_CONFERMA_PREVENTIVO) {
            this.ticket.transitionTo (new AwatingQuoteConfirmTicket(this.ticket));
        } else if(action === ANNULLATO) {
            this.ticket.transitionTo (new CancelledTicket(this.ticket));
        }
    }
}

// Stato ATTESA CONFERMA PREVENTIVO
class AwatingQuoteConfirmTicket extends TicketState {
    handleAction(action) {
        if(action === PREVENTIVO_ACCETTATO) {
            this.ticket.transitionTo (new QuoteAcceptedTicket(this.ticket));
        } else if(action === PREVENTIVO_RIFIUTATO) {
            this.ticket.transitionTo (new QuoteRejectedTicket(this.ticket));
        }
    }
}

// Stato PREVENTIVO ACCETTATO
class QuoteAcceptedTicket extends TicketState {
    handleAction(action) {
        if(action === COMPLETATO) {
            this.ticket.transitionTo (new CompletedTicket(this.ticket));
        } else if(action === ATTESA_RICAMBIO) {
            this.ticket.transitionTo (new AwationgPartsTicket(this.ticket));
        }
    }
}

// Stato ATTESA RICAMBIO
class AwationgPartsTicket extends TicketState {
    handleAction(action) {
        if(action === COMPLETATO) {
            this.ticket.transitionTo (new CompletedTicket(this.ticket));
        }
    }
}

// Stato COMPLETATO
class CompletedTicket extends TicketState {
    handleAction(action) {
        if(action === IN_CONSEGNA_COMPLETATO) {
            this.ticket.transitionTo (new InDdeliveryCompletedTicket(this.ticket));
        }
    }
}

// Stato IN CONSEGNA COMPLETATO
class InDdeliveryCompletedTicket extends TicketState {
    handleAction(action) {
        // stato finale pos
    }
}

// Stato ANNULLATO
class CancelledTicket extends TicketState {
    handleAction(action) {
        if(action === IN_CONSEGNA_ANNULLATO) {
            this.ticket.transitionTo (new InDdeliveryCancelledTicket(this.ticket));
        }
    }
}

// Stato IN CONSEGNA ANNULLATO
class InDdeliveryCancelledTicket extends TicketState {
    handleAction(action) {
        // stato finale
    }
}

// Stato PREVENTIVO RIFIUTATO
class QuoteRejectedTicket extends TicketState {
    handleAction(action) {
        if(action === IN_CONSEGNA_RIFIUTATO) {
            this.ticket.transitionTo (new InDdeliveryRejectedTicket(this.ticket));
        }
    }
}

// Stato IN CONSEGNA RIFIUTATO
class InDdeliveryRejectedTicket extends TicketState {
    handleAction(action) {
        // stato finale
    }
}

module.exports = {
    OpenTicket,
    AcceptedTicket,
    RetrivedTicket,
    InProgressTicket,
    AwatingQuoteConfirmTicket,
    QuoteAcceptedTicket,
    AwationgPartsTicket,
    CompletedTicket,
    InDdeliveryCompletedTicket,
    CancelledTicket,
    InDdeliveryCancelledTicket,
    QuoteRejectedTicket,
    InDdeliveryRejectedTicket,
}