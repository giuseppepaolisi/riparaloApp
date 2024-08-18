const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { ADMIN, TECHNICIAN, PARTNER } = require('../conf/role');
const { ErrorResponse } = require('../middleware/errorManager');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email è richiesta'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Inserire un'email valida",
    },
  },
  password: {
    type: String,
    required: [true, 'Password è richiesta'],
    minlength: [8, 'La password deve avere almeno 8 caratteri'],
  },
  nome: {
    type: String,
    required: true,
  },
  cognome: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  ragioneSociale: {
    type: String,
    trim: true,
  },
  partitaIVA: {
    type: String,
    trim: true,
  },
  codiceUnivoco: {
    type: String,
    minlength: 7,
    maxlength: 7,
  },
  pec: {
    type: String,
    trim: true,
  },
  cap: {
    type: String,
    trim: true,
  },
  via: {
    type: String,
    trim: true,
  },
  provincia: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: [ADMIN, TECHNICIAN, PARTNER],
    lowercase: true,
  },
});

// Metodo statico per la registrazione di un Partner
userSchema.statics.signup = async function (newuser, next) {
  // controlla se l'email è già in uso
  const exists = await this.findOne({ email: newuser.email });
  if (exists) {
    return next(new ErrorResponse('Email già utilizzata', 400));
  }
  const salt = await bcrypt.genSalt(10); // Genera una stringa casuale
  const hash = await bcrypt.hash(newuser.password, salt); // Combina la stringa casuale con la password

  newuser.password = hash;
  const user = await this.create(newuser);

  return user;
};

// Metodo statico di login
userSchema.statics.login = async function (email, password, next) {
  const user = await this.findOne({ email });

  // verifica se l'email esiste nel db
  if (!user) {
    return next(new ErrorResponse('Email non trovata', 400));
  }

  // Verifica delle password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new ErrorResponse('Password errata', 400));
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
