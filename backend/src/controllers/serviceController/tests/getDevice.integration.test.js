const { getDevice } = require('../device');
const Service = require('../../../models/service');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');
// npm test -- src/controllers/serviceController/tests/

jest.mock('../../../models/service');

describe('getDevice', () => {
  let mockReq, mockRes, mockNext, mockDevice;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockDevice = {
      _id: '507f1f77bcf86cd799439011',
      marca: 'Apple',
      modello: 'Iphone 13',
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
    Service.findById = jest.fn();
  });

  it('SUCCESS - Device restituito con successo', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findById.mockResolvedValue(mockDevice);
    await getDevice(mockReq, mockRes, mockNext);

    expect(Service.findById).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ device: mockDevice });
  });

  it('ERROR - ID non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await getDevice(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'ID dispositivo non valido'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - Dispositivo non trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findById.mockResolvedValue();
    await getDevice(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'Dispositivo non trovato'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
  });
});
