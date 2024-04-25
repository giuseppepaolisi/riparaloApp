const express = require('express');

const {
  signup,
  getAll,
  deleteUser,
} = require('../controllers/userController/user');
const { requireAdmin, requireAuth } = require('../middleware/requireAuth');

const { errorHandler } = require('../middleware/errorManager');

const router = express.Router();

router.use(requireAuth);

// in base al :role registra un partner o un tecnico
router.post('/user/signup/:role', requireAdmin, signup);

router.get('/users/:role', requireAdmin, getAll);

router.delete('/user/:id', requireAdmin, deleteUser);

router.use(errorHandler);

module.exports = router;
