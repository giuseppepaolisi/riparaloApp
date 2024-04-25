const express = require('express');

const {
  requirePartner,
  requireAdmin,
  requireTechnicianAdmin,
  requireAuth,
} = require('../middleware/requireAuth');

const {
  createDevice,
  getDevices,
  getDevice,
  getBrands,
  getModelsByBrand,
} = require('../controllers/serviceController/device');

const {
  getServicesByDevice,
} = require('../controllers/serviceController/service');
const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

router.post('/device', requireAdmin, createDevice);
router.get('/devices', requireAdmin, getDevices);
router.get('/device/:id', getDevice);
router.get('/brands', getBrands);
router.get('/devices/:brand', getModelsByBrand);
router.get('/services/:device', getServicesByDevice);

router.use(errorHandler);

module.exports = router;
