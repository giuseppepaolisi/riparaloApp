const express = require('express');

const {
  openTicket,
  getTickets,
  getTicket,
  deleteTicket,
} = require('../controllers/ticketController/ticket');
const { requirePartner, requireAuth } = require('../middleware/requireAuth');

const { updateState } = require('../controllers/ticketStatusController/ticket');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

router.post('/ticket', requirePartner, openTicket);

router.get('/tickets/:state', getTickets);

router.get('/ticket/:id', getTicket);

router.delete('/ticket/:id', requirePartner, deleteTicket);

router.patch('/ticket', updateState);

router.use(errorHandler);

module.exports = router;
