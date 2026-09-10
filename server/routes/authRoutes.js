const express = require('express');
const router = express.Router();
const { register, login, guestLogin, googleLogin, getMe, updateTheme } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/guest', guestLogin);
router.post('/google', googleLogin);
router.get('/me', protect, getMe);
router.put('/theme', protect, updateTheme);

module.exports = router;
