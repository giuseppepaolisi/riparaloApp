const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer,  // Assicurati di includere questa linea
  deleteCustomer,
} = require('../controllers/customerController/customer');
const { requirePartner, requireAuth } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

// in base al :role registra un partner o un tecnico
router.post('/customer', requirePartner, createCustomer);

router.delete('/customer/:id', requirePartner, deleteCustomer);

router.get('/customers', requirePartner, getCustomers);

router.get('/customer/:id', requirePartner, getCustomer);  // Rimuovi il commento qui

router.use(errorHandler);

module.exports = router;
