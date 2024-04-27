const Ticket = require('../../../models/ticket');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { PARTNER } = require('../../../conf/role');
const { getTicket } = require('../ticket');
const { APERTO } = require('../../../conf/state');
// npm test -- src/controllers/ticketController/tests/

// mock del model
jest.mock('../../../models/ticket', () => ({
  findOne: jest.fn(),
}));

describe('TEST getTicket', () => {
  let mockReq, mockRes, mockNext, mockTicket;

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
    mockTicket = {
      _id: '123456',
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

  it('SUCCESS - Ticket di un utente admin / tecnico', async () => {
    mockReq.params.id = '123456';
    Ticket.findOne.mockResolvedValue(mockTicket);
    await getTicket(mockReq, mockRes, mockNext);

    expect(Ticket.findOne).toHaveBeenCalledWith({ _id: '123456' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ ticket: mockTicket });
  });

  it('SUCCESS - Ticket di un utente Partner', async () => {
    mockReq.params.id = '123456';
    mockReq.user.role = PARTNER;
    mockReq.user._id = '601c546d4d3f8b2f243d58e6';

    Ticket.findOne.mockResolvedValue(mockTicket);
    await getTicket(mockReq, mockRes, mockNext);

    expect(Ticket.findOne).toHaveBeenCalledWith({
      _id: '123456',
      id_partner: '601c546d4d3f8b2f243d58e6',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ ticket: mockTicket });
  });

  it("ERROR - retrieve senza passare l'id", async () => {
    mockReq.params.id = '';
    await getTicket(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it("gestisce l'errore quando la ricerca dei ticket fallisce", async () => {
    const expectedError = new Error('Errore durante la ricerca dei tickets');
    Ticket.findOne.mockRejectedValue(expectedError);
    mockReq.params.id = '123456';

    await getTicket(mockReq, mockRes, mockNext);

    expect(Ticket.findOne).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(expectedError);
  });
});
