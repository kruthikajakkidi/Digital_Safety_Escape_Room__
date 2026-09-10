const mongoose = require('mongoose');

const gameAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  levelNumber: {
    type: Number,
    required: true
  },
  scoreEarned: {
    type: Number,
    default: 0
  },
  mistakes: [{
    actionId: String,
    reason: String
  }],
  livesRemaining: {
    type: Number,
    default: 3
  },
  passed: {
    type: Boolean,
    default: false
  },
  timeSeconds: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GameAttempt', gameAttemptSchema);
