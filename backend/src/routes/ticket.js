const express = require('express');

const {
  openTicket,
  getTickets,
  getTicket,
} = require('../controllers/ticketController/ticket');
const { requirePartner, requireAuth } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

router.post('/ticket', requirePartner, openTicket);

router.get('/tickets', getTickets);

router.get('/ticket/:id', getTicket);

router.use(errorHandler);

module.exports = router;
