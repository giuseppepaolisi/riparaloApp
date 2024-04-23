const express = require('express');

const { signupTechnician } = require('../controllers/userController/technicianController/create');
const { signupPartner } = require('../controllers/userController/partnerController/create');

const router = express.Router();

router.post('/signupTechnician', signupTechnician);
router.post('/signupPartner', signupTechnician);

module.exports = router