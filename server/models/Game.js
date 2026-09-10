const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  topicNumber: {
    type: Number,
    required: true
  },
  gameNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  mechanicType: {
    type: String,
    required: true
    // e.g. 'phishing-inspector', 'fake-login', 'chat-simulator', 'link-inspector', 'password-vault', 'qr-scanner', 'app-permission', 'emergency-triage', etc.
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    default: 'Medium'
  },
  totalLevels: {
    type: Number,
    default: 10
  },
  xpReward: {
    type: Number,
    default: 500
  },
  icon: {
    type: String,
    default: 'gamepad'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
