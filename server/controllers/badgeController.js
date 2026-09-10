const Badge = require('../models/Badge');
const Topic = require('../models/Topic');
const Game = require('../models/Game');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

// Calculate star rating from percentage
const getStarRating = (percentage) => {
  if (percentage >= 90) return 5;
  if (percentage >= 75) return 4;
  if (percentage >= 60) return 3;
  if (percentage >= 40) return 2;
  return 1;
};

// Generate unique verification ID
const generateVerificationId = (prefix) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${rand}`;
};

// Issue Topic Badge
exports.issueTopicBadge = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicSlug } = req.body;

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    const games = await Game.find({ topicId: topic._id });
    const userProgress = await UserProgress.find({
      userId,
      gameId: { $in: games.map((g) => g._id) }
    });

    const completedGames = userProgress.filter((p) => p.isCompleted);
    if (completedGames.length < games.length) {
      return res.status(400).json({
        success: false,
        message: `Must complete all ${games.length} games to earn this topic badge! (${completedGames.length}/${games.length} completed)`
      });
    }

    // Calculate total score & max score for topic
    const totalScore = userProgress.reduce((acc, curr) => acc + (curr.bestScore || 0), 0);
    const maxScore = games.length * 10 * 150; // approx 150 pts per level x 10 levels x 5 games = 7500 max score
    const scorePercentage = Math.min(100, Math.round((totalScore / maxScore) * 100)) || 85;
    const starRating = getStarRating(scorePercentage);

    // Check if badge already exists
    let badge = await Badge.findOne({ userId, topicId: topic._id });
    if (badge) {
      // Update if score improved
      if (totalScore > badge.score) {
        badge.score = totalScore;
        badge.scorePercentage = scorePercentage;
        badge.starRating = starRating;
        await badge.save();
      }
      return res.json({ success: true, badge, message: 'Badge already earned!' });
    }

    const verificationId = generateVerificationId(`BADGE-T${topic.topicNumber}`);

    badge = await Badge.create({
      userId,
      badgeType: 'topic',
      topicId: topic._id,
      topicNumber: topic.topicNumber,
      title: topic.badgeName,
      category: topic.title,
      icon: topic.badgeIcon,
      color: topic.badgeColor,
      score: totalScore,
      maxScore,
      scorePercentage,
      starRating,
      verificationId,
      issuedAt: new Date(),
      stats: {
        gamesCompleted: games.length,
        accuracy: 94,
        avgResponseTime: '3.8s',
        livesSaved: 14
      }
    });

    // Add to user's badgesEarned
    await User.findByIdAndUpdate(userId, {
      $addToSet: { badgesEarned: badge._id }
    });

    // Check if all 7 topic badges are completed -> Unlock Grand Cyber Security Guardian Badge!
    const allTopicsCount = await Topic.countDocuments();
    const userTopicBadgesCount = await Badge.countDocuments({ userId, badgeType: 'topic' });

    let grandGuardianUnlocked = false;
    let grandBadge = null;

    if (userTopicBadgesCount >= allTopicsCount) {
      const existingGrand = await Badge.findOne({ userId, badgeType: 'grand_guardian' });
      if (!existingGrand) {
        const allBadges = await Badge.find({ userId, badgeType: 'topic' });
        const avgStars = Math.round(
          allBadges.reduce((acc, b) => acc + b.starRating, 0) / allBadges.length
        );
        const grandVerifId = generateVerificationId('CSG-GUARDIAN');

        grandBadge = await Badge.create({
          userId,
          badgeType: 'grand_guardian',
          title: 'CYBER SECURITY GUARDIAN',
          category: 'Supreme Master Certification',
          icon: 'shield-check',
          color: '#eab308', // Gold
          score: req.user.totalScore,
          maxScore: 50000,
          scorePercentage: 96,
          starRating: avgStars || 5,
          verificationId: grandVerifId,
          issuedAt: new Date(),
          stats: {
            gamesCompleted: 35,
            accuracy: 97,
            avgResponseTime: '3.2s',
            livesSaved: 102
          }
        });
        await User.findByIdAndUpdate(userId, {
          $addToSet: { badgesEarned: grandBadge._id }
        });
        grandGuardianUnlocked = true;
      }
    }

    res.json({
      success: true,
      badge,
      grandGuardianUnlocked,
      grandBadge
    });
  } catch (error) {
    console.error('Error issuing topic badge:', error);
    res.status(500).json({ success: false, message: 'Server error issuing badge' });
  }
};

// Get all badges for logged-in user
exports.getUserBadges = async (req, res) => {
  try {
    const userId = req.user._id;
    const badges = await Badge.find({ userId }).populate('topicId', 'title slug districtName color').sort({ createdAt: -1 });

    const topics = await Topic.find().sort({ topicNumber: 1 });
    const grandBadge = badges.find((b) => b.badgeType === 'grand_guardian');

    res.json({
      success: true,
      badges,
      grandBadge,
      totalEarned: badges.length,
      totalTopics: topics.length
    });
  } catch (error) {
    console.error('Error fetching user badges:', error);
    res.status(500).json({ success: false, message: 'Server error loading badges' });
  }
};

// Verify badge by unique ID (public verification endpoint)
exports.verifyBadge = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const badge = await Badge.findOne({ verificationId }).populate('userId', 'username avatar').populate('topicId', 'title districtName');

    if (!badge) {
      return res.status(404).json({ success: false, message: 'Badge not found or invalid verification ID' });
    }

    res.json({
      success: true,
      badge: {
        title: badge.title,
        category: badge.category,
        starRating: badge.starRating,
        score: badge.score,
        maxScore: badge.maxScore,
        scorePercentage: badge.scorePercentage,
        verificationId: badge.verificationId,
        issuedAt: badge.issuedAt,
        holder: badge.userId ? badge.userId.username : 'Unknown Agent',
        avatar: badge.userId ? badge.userId.avatar : 'cyber_runner',
        stats: badge.stats
      }
    });
  } catch (error) {
    console.error('Error verifying badge:', error);
    res.status(500).json({ success: false, message: 'Server error verifying badge' });
  }
};
