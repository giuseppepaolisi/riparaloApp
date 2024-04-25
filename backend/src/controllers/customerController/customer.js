const Customer = require('../../models/customer');
const { ErrorResponse } = require('../../middleware/errorManager');

const createCustomer = async (req, res, next) => {
  const { email, nome, cognome, telefono } = req.body;

  try {
    // validazione input
    if (!/\S+@\S+\.\S+/.test(email)) {
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

    // Controlla se esiste già un cliente con la stessa email
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return next(
        new ErrorResponse('Questo cliente è già stato inserito.', 400)
      );
    }

    const customer = await Customer.create({ email, nome, cognome, telefono });
    res.status(201).json({ customer });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({});

    res.status(200).json({ customers });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOne({ _id: id });

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
};
