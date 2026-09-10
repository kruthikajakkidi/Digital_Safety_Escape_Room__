const Game = require('../models/Game');
const Level = require('../models/Level');
const UserProgress = require('../models/UserProgress');
const Topic = require('../models/Topic');

// Get game info and its levels
exports.getGameBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const game = await Game.findOne({ slug });
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    const topic = await Topic.findById(game.topicId);
    const levels = await Level.find({ gameId: game._id }).sort({ levelNumber: 1 });

    const userId = req.user ? req.user._id : null;
    let progress = null;
    if (userId) {
      progress = await UserProgress.findOne({ userId, gameId: game._id });
    }

    res.json({
      success: true,
      game: {
        _id: game._id,
        title: game.title,
        slug: game.slug,
        shortDescription: game.shortDescription,
        mechanicType: game.mechanicType,
        difficulty: game.difficulty,
        totalLevels: game.totalLevels,
        xpReward: game.xpReward,
        icon: game.icon,
        topicNumber: game.topicNumber,
        topic: topic ? {
          title: topic.title,
          slug: topic.slug,
          districtName: topic.districtName,
          color: topic.color
        } : null
      },
      progress: progress ? {
        highestLevel: progress.highestLevel,
        completedLevels: progress.completedLevels,
        bestScore: progress.bestScore,
        isCompleted: progress.isCompleted
      } : {
        highestLevel: 1,
        completedLevels: [],
        bestScore: 0,
        isCompleted: false
      },
      levels: levels.map(lvl => ({
        _id: lvl._id,
        levelNumber: lvl.levelNumber,
        title: lvl.title,
        instructions: lvl.instructions,
        difficulty: lvl.difficulty,
        timeLimit: lvl.timeLimit,
        scenario: lvl.scenario,
        redFlags: lvl.redFlags,
        actions: lvl.actions,
        hints: lvl.hints
      }))
    });
  } catch (error) {
    console.error('Error in getGameBySlug:', error);
    res.status(500).json({ success: false, message: 'Server error loading game' });
  }
};
