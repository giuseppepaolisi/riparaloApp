const { TicketContext } = require('./ticketContext');

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

let context = new TicketContext(new OpenTicket());
context.print(ACCETTATO);
context.print(RITIRATO);
context.print(IN_LAVORAZIONE);
context.print(ATTESA_CONFERMA_PREVENTIVO);
context.print(PREVENTIVO_ACCETTATO);
context.print(COMPLETATO);
context.print(IN_CONSEGNA_COMPLETATO);
