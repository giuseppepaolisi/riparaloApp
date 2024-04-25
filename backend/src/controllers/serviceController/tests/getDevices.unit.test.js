const { getDevices } = require('../device');
const Service = require('../../../models/service');
const mongoose = require('mongoose');

// Mock di Service e delle sue funzioni
jest.mock('../../../models/service');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// TEST getDevices
describe('getDevices', () => {
  let res, next;

  // Pulisce i mock dopo ogni test
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('restituire tutti i dispositivi con solo modello e marca', async () => {
    const mockDevices = [
      { modello: 'ModelloX', marca: 'MarcaX' },
      { modello: 'ModelloY', marca: 'MarcaY' },
    ];
    Service.find.mockResolvedValue(mockDevices);

    await getDevices(null, res, next);

    expect(Service.find).toHaveBeenCalledWith({}, 'modello marca');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ devices: mockDevices });
  });

  it('errori in caso di fallimento del database', async () => {
    const errorMessage = 'Database failure';
    Service.find.mockRejectedValue(new Error(errorMessage));

    await getDevices(null, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
