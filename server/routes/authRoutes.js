const express = require('express');
const router = express.Router();
const { register, login, guestLogin, getMe, updateTheme } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/guest', guestLogin);
router.get('/me', protect, getMe);
router.put('/theme', protect, updateTheme);

module.exports = router;
