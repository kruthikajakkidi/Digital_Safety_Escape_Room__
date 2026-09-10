const User = require('../models/User');
const UserProgress = require('../models/UserProgress');
const Game = require('../models/Game');
const Topic = require('../models/Topic');
const Level = require('../models/Level');
const Badge = require('../models/Badge');
const GameAttempt = require('../models/GameAttempt');
const Achievement = require('../models/Achievement');

// Submit level result
exports.submitLevelResult = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      gameId,
      levelNumber,
      scoreEarned,
      livesRemaining,
      passed,
      mistakes = [],
      timeSeconds = 0,
      identifiedRedFlags = []
    } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    // Save GameAttempt for analytics and telemetry
    await GameAttempt.create({
      userId,
      gameId,
      levelNumber,
      scoreEarned,
      mistakes,
      livesRemaining,
      passed,
      timeSeconds
    });

    if (!passed) {
      return res.json({
        success: true,
        passed: false,
        message: 'Level attempt recorded (game over or failed)',
        scoreEarned
      });
    }

    // Find or create UserProgress
    let progress = await UserProgress.findOne({ userId, gameId });
    if (!progress) {
      progress = new UserProgress({
        userId,
        topicId: game.topicId,
        gameId,
        highestLevel: 1,
        completedLevels: [],
        bestScore: 0,
        isCompleted: false
      });
    }

    // Add completed level if not already in completedLevels
    const existingIdx = progress.completedLevels.findIndex((l) => l.levelNumber === levelNumber);
    if (existingIdx >= 0) {
      if (scoreEarned > progress.completedLevels[existingIdx].score) {
        progress.completedLevels[existingIdx].score = scoreEarned;
        progress.completedLevels[existingIdx].livesLeft = livesRemaining;
      }
    } else {
      progress.completedLevels.push({
        levelNumber,
        score: scoreEarned,
        livesLeft: livesRemaining,
        completedAt: new Date()
      });
    }

    if (levelNumber >= progress.highestLevel && levelNumber < game.totalLevels) {
      progress.highestLevel = levelNumber + 1;
    }

    // Check if game is completed
    const totalLevelsForGame = game.totalLevels || 10;
    if (progress.completedLevels.length >= totalLevelsForGame || levelNumber === totalLevelsForGame) {
      progress.isCompleted = true;
    }

    // Calculate game total score
    const currentGameScore = progress.completedLevels.reduce((acc, curr) => acc + (curr.score || 0), 0);
    if (currentGameScore > progress.bestScore) {
      progress.bestScore = currentGameScore;
    }

    await progress.save();

    // Update User XP and Level
    const user = await User.findById(userId);
    const xpBonus = 50 + (livesRemaining === 3 ? 30 : 0); // Perfect run bonus
    user.xp += xpBonus;
    user.totalScore += scoreEarned;

    // Level up check (every 500 XP is 1 level)
    const newLevel = Math.floor(user.xp / 500) + 1;
    let leveledUp = false;
    if (newLevel > user.level) {
      user.level = newLevel;
      leveledUp = true;
    }

    // Check achievements
    const newlyUnlockedAchievements = [];
    // 1. First Detective
    if (game.topicNumber === 1 && levelNumber === 1) {
      if (!user.achievementsUnlocked.some((a) => a.code === 'FIRST_DETECTIVE')) {
        user.achievementsUnlocked.push({ code: 'FIRST_DETECTIVE', unlockedAt: new Date() });
        newlyUnlockedAchievements.push({
          code: 'FIRST_DETECTIVE',
          title: '🕵️ First Detective',
          description: 'Completed your first phishing challenge!'
        });
      }
    }
    // 2. Perfect Run
    if (livesRemaining === 3 && levelNumber === game.totalLevels) {
      if (!user.achievementsUnlocked.some((a) => a.code === 'PERFECT_RUN')) {
        user.achievementsUnlocked.push({ code: 'PERFECT_RUN', unlockedAt: new Date() });
        newlyUnlockedAchievements.push({
          code: 'PERFECT_RUN',
          title: '🏆 Flawless Guardian',
          description: 'Completed a full game without losing a single heart!'
        });
      }
    }

    await user.save();

    // Check if entire topic is completed (all 5 games completed)
    const topicGames = await Game.find({ topicId: game.topicId });
    const userTopicProgress = await UserProgress.find({
      userId,
      gameId: { $in: topicGames.map((g) => g._id) }
    });
    const completedTopicGamesCount = userTopicProgress.filter((p) => p.isCompleted).length;
    const isTopicCompleted = completedTopicGamesCount >= topicGames.length;

    res.json({
      success: true,
      passed: true,
      scoreEarned,
      xpEarned: xpBonus,
      leveledUp,
      newLevel: user.level,
      isGameCompleted: progress.isCompleted,
      isTopicCompleted,
      newlyUnlockedAchievements
    });
  } catch (error) {
    console.error('Error submitting level result:', error);
    res.status(500).json({ success: false, message: 'Server error saving progress' });
  }
};

