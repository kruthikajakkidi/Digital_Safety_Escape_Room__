const express = require('express');
const router = express.Router();
const { submitLevelResult, getDashboardStats } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.post('/submit-level', protect, submitLevelResult);
router.get('/dashboard-stats', protect, getDashboardStats);

module.exports = router;
