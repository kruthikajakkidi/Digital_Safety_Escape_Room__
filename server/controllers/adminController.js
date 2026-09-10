const User = require('../models/User');
const Topic = require('../models/Topic');
const Game = require('../models/Game');
const Level = require('../models/Level');
const GameAttempt = require('../models/GameAttempt');
const Badge = require('../models/Badge');

// Get overall platform analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTopics = await Topic.countDocuments();
    const totalGames = await Game.countDocuments();
    const totalLevels = await Level.countDocuments();
    const totalBadgesEarned = await Badge.countDocuments();
    const totalAttempts = await GameAttempt.countDocuments();

    // Calculate pass rate
    const passedAttempts = await GameAttempt.countDocuments({ passed: true });
    const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 88;

    // Recent attempts
    const recentAttempts = await GameAttempt.find()
      .populate('userId', 'username avatar')
      .populate('gameId', 'title slug topicNumber')
      .sort({ createdAt: -1 })
      .limit(10);

    // Topic completion stats
    const topics = await Topic.find().sort({ topicNumber: 1 });
    const topicStats = await Promise.all(
      topics.map(async (t) => {
        const badgesIssued = await Badge.countDocuments({ topicId: t._id });
        return {
          topicNumber: t.topicNumber,
          title: t.title,
          districtName: t.districtName,
          badgesIssued
        };
      })
    );

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTopics,
        totalGames,
        totalLevels,
        totalBadgesEarned,
        totalAttempts,
        passRate
      },
      topicStats,
      recentAttempts
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error loading analytics' });
  }
};

// Update a level scenario
exports.updateLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, instructions, scenario, redFlags, actions, hints, timeLimit } = req.body;

    const level = await Level.findByIdAndUpdate(
      id,
      {
        title,
        instructions,
        scenario,
        redFlags,
        actions,
        hints,
        timeLimit
      },
      { new: true }
    );

    if (!level) {
      return res.status(404).json({ success: false, message: 'Level not found' });
    }

    res.json({ success: true, level, message: 'Level scenario updated successfully' });
  } catch (error) {
    console.error('Update level error:', error);
    res.status(500).json({ success: false, message: 'Server error updating level' });
  }
};
