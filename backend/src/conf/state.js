// Stati possibili per un ticket

const APERTO = 'Aperto';
const ACCETTATO = 'Accettato';
const RITIRATO = 'Ritirato';
const IN_LAVORAZIONE = 'In lavorazione';
const ATTESA_CONFERMA_PREVENTIVO = 'Attesa conferma preventivo';
const PREVENTIVO_ACCETTATO = 'Preventivo accettato';
const PREVENTIVO_RIFIUTATO = 'Preventivo rifiutato';
const COMPLETATO = 'Completato';
const ANNULLATO = 'Annullato';
const ATTESA_RICAMBIO = 'Attesa ricambio';
const IN_CONSEGNA_COMPLETATO = 'In consegna - completato';
const IN_CONSEGNA_ANNULLATO = 'In consegna - annullato';
const IN_CONSEGNA_RIFIUTATO = 'In consegna - rifiutato';

module.exports = {
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
  IN_CONSEGNA_RIFIUTATO
};