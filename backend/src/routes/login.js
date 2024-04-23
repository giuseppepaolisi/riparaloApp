const express = require('express');

const { loginUser } = require('../controllers/authController/login');

const router = express.Router();

// login route
router.post('/login', loginUser);

module.exports = router