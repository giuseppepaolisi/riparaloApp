const Ticket = require('../../../models/ticket');
const User = require('../../../models/user');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { PARTNER } = require('../../../conf/role');
const { openTicket } = require('../ticket');

// npm test -- src/controllers/ticketController/tests/
// mock del model
/*jest.mock('../../../models/ticket', () => {
    return jest.fn().mockImplementation((data) => {
        return {
            ...data,  // Espandi i dati passati per tenere traccia di cosa viene creato
            save: jest.fn().mockResolvedValue(data)  // Mock del metodo save
        };
    });
});*/

// Mock global Date
const FIXED_DATE = new Date('2024-04-27T12:00:00Z'); // Un valore costante
jest.mock('../../../models/ticket', () => {
  return jest.fn().mockImplementation((data) => {
    return {
      ...data, // Espandi i dati passati per tenere traccia di cosa viene creato
      save: jest.fn().mockResolvedValue(data), // Mock del metodo save
    };
  });
});

jest.mock('../../../models/user', () => ({
  findById: jest.fn(),
}));

describe('TEST openTicket', () => {
  let mockReq, mockRes, mockNext, mockTicket, mockUser;

  beforeEach(() => {
    mockReq = {
      user: {
        _id: '601c546d4d3f8b2f243d58e6',
      },
      body: {
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
        acconto: 20,
        pin: '12345',
        imei: '123456789',
        seriale: '12334',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockTicket = {
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
      acconto: 20,
      pin: '12345',
      imei: '123456789',
      seriale: '12334',
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
    jest.spyOn(global, 'Date').mockImplementation(() => FIXED_DATE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tutti i dati sono inseriti con successo
  it('SUCCESS - Tutti i dati sono inseriti con successo', async () => {
    User.findById.mockResolvedValue(mockUser);

    await openTicket(mockReq, mockRes, mockNext);

    expect(mockRes.status).not.toHaveBeenCalledWith(400);
    expect(mockRes.status).not.toHaveBeenCalledWith(404);
    expect(User.findById).toHaveBeenCalledWith({
      _id: '601c546d4d3f8b2f243d58e6',
    });
    expect(Ticket).toHaveBeenCalledWith(expect.objectContaining(mockTicket));
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      ticket: expect.objectContaining(mockTicket),
    });
  });
});
