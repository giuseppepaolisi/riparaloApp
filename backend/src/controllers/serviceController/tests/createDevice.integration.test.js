const { createDevice } = require('../device');
const Service = require('../../../models/service');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');

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
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
  });

  it('crea un dispositivo con successo', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };
    Service.findOne.mockResolvedValue(null);
    Service.create.mockResolvedValue({
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    });

    await createDevice(req, res, next);

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
    Service.findOne.mockResolvedValue(true);

    await createDevice(req, res, next);

    expect(Service.findOne).toHaveBeenCalledWith({ modello: 'ModelloX' });
    expect(next).toHaveBeenCalledWith(
      new ErrorResponse('Questo dispoditivo è già stato inserito.', 400)
    );
  });

  it('nome modello non valido', async () => {
    req.body = {
      modello: '',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };

    await createDevice(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ErrorResponse('Inserisci un nome modello valido.', 400)
    );
  });

  it('marca non valida', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: '',
      servizi: [{ servizio: 'Riparazione', prezzo: 100 }],
    };

    await createDevice(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ErrorResponse('Inserisci una marca valida.', 400)
    );
  });

  it('array di servizi non valido', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: 'non un array',
    };

    await createDevice(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ErrorResponse('Il campo servizi deve essere un array.', 400)
    );
  });

  it('prezzo del servizio non valido', async () => {
    req.body = {
      modello: 'ModelloX',
      marca: 'MarcaX',
      servizi: [{ servizio: 'Riparazione', prezzo: 'cento' }],
    };

    await createDevice(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ErrorResponse('Ogni servizio deve avere un prezzo valido.', 400)
    );
  });
});
