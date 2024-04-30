const { deleteTicket } = require('../ticket');
const Ticket = require('../../../models/ticket');
const { PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');
// npm test -- src/controllers/ticketController/tests/

jest.mock('../../../models/ticket');

// TEST deleteTicket
describe('deleteTicket', () => {
  let mockReq, mockRes, mockNext, mockTicket;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
      user: {
        _id: '123456',
        role: PARTNER,
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockTicket = {
      _id: '507f1f77bcf86cd799439011',
      stato: 'Aperto',
      id_partner: '123456',
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
    Ticket.findOne = jest.fn();
    Ticket.findByIdAndDelete = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Ticket eliminato con successo', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Ticket.findOne.mockResolvedValue(mockTicket);
    Ticket.findByIdAndDelete.mockResolvedValue(mockTicket);
    await deleteTicket(mockReq, mockRes, mockNext);

    expect(Ticket.findByIdAndDelete).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ result: mockTicket });
  });

  it('ERROR - ID non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await deleteTicket(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - Ticket non trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Ticket.findOne.mockResolvedValue();

    await deleteTicket(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('Ticket non trovato');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
  });

  it('ERROR - Ticket stato avanzato', async () => {
    mockTicket.stato = 'Accettato';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Ticket.findOne.mockResolvedValue(mockTicket);

    await deleteTicket(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'Non puoi eliminare un ticket in uno stato avanzato'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
});
