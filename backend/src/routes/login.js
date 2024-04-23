const express = require('express');

const { loginUser } = require('../controllers/authController/login');

const router = express.Router();

// login route
router.post('/', loginUser);

module.exports = router