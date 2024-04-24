const mongoose = require('mongoose');

// Schema per l'array di servizi interno
const servizioSchema = new mongoose.Schema({
  servizio: {
    type: String,
    required: true,
    lowercase: true
  },
  prezzo: {
    type: Number,
    required: true
  }
});

// Schema principale
const serviceSchema = new mongoose.Schema({
  modello: {
    type: String,
    required: true,
    lowercase: true
  },
  marca: {
    type: String,
    required: true,
    lowercase: true
  },
  servizi: [servizioSchema]
});

// Creazione del modello Mongoose
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
