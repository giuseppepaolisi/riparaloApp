const Service = require('../../models/service');
const { ErrorResponse } = require('../../middleware/errorManager');
const mongoose = require('mongoose');
const { ADMIN } = require('../../conf/role');
// si occupa della creazione di un dispositivo
const createDevice = async (req, res, next) => {
  const { modello, marca, servizi } = req.body;

  try {
    // Verifica la validità di modello e marca
    if (!modello || modello.trim() === '') {
      return next(new ErrorResponse('Inserisci un nome modello valido.', 400));
    }
    if (!marca || marca.trim() === '') {
      return next(new ErrorResponse('Inserisci una marca valida.', 400));
    }

    // Verifica che l'array di servizi sia definito
    if (!servizi || !Array.isArray(servizi)) {
      return next(
        new ErrorResponse('Il campo servizi deve essere un array.', 400)
      );
    }

    // Verifica ogni elemento nell'array servizi
    for (const servizio of servizi) {
      if (!servizio.servizio || servizio.servizio.trim() === '') {
        return next(
          new ErrorResponse('Ogni servizio deve avere un nome valido.', 400)
        );
      }
      if (typeof servizio.prezzo !== 'number' || isNaN(servizio.prezzo)) {
        return next(
          new ErrorResponse('Ogni servizio deve avere un prezzo valido.', 400)
        );
      }
    }

    // Controlla se esiste già lo stesso modello
    const existingDevice = await Service.findOne({ modello });
    if (existingDevice) {
      return next(
        new ErrorResponse('Questo dispoditivo è già stato inserito.', 400)
      );
    }

    const device = await Service.create({ modello, marca, servizi });
    res.status(201).json({ device });
  } catch (error) {
    next(error);
  }
};

// restituisce un array di device con marca e modello
const getDevices = async (req, res, next) => {
  try {
    const devices = await Service.find({}, 'modello marca');

    res.status(200).json({ devices });
  } catch (error) {
    next(error);
  }
};

// Restiruisce un singolo device passando un id
const getDevice = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID dispositivo non valido', 400));
    }
    const device = await Service.findById(id);

    if (!device) {
      return next(new ErrorResponse('Dispositivo non trovato', 404));
    }

    res.status(200).json({ device });
  } catch (error) {
    next(error);
  }
};

// Restituisce un array di marche
const getBrands = async (req, res, next) => {
  try {
    const uniqueBdrands = await Service.distinct('marca');

    res.status(200).json({ brands: uniqueBdrands });
  } catch (error) {
    next(error);
  }
};

// Ritorna un array di modelli per una determinata marca
const getModelsByBrand = async (req, res, next) => {
  const { brand } = req.params;

  try {
    const devices = await Service.find({ marca: brand }).distinct('modello');

    res.status(200).json({ modelli: devices });
  } catch (error) {
    next(error);
  }
};

// Eliminazione di un device
const deleteDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorResponse('ID non valido', 400);
    }
    const device = await Service.findOne({ _id: id });
    if (!device) {
      throw new ErrorResponse('Dispositivo non trovato', 404);
    }
    const result = await Service.findByIdAndDelete(device);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// Aggiorna solo non e marca di un dispositivo
const updateDevice = async (req, res, next) => {
  const { marca, modello, servizi } = req.body;
  const { id } = req.params;
  const data = {};

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorResponse('ID non valido', 400);
    }

    // modello !== undefined e non vuoto
    if (modello && modello.trim() !== '') {
      data.modello = modello.trim().toLowerCase();
    }
    if (marca && marca.trim() !== '') {
      data.marca = marca.trim().toLowerCase();
    }

    let device = await Service.findById(id);
    if (!device) {
      return next(new ErrorResponse('Dispositivo non trovato', 404));
    }

    // Verifica e aggiorna i servizi esistenti
    if (servizi && Array.isArray(servizi)) {
      const uniqueServices = new Set();
      for (const service of servizi) {
        const serviceName = service.servizio.trim().toLowerCase();
        const servicePrice = Number(service.prezzo);

        if (!serviceName) {
          return next(
            new ErrorResponse('Ogni servizio deve avere un nome valido.', 400)
          );
        }
        if (isNaN(servicePrice)) {
          return next(
            new ErrorResponse('Ogni servizio deve avere un prezzo valido.', 400)
          );
        }
        if (uniqueServices.has(serviceName)) {
          return next(
            new ErrorResponse(
              `Il servizio "${service.servizio}" è duplicato.`,
              400
            )
          );
        }
        uniqueServices.add(serviceName);
      }
      data.servizi = servizi.map((service) => ({
        servizio: service.servizio.trim().toLowerCase(),
        prezzo: Number(service.prezzo),
      }));
    }

    // Aggiorna il dispositivo con i nuovi dati
    device = await Service.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ device });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  getBrands,
  getModelsByBrand,
  deleteDevice,
  updateDevice,
};
