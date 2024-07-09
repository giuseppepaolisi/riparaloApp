const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerByPhone,
} = require('../controllers/customerController/customer');
const { requirePartner, requireAuth } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

// in base al :role registra un partner o un tecnico
router.post('/customer', requirePartner, createCustomer);

router.delete('/customer/:id', requirePartner, deleteCustomer);

router.get('/customers', requirePartner, getCustomers);

router.get('/customer/:id', requirePartner, getCustomer);

router.patch('/customer/:id', requirePartner, updateCustomer);

router.get('/customer/phone/:phone', requirePartner, getCustomerByPhone);

router.use(errorHandler);

module.exports = router;
