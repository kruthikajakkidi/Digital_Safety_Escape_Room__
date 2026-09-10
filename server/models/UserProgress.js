const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  highestLevel: {
    type: Number,
    default: 1
  },
  completedLevels: [{
    levelNumber: Number,
    score: Number,
    livesLeft: Number,
    completedAt: { type: Date, default: Date.now }
  }],
  bestScore: {
    type: Number,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  accuracy: {
    type: Number,
    default: 100
  },
  attemptsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

userProgressSchema.index({ userId: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
