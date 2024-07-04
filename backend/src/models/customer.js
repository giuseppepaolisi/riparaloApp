const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Inserire un indirizzo email valido'],
  },
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio'],
  },
  cognome: {
    type: String,
    required: [true, 'Il cognome è obbligatorio'],
  },
  telefono: {
    type: String,
    required: [true, 'Il numero di telefono è obbligatorio'],
  },
  partner: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
