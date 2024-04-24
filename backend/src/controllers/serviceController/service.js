const Service = require('../../models/service');

// Ritorna la lisat di servizi passato un modello
const getServicesByDevice = async (req, res) => {
  const { device } = req.params;

  try {
    const deviceData = await Service.findOne({ modello: device });

    if (!deviceData) {
      throw new Error('Dispositivo non trovato');
    }

    res.status(200).json({ servizi: deviceData.servizi });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getServicesByDevice };
