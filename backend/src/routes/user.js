const express = require('express');

const {signup} = require('../controllers/userController/user');
const {requireAdmin} = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAdmin);

// in base al :role registra un partner o un tecnico
router.post('/signup/:role', signup);

module.exports = router