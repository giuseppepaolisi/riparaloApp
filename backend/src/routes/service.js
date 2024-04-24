const express = require('express');

const {
  createDevice,
  getDevices,
} = require('../controllers/serviceController/device');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

//router.use(requireAdmin);

router.post('/device', createDevice);
router.get('/devices', getDevices);

module.exports = router;
