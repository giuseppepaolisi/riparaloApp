const express = require('express');

const { signupTechnician } = require('../controllers/userController/technician');
const { signupPartner } = require('../controllers/userController/partner');

const router = express.Router();

router.post('/signupTechnician', signupTechnician);
router.post('/signupPartner', signupPartner);

module.exports = router