const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badgeType: {
    type: String,
    enum: ['topic', 'grand_guardian'],
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    default: null
  },
  topicNumber: {
    type: Number,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#8b5cf6'
  },
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  scorePercentage: {
    type: Number,
    required: true
  },
  starRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  verificationId: {
    type: String,
    required: true,
    unique: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  stats: {
    gamesCompleted: { type: Number, default: 5 },
    accuracy: { type: Number, default: 100 },
    avgResponseTime: { type: String, default: '4.2s' },
    livesSaved: { type: Number, default: 15 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);
