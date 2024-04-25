const Service = require('../../models/service');
const { ErrorResponse } = require('../../middleware/errorManager');

// Ritorna la lisat di servizi passato un modello
const getServicesByDevice = async (req, res, next) => {
  const { device } = req.params;

  try {
    const deviceData = await Service.findOne({ modello: device });

    if (!deviceData) {
      return next(new ErrorResponse('Dispositivo non trovato', 400));
    }

    res.status(200).json({ servizi: deviceData.servizi });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServicesByDevice };
