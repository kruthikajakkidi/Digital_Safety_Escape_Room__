const express = require('express');
const router = express.Router();
const { getAnalytics, updateLevel } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/analytics', protect, adminOnly, getAnalytics);
router.put('/levels/:id', protect, adminOnly, updateLevel);

module.exports = router;
