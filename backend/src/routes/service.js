const express = require('express');

const { createDevice } = require('../controllers/serviceController/device');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

//router.use(requireAdmin);

router.post('/device', createDevice);

module.exports = router;
