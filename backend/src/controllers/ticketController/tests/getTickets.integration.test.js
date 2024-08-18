const Ticket = require('../../../models/ticket');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { PARTNER } = require('../../../conf/role');
const { getTickets } = require('../ticket');
const { APERTO } = require('../../../conf/state');
// npm test -- src/controllers/ticketController/tests/

// mock del model
jest.mock('../../../models/ticket', () => ({
  find: jest.fn(() => ({
    sort: jest.fn().mockResolvedValue([]),
  })),
}));

describe('TEST getTickets', () => {
  let mockReq, mockRes, mockNext, mockTicket1, mockTicket2;

  beforeEach(() => {
    mockReq = {
      user: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockTicket1 = {
      id_partner: '601c546d4d3f8b2f243d58e6',
      telefono_partner: '+39 098 765 4321',
      ragione_sociale: 'Tech Repair S.r.l.',
      partita_iva: 'IT12345678901',
      codiceUnivoco: 'XYZ123ABC',
      pec: 'info@techrepair.it',
      cap: '00100',
      via: 'Via delle Tecnologie, 10',
      provincia: 'Roma',
      nome_cliente: 'Marco',
      cognome_cliente: 'Bianchi',
      telefono_cliente: '+39 012 345 6789',
      descrizione_problema: 'Il display non risponde agli input touch.',
      marca: 'SuperTech',
      modello: 'TouchX2000',
      servizi: [
        {
          problema: 'Sostituzione display',
          prezzo: 120,
        },
        {
          problema: 'Calibrazione sensore',
          prezzo: 30,
        },
      ],
      prezzo_stimato: 150,
      stato: 'Aperto',
      storico_stato: [
        {
          stato: 'Aperto',
          data: new Date('2024-04-27T12:00:00Z'),
        },
      ],
      createdAt: new Date('2024-04-27T12:00:00Z'),
    };
    mockTicket2 = {
      id_partner: '601c546d4d3f8b2f243d58e6',
      telefono_partner: '+39 098 765 4321',
      ragione_sociale: 'Tech Repair S.r.l.',
      partita_iva: 'IT12345678901',
      codiceUnivoco: 'XYZ123ABC',
      pec: 'info@techrepair.it',
      cap: '00100',
      via: 'Via delle Tecnologie, 10',
      provincia: 'Roma',
      nome_cliente: 'Luigi',
      cognome_cliente: 'Rossi',
      telefono_cliente: '+39 012 345 6789',
      descrizione_problema: 'Batteria non si carica.',
      marca: 'SuperTech',
      modello: 'PowerX3000',
      servizi: [
        {
          problema: 'Sostituzione batteria',
          prezzo: 80,
        },
      ],
      prezzo_stimato: 80,
      stato: 'Aperto',
      storico_stato: [
        {
          stato: 'Aperto',
          data: new Date('2024-05-01T12:00:00Z'),
        },
      ],
      createdAt: new Date('2024-05-01T12:00:00Z'),
    };
    mockUser = {
      _id: '601c546d4d3f8b2f243d58e6',
      ragioneSociale: 'Tech Repair S.r.l.',
      partitaIVA: 'IT12345678901',
      codiceUnivoco: 'XYZ123ABC',
      telefono: '+39 098 765 4321',
      pec: 'info@techrepair.it',
      cap: '00100',
      via: 'Via delle Tecnologie, 10',
      provincia: 'Roma',
      role: PARTNER,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Lista di tutti i ticket di un utente admin / tecnico', async () => {
    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue([mockTicket2, mockTicket1]), // Array di ticket ordinato per data decrescente
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalledWith({});
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      tickets: [mockTicket2, mockTicket1],
    });
  });

  it('SUCCESS - Lista di tutti i ticket di un utente admin / tecnico impostando come filtro stato Aperto', async () => {
    mockReq.params.state = APERTO;

    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue([mockTicket2, mockTicket1]), // Array di ticket ordinato per data decrescente
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalledWith({ stato: APERTO });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      tickets: [mockTicket2, mockTicket1],
    });
  });

  it('SUCCESS - Lista di tutti i ticket di un utente Partner passando il suo id impostando come filtro stato Aperto', async () => {
    mockReq.params.state = APERTO;
    mockReq.user.role = PARTNER;
    mockReq.user._id = '601c546d4d3f8b2f243d58e6';

    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue([mockTicket2, mockTicket1]), // Array di ticket ordinato per data decrescente
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalledWith({
      id_partner: '601c546d4d3f8b2f243d58e6',
      stato: APERTO,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      tickets: [mockTicket2, mockTicket1],
    });
  });

  it('SUCCESS - Lista di tutti i ticket di un utente Partner passando il suo id senza impostare un filtro', async () => {
    mockReq.user.role = PARTNER;
    mockReq.user._id = '601c546d4d3f8b2f243d58e6';

    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue([mockTicket2, mockTicket1]), // Array di ticket ordinato per data decrescente
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalledWith({
      id_partner: '601c546d4d3f8b2f243d58e6',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      tickets: [mockTicket2, mockTicket1],
    });
  });

  it('SUCCESS - Lista VUOTA di un utente Partner passando il suo id senza impostare un filtro', async () => {
    mockReq.user.role = PARTNER;
    mockReq.user._id = '';

    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue([]), // Array di ticket vuoto
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalledWith({ id_partner: '' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      tickets: [],
    });
  });

  it("gestisce l'errore quando la ricerca dei ticket fallisce", async () => {
    const expectedError = new Error('Errore durante la ricerca dei tickets');
    Ticket.find.mockImplementationOnce(() => ({
      sort: jest.fn().mockRejectedValue(expectedError),
    }));

    await getTickets(mockReq, mockRes, mockNext);

    expect(Ticket.find).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(expectedError); // Verifica che next() sia stato chiamato con l'errore
  });
});
