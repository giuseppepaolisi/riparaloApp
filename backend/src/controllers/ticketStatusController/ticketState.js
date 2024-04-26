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

const { ADMIN, TECHNICIAN, PARTNER } = require('../../conf/role');

// State interface
class TicketState {
  setContext(context) {
    this.context = context;
  }

  // print di tutti gli stati successivi
  printNext(state) {}

  // verifica se la transazione di stato è valida return true se non è valida return false
  handleAction(state) {}

  //verifica se l'utente è autorizzato ad effettuare quel cambiamento di stato return true, se non è autorizzato return false
  authorized(role) {}
}

// Stato APERTO
class OpenTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === ACCETTATO) {
      console.log(ACCETTATO);
      this.context.transitionTo(new AcceptedTicket());
    } else {
      // transizione di stato invalida
    }
  }

  handleAction(state) {
    if (state === ACCETTATO) {
      // transizione valisa
      return true;
    }
    // transizione di stato invalida
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato ACCETTATO
class AcceptedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === RITIRATO) {
      console.log(RITIRATO);
      this.context.transitionTo(new RetrivedTicket());
    } else if (state === IN_LAVORAZIONE) {
      console.log(IN_LAVORAZIONE);
      this.context.transitionTo(new InProgressTicket());
    }
  }

  handleAction(state) {
    if (state === RITIRATO) {
      // transizione valisa
      return true;
    } else if (state === IN_LAVORAZIONE) {
      // transizione di stato invalida
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato RITIRATO
class RetrivedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === IN_LAVORAZIONE) {
      console.log(IN_LAVORAZIONE);
      this.context.transitionTo(new InProgressTicket());
    }
  }

  handleAction(state) {
    if (state === IN_LAVORAZIONE) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato IN LAVORAZIONE
class InProgressTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === ATTESA_CONFERMA_PREVENTIVO) {
      console.log(ATTESA_CONFERMA_PREVENTIVO);
      this.context.transitionTo(new AwatingQuoteConfirmTicket());
    } else if (state === ANNULLATO) {
      console.log(ANNULLATO);
      this.context.transitionTo(new CancelledTicket());
    }
  }

  handleAction(state) {
    if (state === ATTESA_CONFERMA_PREVENTIVO) {
      return true;
    } else if (state === ANNULLATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato ATTESA CONFERMA PREVENTIVO
class AwatingQuoteConfirmTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === PREVENTIVO_ACCETTATO) {
      this.context.transitionTo(new QuoteAcceptedTicket());
      console.log(PREVENTIVO_ACCETTATO);
    } else if (state === PREVENTIVO_RIFIUTATO) {
      this.context.transitionTo(new QuoteRejectedTicket());
      console.log(PREVENTIVO_RIFIUTATO);
    }
  }

  handleAction(state) {
    if (state === PREVENTIVO_ACCETTATO) {
      return true;
    } else if (state === PREVENTIVO_RIFIUTATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([PARTNER].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato PREVENTIVO ACCETTATO
class QuoteAcceptedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === COMPLETATO) {
      this.context.transitionTo(new CompletedTicket());
      console.log(COMPLETATO);
    } else if (state === ATTESA_RICAMBIO) {
      this.context.transitionTo(new AwationgPartsTicket());
      console.log(ATTESA_RICAMBIO);
    }
  }

  handleAction(state) {
    if (state === COMPLETATO) {
      return true;
    } else if (state === ATTESA_RICAMBIO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato ATTESA RICAMBIO
class AwationgPartsTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === COMPLETATO) {
      this.context.transitionTo(new CompletedTicket());
      console.log(COMPLETATO);
    }
  }

  handleAction(state) {
    if (state === COMPLETATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato COMPLETATO
class CompletedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === IN_CONSEGNA_COMPLETATO) {
      this.context.transitionTo(new InDdeliveryCompletedTicket());
      console.log(IN_CONSEGNA_COMPLETATO);
    }
  }

  handleAction(state) {
    if (state === IN_CONSEGNA_COMPLETATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato IN CONSEGNA COMPLETATO
class InDdeliveryCompletedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    // stato finale pos
    console.log(IN_CONSEGNA_COMPLETATO);
  }

  handleAction(state) {
    return true;
  }

  authorized(role) {
    return true;
  }
}

// Stato ANNULLATO
class CancelledTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === IN_CONSEGNA_ANNULLATO) {
      this.context.transitionTo(new InDdeliveryCancelledTicket());
      console.log(IN_CONSEGNA_ANNULLATO);
    }
  }

  handleAction(state) {
    if (state === IN_CONSEGNA_ANNULLATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato IN CONSEGNA ANNULLATO
class InDdeliveryCancelledTicket extends TicketState {
  printNext(state) {
    // stato finale
    console.log('state: ' + state);
    console.log(IN_CONSEGNA_ANNULLATO);
  }

  handleAction(state) {
    return true;
  }

  authorized(role) {
    return true;
  }
}

// Stato PREVENTIVO RIFIUTATO
class QuoteRejectedTicket extends TicketState {
  printNext(state) {
    console.log('state: ' + state);
    if (state === IN_CONSEGNA_RIFIUTATO) {
      this.context.transitionTo(new InDdeliveryRejectedTicket());
      console.log(IN_CONSEGNA_RIFIUTATO);
    }
  }

  handleAction(state) {
    if (state === IN_CONSEGNA_RIFIUTATO) {
      return true;
    }
    return false;
  }

  authorized(role) {
    if ([ADMIN, TECHNICIAN].includes(role)) {
      return true;
    }
    return false;
  }
}

// Stato IN CONSEGNA RIFIUTATO
class InDdeliveryRejectedTicket extends TicketState {
  printNext(state) {
    // stato finale
    console.log('state: ' + state);
    console.log(IN_CONSEGNA_RIFIUTATO);
  }

  handleAction(state) {
    return true;
  }

  authorized(role) {
    return true;
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
};
