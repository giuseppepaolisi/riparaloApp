const { signupFactory } = require('./userFactory');
const User = require('../../models/user');
const { PARTNER, TECHNICIAN } = require('../../conf/role');
const mongoose = require('mongoose');

// Si occupa della creazione di untente
const signup = async (req, res) => {
  const { role } = req.params;

  try {
    let newuser = req.body;

    // Controlli comuni (es. validazione email e password)
    if (!/\S+@\S+\.\S+/.test(newuser.email)) {
      throw new Error("Inserire un'email valida");
    }
    if (newuser.password.length < 8) {
      throw new Error('La password deve avere almeno 8 caratteri');
    }

    const signupFunction = signupFactory(role);
    newuser = signupFunction(newuser);

    const user = await User.signup(newuser);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ritorna un arry di users per un ruolo specificato
const getAll = async (req, res) => {
  const { role } = req.params;
  try {
    if (role !== PARTNER && role !== TECHNICIAN)
      throw new Error('ruolo non supportato');
    const users = await User.find({ role });
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// elimina un utente dal sistema
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID utente non valido');
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      throw new Error('Nessun utente trovato');
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup,
  getAll,
  deleteUser,
};
