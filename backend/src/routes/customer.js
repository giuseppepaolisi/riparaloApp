const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer,
} = require('../controllers/customerController/customer');
const { requireAdmin } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

//router.use(requireAdmin);

// in base al :role registra un partner o un tecnico
router.post('/customer', createCustomer);

router.get('/customers', getCustomers);

router.get('/customer/:id', getCustomer);

router.use(errorHandler);

module.exports = router;
