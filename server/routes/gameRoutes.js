const express = require('express');
const router = express.Router();
const { getGameBySlug } = require('../controllers/gameController');
const { protect } = require('../middleware/auth');

const optionalAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
};

router.get('/:slug', optionalAuth, getGameBySlug);

module.exports = router;
