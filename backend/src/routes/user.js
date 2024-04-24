const express = require('express');

const { signup, getAll } = require('../controllers/userController/user');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

//router.use(requireAdmin);

// in base al :role registra un partner o un tecnico
router.post('/user/signup/:role', signup);

router.get('/users/:role', getAll);
module.exports = router;
