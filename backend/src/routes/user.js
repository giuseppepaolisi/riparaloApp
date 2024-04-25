const express = require('express');

const {
  signup,
  getAll,
  deleteUser,
} = require('../controllers/userController/user');
const { requireAdmin } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

//router.use(requireAdmin);

// in base al :role registra un partner o un tecnico
router.post('/user/signup/:role', signup);

router.get('/users/:role', getAll);

router.delete('/user/:id', deleteUser);

router.use(errorHandler);

module.exports = router;
