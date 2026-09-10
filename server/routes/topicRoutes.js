const express = require('express');
const router = express.Router();
const { getAllTopics, getTopicBySlug } = require('../controllers/topicController');
const { protect } = require('../middleware/auth');

// Optional protect middleware: attach user if token present
const optionalAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
};

router.get('/', optionalAuth, getAllTopics);
router.get('/:slug', optionalAuth, getTopicBySlug);

module.exports = router;
