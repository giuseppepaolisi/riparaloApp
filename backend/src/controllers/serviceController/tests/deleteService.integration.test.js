const Service = require('../../../models/service');
const { ErrorResponse } = require('../../../middleware/errorManager');
const mongoose = require('mongoose');
const { deleteService } = require('../service');
// npm test -- src/controllers/serviceController/tests/

jest.mock('../../../models/service', () => ({
  findById: jest.fn(),
  save: jest.fn(),
}));

describe('deleteService', () => {
  let mockReq, mockRes, mockNext, mockDevice;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockDevice = {
      _id: '507f1f77bcf86cd799439011',
      modello: 'Iphone 13',
      marca: 'Apple',
      servizi: [
        {
          servizio: 'cambio schermo',
          prezzo: 80,
        },
        {
          servizio: 'cambio batteria',
          prezzo: 60,
        },
        {
          servizio: 'sostituzione casse',
          prezzo: 120,
        },
      ],
      save: jest.fn().mockImplementation(function () {
        return Promise.resolve(this); // Simula il salvataggio e ritorna il ticket modificato
      }),
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Servizi aggiunti con successo', async () => {
    mockReq.body.service = {
      servizio: 'sostituzione casse',
      prezzo: 120,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findById.mockResolvedValue(mockDevice);
    mockDevice.save.mockResolvedValue(mockDevice);
    await deleteService(mockReq, mockRes, mockNext);

    expect(Service.findById).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ device: mockDevice });
  });

  it('ERROR - ID device non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await deleteService(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - Dispositivo non trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findById.mockResolvedValue();

    await deleteService(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'Dispositivo non trovato'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
  });
});
