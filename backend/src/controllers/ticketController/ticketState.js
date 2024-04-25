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
  } = require('../../conf/state');

// State interface
class TicketState {
    setContext(context) {
        this.context = context;
    }

    handleAction(action) {
    }

}

// Stato APERTO
class OpenTicket extends TicketState { 
    handleAction(action) {
        console.log("action: " + action);
        if(action === ACCETTATO) {
            console.log(ACCETTATO);
            this.context.transitionTo(new AcceptedTicket());
        }
    }
}

// Stato ACCETTATO
class AcceptedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === RITIRATO) {
            console.log(RITIRATO);
            this.context.transitionTo(new RetrivedTicket());
        } else if(action === IN_LAVORAZIONE) {
            console.log(IN_LAVORAZIONE);
            this.context.transitionTo(new InProgressTicket()); 
        }
    }
}

// Stato RITIRATO
class RetrivedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === IN_LAVORAZIONE) {
            console.log(IN_LAVORAZIONE);
            this.context.transitionTo(new InProgressTicket());
        }
    }
}

// Stato IN LAVORAZIONE
class InProgressTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === ATTESA_CONFERMA_PREVENTIVO) {
            console.log(ATTESA_CONFERMA_PREVENTIVO);
            this.context.transitionTo(new AwatingQuoteConfirmTicket());
        } else if(action === ANNULLATO) {
            console.log(ANNULLATO);
            this.context.transitionTo(new CancelledTicket());
        }
    }
}

// Stato ATTESA CONFERMA PREVENTIVO
class AwatingQuoteConfirmTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === PREVENTIVO_ACCETTATO) {
            this.context.transitionTo(new QuoteAcceptedTicket());
            console.log(PREVENTIVO_ACCETTATO);
        } else if(action === PREVENTIVO_RIFIUTATO) {
            this.context.transitionTo(new QuoteRejectedTicket());
            console.log(PREVENTIVO_RIFIUTATO);
        }
    }
}

// Stato PREVENTIVO ACCETTATO
class QuoteAcceptedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === COMPLETATO) {
            this.context.transitionTo(new CompletedTicket());
            console.log(COMPLETATO);
        } else if(action === ATTESA_RICAMBIO) {
            this.context.transitionTo(new AwationgPartsTicket());
            console.log(ATTESA_RICAMBIO);
        }
    }
}

// Stato ATTESA RICAMBIO
class AwationgPartsTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === COMPLETATO) {
            this.context.transitionTo(new CompletedTicket());
            console.log(COMPLETATO);
        }
    }
}

// Stato COMPLETATO
class CompletedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === IN_CONSEGNA_COMPLETATO) {
            this.context.transitionTo(new InDdeliveryCompletedTicket());
            console.log(IN_CONSEGNA_COMPLETATO);
        }
    }
}

// Stato IN CONSEGNA COMPLETATO
class InDdeliveryCompletedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        // stato finale pos
        console.log(IN_CONSEGNA_COMPLETATO);
    }
}

// Stato ANNULLATO
class CancelledTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === IN_CONSEGNA_ANNULLATO) {
            this.context.transitionTo(new InDdeliveryCancelledTicket());
            console.log(IN_CONSEGNA_ANNULLATO);
        }
    }
}

// Stato IN CONSEGNA ANNULLATO
class InDdeliveryCancelledTicket extends TicketState {
    handleAction(action) {
        // stato finale
        console.log("action: " + action);
        console.log(IN_CONSEGNA_ANNULLATO);
    }
}

// Stato PREVENTIVO RIFIUTATO
class QuoteRejectedTicket extends TicketState {
    handleAction(action) {
        console.log("action: " + action);
        if(action === IN_CONSEGNA_RIFIUTATO) {
            this.context.transitionTo(new InDdeliveryRejectedTicket());
            console.log(IN_CONSEGNA_RIFIUTATO);
        }
    }
}

// Stato IN CONSEGNA RIFIUTATO
class InDdeliveryRejectedTicket extends TicketState {
    handleAction(action) {
        // stato finale
        console.log("action: " + action);
        console.log(IN_CONSEGNA_RIFIUTATO);
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