const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../utils/validation');
const auth = require('../middleware/auth');

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;