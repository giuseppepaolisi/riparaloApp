const { updateDevice } = require('../device');
const Service = require('../../../models/service');
const { ErrorResponse } = require('../../../middleware/errorManager');
const mongoose = require('mongoose');
const { ADMIN } = require('../../../conf/role');
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
      ],
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
    Service.findByIdAndUpdate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Device aggiornato con marca e modello', async () => {
    mockReq.body.modello = 'Iphone 13';
    mockReq.body.marca = 'Apple';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findByIdAndUpdate.mockResolvedValue(mockDevice);
    await updateDevice(mockReq, mockRes, mockNext);

    expect(Service.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ device: mockDevice });
  });

  it('SUCCESS - Device aggiornato con marca', async () => {
    mockReq.body.marca = 'Apple';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findByIdAndUpdate.mockResolvedValue(mockDevice);
    await updateDevice(mockReq, mockRes, mockNext);

    expect(Service.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ device: mockDevice });
  });

  it('SUCCESS - Device aggiornato con modello', async () => {
    mockReq.body.modello = 'Iphone 13';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    Service.findByIdAndUpdate.mockResolvedValue(mockDevice);
    await updateDevice(mockReq, mockRes, mockNext);

    expect(Service.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ device: mockDevice });
  });

  it('ERROR - ID device non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await updateDevice(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
});
