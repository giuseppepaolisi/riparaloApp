const {
  signupFactory,
  updateFactory,
  filterUserFactory,
} = require('./userFactory');
const User = require('../../models/user');
const { PARTNER, TECHNICIAN } = require('../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../middleware/errorManager');
const bcrypt = require('bcrypt');

// Si occupa della creazione di utente
const signup = async (req, res, next) => {
  const { role } = req.params;

  try {
    let newuser = req.body;

    // validazione email e password
    if (!/\S+@\S+\.\S+/.test(newuser.email)) {
      return next(new ErrorResponse("Inserire un'email valida", 400));
    }
    if (newuser.password.length < 8) {
      return next(
        new ErrorResponse('La password deve avere almeno 8 caratteri', 400)
      );
    }

    newuser = filterUserFactory(role, newuser, next);
    const signupFunction = signupFactory(role, next);
    newuser = signupFunction(newuser, next);

    const user = await User.signup(newuser, next);
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

// Ritorna un utente passato il suo id
const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID utente non valido', 400));
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorResponse('Nessun utente trovato', 400));
    }
    res.status(200).json(user);
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

// Aggiorna i dati di un utente dal sistema
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  let data = req.body;
  const { role } = req.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID utente non valido', 400));
    }

    if (!data) {
      return next(
        new ErrorResponse("Nessun dato fornito per l'aggiornamento", 400)
      );
    }

    // Controlli comuni (es. validazione email e password)
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      return next(new ErrorResponse("Inserire un'email valida", 400));
    }

    if (data.newPassword && data.newPassword.length < 8) {
      return next(
        new ErrorResponse(
          'La nuova password deve avere almeno 8 caratteri',
          400
        )
      );
    }

    // Fetch user data from DB
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse('Utente non trovato', 404));
    }

    // Verifica della vecchia password
    if (data.oldPassword) {
      const match = await bcrypt.compare(data.oldPassword, user.password);
      if (!match) {
        return next(
          new ErrorResponse('La vecchia password non è corretta', 400)
        );
      }
    }

    // Criptare la nuova password
    if (data.newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.newPassword, salt);
      data.password = hash;
      delete data.newPassword;
      delete data.oldPassword;
    }

    // Usa la funzione di aggiornamento specifica per il ruolo
    const updateFunction = updateFactory(role, next);
    const updatedData = updateFunction(data, next);
    console.log(updatedData);

    // Aggiorna l'utente
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getAll,
  deleteUser,
  updateUser,
  getById,
};
