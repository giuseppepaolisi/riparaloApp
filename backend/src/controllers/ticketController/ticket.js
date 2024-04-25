const Ticket = require('../../models/ticket');
const User = require('../../models/user');
const { ErrorResponse } = require('../../middleware/errorManager');
const { PARTNER } = require('../../conf/role');
const { APERTO } = require('../../conf/state');

// Permette la creazione di un ticket
const openTicket = async (req, res, next) => {
  const {
    // dati cliente
    nomeCliente,
    cognomeCliente,
    telefonoCliente,
    // desctizione inserita dal tecnico
    descrizioneProblema,
    // dati dispositivo
    marcaDispositivo,
    modelloDispositivo,
    problemiSelezionati, // array di oggetti { problema, prezzo }
  } = req.body;

  // Calcola il totale stimato
  const totaleStimato = problemiSelezionati.reduce(
    (total, item) => total + item.prezzo,
    0
  );

  // recupero id del partner
  const idPartner = req.user_id;

  try {
    // recupero dati partner
    const partner = await User.findById({ _id: idPartner });
    if (!partner) {
      return next(new ErrorResponse('Partner non trovato', 404));
    }

    // Creazione del nuovo ticket
    const newTicket = new Ticket({
      // dati partner
      id_partner: partner._id,
      telefono_partner: partner.telefono,
      ragione_sociale: partner.ragioneSociale,
      partita_iva: partner.partitaIVA,
      codiceUnivoco: partner.codiceUnivoco,
      pec: partner.pec,
      cap: partner.cap,
      via: partner.via,
      provincia: partner.provincia,
      // dati cliente
      nome_cliente: nomeCliente,
      cognome_cliente: cognomeCliente,
      telefono_cliente: telefonoCliente,
      // descrizione del problema
      descrizione_problema: descrizioneProblema,
      // dati dispositivo
      marca: marcaDispositivo,
      modello: modelloDispositivo,
      servizi: problemiSelezionati, // Array
      // prezzo stimato calcolato
      prezzo_stimato: totaleStimato,
      stato: APERTO,
      storico_stato: [
        {
          stato: APERTO,
          data: new Date(),
          tecnico: '', // Campo vuoto per il tecnico
        },
      ],
    });

    await newTicket.save();
    res.status(201).json({ newTicket });
  } catch (error) {
    next(error);
  }
};

// ritorna la lista di ticket
const getTickets = async (req, res, next) => {
  let filters = {};

  // aggiungi un filsìtro se si tratta di un partner
  if (req.user.role === PARTNER) {
    filters = { id_partner: req.user._id };
  }

  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

// ritorna un singolo ticket passato un id
const getTicket = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tickets = await Ticket.find({ _id: id });
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  openTicket,
  getTickets,
  getTicket,
};
