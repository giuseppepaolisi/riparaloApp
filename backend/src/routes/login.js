const express = require('express');

const { loginUser } = require('../controllers/authController/login');
const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

// login route
router.post('/', loginUser);

router.use(errorHandler);

module.exports = router;