// Get comprehensive user dashboard stats (strongest/weakest areas, progress % etc)
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    const topics = await Topic.find().sort({ topicNumber: 1 });
    const allGames = await Game.find();
    const userProgress = await UserProgress.find({ userId });
    const userBadges = await Badge.find({ userId });

    const totalTopics = topics.length; // 7
    const totalGames = allGames.length; // 35
    const totalPossibleLevels = allGames.reduce((acc, g) => acc + (g.totalLevels || 10), 0); // 350

    let completedGamesCount = 0;
    let completedLevelsCount = 0;
    let totalScoreEarned = 0;

    userProgress.forEach((p) => {
      if (p.isCompleted) completedGamesCount++;
      completedLevelsCount += p.completedLevels ? p.completedLevels.length : 0;
      totalScoreEarned += p.bestScore || 0;
    });

    const topicStats = topics.map((topic) => {
      const topicGameIds = allGames
        .filter((g) => g.topicId.toString() === topic._id.toString())
        .map((g) => g._id.toString());

      const progressForTopic = userProgress.filter((p) =>
        topicGameIds.includes(p.gameId.toString())
      );

      const completedInTopic = progressForTopic.filter((p) => p.isCompleted).length;
      const percentage = Math.round((completedInTopic / (topicGameIds.length || 5)) * 100);

      // Score in topic
      const topicScore = progressForTopic.reduce((acc, curr) => acc + (curr.bestScore || 0), 0);

      const badge = userBadges.find(
        (b) => b.topicId && b.topicId.toString() === topic._id.toString()
      );

      return {
        topicId: topic._id,
        topicNumber: topic.topicNumber,
        title: topic.title,
        slug: topic.slug,
        districtName: topic.districtName,
        icon: topic.icon,
        color: topic.color,
        badgeName: topic.badgeName,
        badgeIcon: topic.badgeIcon,
        percentage,
        topicScore,
        hasBadge: !!badge,
        badge
      };
    });

    const topicsCompletedCount = topicStats.filter((t) => t.percentage === 100 || t.hasBadge).length;
    const overallProgressPercent = Math.round((completedGamesCount / (totalGames || 35)) * 100);

    // Identify Strongest and Weakest topics (from topics with at least some activity or default)
    let sortedTopicsByPerformance = [...topicStats].sort((a, b) => b.percentage - a.percentage);
    const strongestTopic = sortedTopicsByPerformance[0] || null;
    const weakestTopic =
      sortedTopicsByPerformance.slice().reverse().find((t) => t.percentage < 100) ||
      sortedTopicsByPerformance[sortedTopicsByPerformance.length - 1];

    res.json({
      success: true,
      user,
      stats: {
        overallProgressPercent,
        topicsCompletedCount,
        totalTopics,
        completedGamesCount,
        totalGames,
        completedLevelsCount,
        totalPossibleLevels,
        totalScoreEarned: Math.max(totalScoreEarned, user.totalScore),
        badgesEarnedCount: userBadges.length,
        strongestTopic: strongestTopic ? { title: strongestTopic.title, slug: strongestTopic.slug, percentage: strongestTopic.percentage } : null,
        weakestTopic: weakestTopic ? { title: weakestTopic.title, slug: weakestTopic.slug, percentage: weakestTopic.percentage } : null
      },
      topicStats,
      recentBadges: userBadges.slice(0, 3)
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server error loading stats' });
  }
};
