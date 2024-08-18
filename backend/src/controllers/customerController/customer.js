const Customer = require('../../models/customer');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../middleware/errorManager');

// Creazione di un cliente con email, nome, cognome, telefono e partner associato
const createCustomer = async (req, res, next) => {
  const { email, nome, cognome, telefono } = req.body;
  const partner = req.user._id;

  try {
    // validazione input
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return next(new ErrorResponse("Inserire un'email valida", 400));
    }
    if (!nome) {
      return next(new ErrorResponse('Inserire un nome', 400));
    }
    if (!cognome) {
      return next(new ErrorResponse('Inserire un cognome', 400));
    }
    if (!telefono || telefono.length < 10) {
      return next(
        new ErrorResponse('Inserire un numero di telefono valido', 400)
      );
    }

    const customer = await Customer.create({
      email,
      nome,
      cognome,
      telefono,
      partner,
    });
    res.status(201).json({ customer });
  } catch (error) {
    next(error);
  }
};

// Ritorna la lista di clienti di un certo partner
const getCustomers = async (req, res, next) => {
  const partner = req.user._id;
  try {
    const customers = await Customer.find({ partner });

    res.status(200).json({ customers });
  } catch (error) {
    next(error);
  }
};

// elimina un cliente dal sistema
const deleteCustomer = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse('ID cliente non valido', 400));
    }

    const customer = await Customer.findOneAndDelete({ _id: id });

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

// Ritorna i dati di un singolo cliente
const getCustomer = async (req, res, next) => {
  const { id } = req.params;
  const partner = req.user._id;
  try {
    const customer = await Customer.findOne({ _id: id, partner });

    if (!customer) {
      return next(new ErrorResponse('Cliente non trovato', 404));
    }

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

// Aggiorna dati cliente
const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const partner = req.user._id;
  const { email, nome, cognome, telefono } = req.body;
  try {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return next(new ErrorResponse("Inserire un'email valida", 400));
    }
    if (!nome) {
      return next(new ErrorResponse('Inserire un nome', 400));
    }
    if (!cognome) {
      return next(new ErrorResponse('Inserire un cognome', 400));
    }
    if (!telefono || telefono.length < 10) {
      return next(
        new ErrorResponse('Inserire un numero di telefono valido', 400)
      );
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id, partner },
      { email, nome, cognome, telefono },
      { new: true }
    );

    if (!updatedCustomer) {
      return next(new ErrorResponse('Cliente non trovato', 404));
    }

    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    next(error);
  }
};

// Ritorna i dati di un singolo cliente passato il suo numero di telefono
const getCustomerByPhone = async (req, res, next) => {
  const { phone } = req.params;
  const partner = req.user._id;
  try {
    const customer = await Customer.findOne({ telefono: phone, partner });

    if (!customer) {
      return next(new ErrorResponse('Cliente non trovato', 404));
    }

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  getCustomerByPhone,
};
