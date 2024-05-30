const mongoose = require('mongoose');
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

// Schema per storico stato
const storicoStatoSchema = new mongoose.Schema(
  {
    stato: {
      type: String,
      required: true,
    },
    data: {
      type: Date,
      default: Date.now,
    },
    tecnico: {
      type: String,
    },
  },
  { _id: false }
);

// Schema per servizi
const servizioSchema = new mongoose.Schema(
  {
    servizio: {
      type: String,
      required: true,
    },
    prezzo: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Schema principale per Ticket
const ticketSchema = new mongoose.Schema({
  id_partner: {
    type: String,
    required: true,
  },
  telefono_partner: {
    type: String,
    required: true,
  },
  ragione_sociale: {
    type: String,
    required: true,
  },
  partita_iva: {
    type: String,
    required: true,
  },
  codiceUnivoco: {
    type: String,
    required: true,
  },
  pec: {
    type: String,
  },
  cap: {
    type: String,
    required: true,
  },
  via: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  nome_cliente: {
    type: String,
    required: true,
  },
  cognome_cliente: {
    type: String,
    required: true,
  },
  telefono_cliente: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  modello: {
    type: String,
    required: true,
  },
  descrizione_problema: {
    type: String,
    required: true,
  },
  descrizione_tecnica: {
    type: String,
  },
  stato: {
    type: String,
    required: true,
    enum: [
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
    ],
  },
  storico_stato: [storicoStatoSchema],
  servizi: [servizioSchema],
  prezzo_stimato: {
    type: Number,
  },
  prezzo: {
    type: Number,
  },
  acconto: {
    type: Number,
  },
  imie: {
    type: String,
  },
  pin: {
    type: String,
  },
  seriale: {
    type: String,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
