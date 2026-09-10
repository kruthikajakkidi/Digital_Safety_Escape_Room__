const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topicNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  districtName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  badgeName: {
    type: String,
    required: true
  },
  badgeIcon: {
    type: String,
    required: true
  },
  badgeColor: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  requiredTopicNumber: {
    type: Number,
    default: 0 // 0 means unlocked by default
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);
