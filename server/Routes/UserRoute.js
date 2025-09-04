const express = require('express');
const router = express.Router();
const { register, login, me } = require('../Controller/UserController');
const { protect } = require('../middleware/auth');
const { registerRules, loginRules, handleValidation } = require('../middleware/validation');

router.post('/users/register', registerRules, handleValidation, register);
router.post('/users/login', loginRules, handleValidation, login);
router.get('/users/me', protect, me);

module.exports = router;
