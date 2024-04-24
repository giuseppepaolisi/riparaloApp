const Service = require('../../models/service');

// si occupa della creazione di un dispositivo
const createDevice = async (req, res) => {
  const { modello, marca, servizi } = req.body;

  try {
    // Verifica la la validità di modello e marca
    if (!modello || modello.trim() === '') {
      throw new Error('Inserisci un nome modello valido.');
    }
    if (!marca || marca.trim() === '') {
      throw new Error('Inserisci una marca valida.');
    }

    // Controlla se esiste già lo stesso modello
    const existingDevice = await Service.findOne({ modello });
    if (existingDevice) {
      throw new Error('Questo dispoditivo è già stato inserito.');
    }

    // Verifica che l'array di servizi sia definito
    if (!servizi || !Array.isArray(servizi)) {
      throw new Error('Il campo servizi deve essere un array.');
    }

    // Verifica ogni elemento nell'array servizi
    servizi.forEach((servizio) => {
      if (!servizio.servizio || servizio.servizio.trim() === '') {
        throw new Error('Ogni servizio deve avere un nome valido.');
      }
      if (typeof servizio.prezzo !== 'number' || isNaN(servizio.prezzo)) {
        throw new Error('Ogni servizio deve avere un prezzo valido.');
      }
    });

    const device = await Service.create({ modello, marca, servizi });

    res.status(201).json({ device });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// restituisce un array di device con marca e modello
const getDevices = async (req, res) => {
  try {
    const devices = await Service.find({}, 'modello marca');

    res.status(200).json({ devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restiruisce un singolo device passando un id
const getDevice = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID dispositivo non valido');
    }

    const device = await Service.findById(id);

    if (!device) {
      throw new Error('Dispositivo non trovato');
    }

    res.status(200).json({ device });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Restituisce un array di marche
const getBrands = async (req, res) => {
  try {
    const uniqueBdrands = await Service.distinct('marca');

    res.status(200).json({ brands: uniqueBdrands });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ritorna un array di modelli per una determinata marca
const getModelsByBrand = async (req, res) => {
  const { brand } = req.params;

  try {
    const devices = await Service.find({ marca: brand }).distinct('modello');

    res.status(200).json({ modelli: devices });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  getBrands,
  getModelsByBrand,
};
