const Service = require('../../models/service');
const { ErrorResponse } = require('../../middleware/errorManager');
const mongoose = require('mongoose');

// Ritorna la lisat di servizi passato un modello
const getServicesByDevice = async (req, res, next) => {
  const { device } = req.params;

  try {
    const deviceData = await Service.findOne({ modello: device });

    if (!deviceData) {
      return next(new ErrorResponse('Dispositivo non trovato', 404));
    }

    res.status(200).json({ servizi: deviceData.servizi });
  } catch (error) {
    next(error);
  }
};

// Aggiunge dei servizi a quelli già presenti
const addServices = async (req, res, next) => {
  const { id } = req.params;
  // Array di servizi
  const { newServices } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID non valido', 400));
    }
    let device = await Service.findById({ _id: id });
    if (!device) {
      return next(new ErrorResponse('Dispositivo non trovato', 404));
    }

    for (const service of newServices) {
      if (!service.servizio || service.servizio.trim() === '') {
        return next(
          new ErrorResponse('Ogni servizio deve avere un nome valido.', 400)
        );
      }
      if (typeof service.prezzo !== 'number' || isNaN(service.prezzo)) {
        return next(
          new ErrorResponse('Ogni servizio deve avere un prezzo valido.', 400)
        );
      }
    }

    device.servizi.push(...newServices);

    device = await device.save();

    res.status(200).json({ device });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServicesByDevice, addServices };
