const Service = require('../../../models/service');
const { ErrorResponse } = require('../../../middleware/errorManager');
const mongoose = require('mongoose');
const { ADMIN } = require('../../../conf/role');
const { deleteDevice } = require('../device');
// npm test -- src/controllers/serviceController/tests/

jest.mock('../../../models/service');

describe('deleteDevice', () => {
  let mockReq, mockRes, mockNext, mockDevice;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
      user: {
        _id: '123456',
        role: ADMIN,
      },
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
      ],
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
    Service.findOne = jest.fn();
    Service.findByIdAndDelete = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Device eliminato con successo', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findOne.mockResolvedValue(mockDevice);
    Service.findByIdAndDelete.mockResolvedValue(mockDevice);
    await deleteDevice(mockReq, mockRes, mockNext);

    expect(Service.findByIdAndDelete).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ result: mockDevice });
  });

  it('ERROR - ID device non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await deleteDevice(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - Dispositivo non trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findOne.mockResolvedValue();

    await deleteDevice(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'Dispositivo non trovato'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
  });
});
