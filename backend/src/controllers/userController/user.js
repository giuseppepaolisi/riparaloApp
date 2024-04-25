const { signupFactory } = require('./userFactory');
const User = require('../../models/user');
const { PARTNER, TECHNICIAN } = require('../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../middleware/errorManager');

// Si occupa della creazione di untente
const signup = async (req, res, next) => {
  const { role } = req.params;

  try {
    let newuser = req.body;

    // Controlli comuni (es. validazione email e password)
    if (!/\S+@\S+\.\S+/.test(newuser.email)) {
      return next(new ErrorResponse("Inserire un'email valida", 400));
    }
    if (newuser.password.length < 8) {
      return next(
        new ErrorResponse('La password deve avere almeno 8 caratteri', 400)
      );
    }

    const signupFunction = signupFactory(role);
    newuser = signupFunction(newuser, next);

    const user = await User.signup(newuser);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// ritorna un arry di users per un ruolo specificato
const getAll = async (req, res, next) => {
  const { role } = req.params;
  try {
    if (role !== PARTNER && role !== TECHNICIAN)
      return next(new ErrorResponse('ruolo non supportato', 400));
    const users = await User.find({ role });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// elimina un utente dal sistema
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID utente non valido', 400));
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return next(new ErrorResponse('Nessun utente trovato', 400));
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getAll,
  deleteUser,
};
