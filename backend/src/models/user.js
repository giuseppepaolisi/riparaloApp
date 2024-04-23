const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {ADMIN, TECHNICIAN, PARTNER} = require('../conf/role');

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
        message: 'Inserire un\'email valida'
      }
    },
    password: {
      type: String,
      required: [true, 'Password è richiesta'],
      minlength: [8, 'La password deve avere almeno 8 caratteri']
    },
    nome: {
      type: String,
      required: true,
      trim: true
    },
    cognome: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      trim: true
    },
    ragioneSociale: {
      type: String,
      trim: true
    },
    partitaIVA: {
      type: String,
      trim: true
    },
    codiceUnivoco: {
      type: String,
      minlength: 6,
      maxlength: 6
    },
    pec: {
      type: String,
      trim: true
    },
    cap: {
      type: String,
      trim: true
    },
    via: {
      type: String,
      trim: true
    },
    provincia: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: [ADMIN, TECHNICIAN, PARTNER],
      lowercase: true,
    }
  });

// Metodo statico per la registrazione di un Partner
userSchema.statics.signupPartner = async function(newuser) {
    const {
        email,
        password,
        nome,
        cognome,
        telefono,
        ragioneSociale,
        partitaIVA,
        codiceUnivoco,
        pec,
        cap,
        via,
        provincia
    } = newuser;
    
    // controlla se la password rispetta la lunghezza minima
    if (password.length < 8) {
        throw Error('La password deve avere almeno 8 caratteri');
    }
    
    // controlla se l'email è già in uso
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email già utilizzata');
    }

    // Controlla la lunghezza del codice univoco
    if (codiceUnivoco.length !== 6) {
        throw new Error('Il codice univoco deve avere esattamente 6 caratteri');
    }

    const salt = await bcrypt.genSalt(10); // Genera una stringa casuale
    const hash = await bcrypt.hash(password, salt); // Combina la stringa casuale con la password

    const user = await this.create({
        email,
        password: hash,
        nome,
        cognome,
        telefono,
        ragioneSociale,
        partitaIVA,
        codiceUnivoco,
        pec,
        cap,
        via,
        provincia,
        role: PARTNER // Imposta il ruolo a 'partner'
    });

    return user;
};

// Metodo statico per la registrazione di un Partner
userSchema.statics.signupTechnician = async function(newuser) {
  const {
      email,
      password,
      nome,
      cognome,
      telefono
  } = newuser;
  
  // controlla se la password rispetta la lunghezza minima
  if (password.length < 8) {
      throw Error('La password deve avere almeno 8 caratteri');
  }
  
  // controlla se l'email è già in uso
  const exists = await this.findOne({ email });
  if (exists) {
      throw Error('Email già utilizzata');
  }

  const salt = await bcrypt.genSalt(10); // Genera una stringa casuale
  const hash = await bcrypt.hash(password, salt); // Combina la stringa casuale con la password

  const user = await this.create({
      email,
      password: hash,
      nome,
      cognome,
      telefono,
      role: TECHNICIAN
  });

  return user;
};

// Metodo statico di login
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })

    // verifica se l'email esiste nel db
    if (!user) {
        throw Error('Email non trovata')
    }

    // Verifica delle password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password errata')
    }

    return user
};

module.exports = mongoose.model('User', userSchema)