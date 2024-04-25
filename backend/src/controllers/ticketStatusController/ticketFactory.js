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

const {
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
} = require('./ticketState');

function ticketFactory(status) {
  switch (status) {
    case APERTO:
      return new OpenTicket();
    case ACCETTATO:
      return new AcceptedTicket();
    case RITIRATO:
      return new RetrivedTicket();
    case IN_LAVORAZIONE:
      return new InProgressTicket();
    case ATTESA_CONFERMA_PREVENTIVO:
      return new AwatingQuoteConfirmTicket();
    case PREVENTIVO_ACCETTATO:
      return new QuoteAcceptedTicket();
    case PREVENTIVO_RIFIUTATO:
      return new QuoteRejectedTicket();
    case COMPLETATO:
      return new CompletedTicket();
    case ANNULLATO:
      return new CancelledTicket();
    case ATTESA_RICAMBIO:
      return new AwationgPartsTicket();
    case IN_CONSEGNA_COMPLETATO:
      return new InDdeliveryCompletedTicket();
    case IN_CONSEGNA_ANNULLATO:
      return new InDdeliveryCancelledTicket();
    case IN_CONSEGNA_RIFIUTATO:
      return new InDdeliveryRejectedTicket();
    default:
      throw new Error('Status non valido');
  }
}

module.exports = {
  ticketFactory,
};
