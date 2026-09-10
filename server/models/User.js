const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    default: null
  },
  profilePicture: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['player', 'admin'],
    default: 'player'
  },
  avatar: {
    type: String,
    default: 'cyber_runner'
  },
  themePreference: {
    type: String,
    enum: ['neon-purple', 'cyber-red', 'matrix-green', 'clean-cyber', 'soft-digital'],
    default: 'neon-purple'
  },
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  totalScore: {
    type: Number,
    default: 0
  },
  streakDays: {
    type: Number,
    default: 1
  },
  lastPlayedDate: {
    type: Date,
    default: Date.now
  },
  badgesEarned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  achievementsUnlocked: [{
    code: String,
    unlockedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
