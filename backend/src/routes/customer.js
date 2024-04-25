const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer,
} = require('../controllers/customerController/customer');
const { requirePartner, requireAuth } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

// in base al :role registra un partner o un tecnico
router.post('/customer', requirePartner, createCustomer);

router.get('/customers', requirePartner, getCustomers);

router.get('/customer/:id', getCustomer);

router.use(errorHandler);

module.exports = router;
