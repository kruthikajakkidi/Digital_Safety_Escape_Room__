const express = require('express');
const router = express.Router();
const { issueTopicBadge, getUserBadges, verifyBadge } = require('../controllers/badgeController');
const { protect } = require('../middleware/auth');

router.post('/issue', protect, issueTopicBadge);
router.get('/my-badges', protect, getUserBadges);
router.get('/verify/:verificationId', verifyBadge);

module.exports = router;
