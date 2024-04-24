const { createDevice, getDevices } = require('../device');
const Service = require('../../../models/service');
const mongoose = require('mongoose');

// Mock di Service e delle sue funzioni
jest.mock('../../../models/service');

// Setup di base per i test
const mockRequest = (body = {}) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// TEST createDevice
describe('createDevice', () => {
  let req, res;

  // Pulisce i mock dopo ogni test
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  it('crea un dispositivo con successo', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };
    Service.findOne.mockResolvedValue(null);
    Service.create.mockResolvedValue(req.body);

    await createDevice(req, res);

    expect(Service.findOne).toHaveBeenCalledWith({ modello: 'ModelloX' });
    expect(Service.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ device: req.body });
  });

  it('dispositivo già esistente', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };
    Service.findOne.mockResolvedValue(req.body);

    await createDevice(req, res);

    expect(Service.findOne).toHaveBeenCalledWith({ modello: 'ModelloX' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Questo dispoditivo è già stato inserito.',
    });
  });

  it('nome mdello non valido', async () => {
    req.body = {
      modello: '',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };

    await createDevice(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Inserisci un nome modello valido.',
    });
  });

  it('marca non valida', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: '',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };

    await createDevice(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Inserisci una marca valida.',
    });
  });

  it('array di servizi non valido', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: 'non un array',
    };
    Service.findOne.mockResolvedValue(null);
    await createDevice(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Il campo servizi deve essere un array.',
    });
  });

  it('prezzo del servizio non valido', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 'cento' }],
    };

    Service.findOne.mockResolvedValue(null);
    await createDevice(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Ogni servizio deve avere un prezzo valido.',
    });
  });
});
