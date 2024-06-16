const express = require('express');

const { loginUser } = require('../controllers/authController/login');
const { errorHandler } = require('../middleware/errorManager');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// login route
router.post('/login', loginUser);
router.get('/verify-token', requireAuth);

router.use(errorHandler);

module.exports = router;
