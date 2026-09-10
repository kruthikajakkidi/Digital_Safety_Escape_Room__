const Topic = require('../models/Topic');
const Game = require('../models/Game');
const UserProgress = require('../models/UserProgress');
const Badge = require('../models/Badge');

// Get all 7 topics with completion percentage for logged-in user
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ topicNumber: 1 });
    const userId = req.user ? req.user._id : null;

    let userProgressList = [];
    let userBadges = [];
    if (userId) {
      userProgressList = await UserProgress.find({ userId });
      userBadges = await Badge.find({ userId });
    }

    const topicsWithStats = await Promise.all(
      topics.map(async (topic) => {
        const games = await Game.find({ topicId: topic._id }).sort({ gameNumber: 1 });
        const gameIds = games.map((g) => g._id.toString());

        const progressForTopic = userProgressList.filter((p) =>
          gameIds.includes(p.gameId.toString())
        );

        const completedGamesCount = progressForTopic.filter((p) => p.isCompleted).length;
        const totalGames = games.length || 5;
        const completionPercentage = Math.round((completedGamesCount / totalGames) * 100);

        const topicScore = progressForTopic.reduce((acc, curr) => acc + (curr.bestScore || 0), 0);

        // Check if badge is earned
        const badge = userBadges.find(
          (b) => b.topicId && b.topicId.toString() === topic._id.toString()
        );

        // Check if unlocked (Topic 1 always unlocked, others unlock when previous topic has >= 1 game completed or previous topic badge earned)
        const isUnlocked =
          topic.topicNumber === 1 ||
          userBadges.some((b) => b.topicNumber === topic.topicNumber - 1) ||
          completedGamesCount > 0 ||
          (req.user && req.user.role === 'admin');

        return {
          _id: topic._id,
          topicNumber: topic.topicNumber,
          title: topic.title,
          slug: topic.slug,
          districtName: topic.districtName,
          description: topic.description,
          badgeName: topic.badgeName,
          badgeIcon: topic.badgeIcon,
          badgeColor: topic.badgeColor,
          icon: topic.icon,
          color: topic.color,
          totalGames,
          completedGamesCount,
          completionPercentage,
          topicScore,
          isUnlocked,
          badge: badge
            ? {
                title: badge.title,
                starRating: badge.starRating,
                verificationId: badge.verificationId,
                issuedAt: badge.issuedAt,
                score: badge.score,
                maxScore: badge.maxScore
              }
            : null
        };
      })
    );

    res.json({ success: true, topics: topicsWithStats });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ success: false, message: 'Server error loading topics' });
  }
};

// Get single topic details + 5 games
exports.getTopicBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const topic = await Topic.findOne({ slug });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    const games = await Game.find({ topicId: topic._id }).sort({ gameNumber: 1 });
    const userId = req.user ? req.user._id : null;

    let userProgress = [];
    if (userId) {
      userProgress = await UserProgress.find({
        userId,
        gameId: { $in: games.map((g) => g._id) }
      });
    }

    // Attach user progress to each game card
    const gamesWithProgress = games.map((game, index) => {
      const progress = userProgress.find((p) => p.gameId.toString() === game._id.toString());
      const highestLevel = progress ? progress.highestLevel : 1;
      const completedLevels = progress ? progress.completedLevels.length : 0;
      const isCompleted = progress ? progress.isCompleted : false;
      const bestScore = progress ? progress.bestScore : 0;
      const completionPercentage = Math.round((completedLevels / (game.totalLevels || 10)) * 100);

      // Game 1 is always unlocked. Next games unlock when previous game is completed OR level >= 5
      const previousGameCompleted =
        index === 0 ||
        userProgress.some(
          (p) =>
            p.gameId.toString() === games[index - 1]._id.toString() &&
            (p.isCompleted || p.highestLevel >= 5)
        );

      return {
        _id: game._id,
        topicNumber: game.topicNumber,
        gameNumber: game.gameNumber,
        title: game.title,
        slug: game.slug,
        shortDescription: game.shortDescription,
        mechanicType: game.mechanicType,
        difficulty: game.difficulty,
        totalLevels: game.totalLevels,
        xpReward: game.xpReward,
        icon: game.icon,
        highestLevel,
        completedLevels,
        isCompleted,
        bestScore,
        completionPercentage,
        isUnlocked: index === 0 || previousGameCompleted || (req.user && req.user.role === 'admin')
      };
    });

    const completedGames = gamesWithProgress.filter((g) => g.isCompleted).length;
    const totalTopicScore = gamesWithProgress.reduce((acc, curr) => acc + curr.bestScore, 0);

    let badge = null;
    if (userId) {
      badge = await Badge.findOne({ userId, topicId: topic._id });
    }

    res.json({
      success: true,
      topic: {
        _id: topic._id,
        topicNumber: topic.topicNumber,
        title: topic.title,
        slug: topic.slug,
        districtName: topic.districtName,
        description: topic.description,
        badgeName: topic.badgeName,
        badgeIcon: topic.badgeIcon,
        badgeColor: topic.badgeColor,
        icon: topic.icon,
        color: topic.color,
        completedGames,
        totalGames: games.length,
        totalTopicScore,
        badge
      },
      games: gamesWithProgress
    });
  } catch (error) {
    console.error('Error fetching topic by slug:', error);
    res.status(500).json({ success: false, message: 'Server error loading topic details' });
  }
};
