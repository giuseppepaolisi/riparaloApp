const express = require('express');

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
const { requireAdmin } = require('../middleware/requireAuth');
const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

//router.use(requireAdmin);

router.post('/device', createDevice);
router.get('/devices', getDevices);
router.get('/device/:id', getDevice);
router.get('/brands', getBrands);
router.get('/devices/:brand', getModelsByBrand);
router.get('/services/:device', getServicesByDevice);

router.use(errorHandler);

module.exports = router;
