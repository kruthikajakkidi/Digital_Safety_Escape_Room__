const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  gameSlug: {
    type: String,
    required: true
  },
  levelNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert', 'Final Challenge'],
    default: 'Easy'
  },
  timeLimit: {
    type: Number, // in seconds (0 or null = untimed)
    default: 0
  },
  scenario: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  redFlags: [{
    id: String,
    label: String,
    description: String,
    isCrucial: Boolean
  }],
  actions: [{
    id: String,
    label: String,
    isCorrect: Boolean,
    explanation: String,
    scoreDelta: Number,
    costLife: Boolean
  }],
  hints: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);
