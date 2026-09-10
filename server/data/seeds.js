const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Topic = require('../models/Topic');
const Game = require('../models/Game');
const Level = require('../models/Level');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const Badge = require('../models/Badge');
const UserProgress = require('../models/UserProgress');

const topicsData = require('./topicsData');
const gamesData = require('./gamesData');
const { generateLevelsForGame } = require('./levelsData');

const achievementsData = [
  {
    code: 'FIRST_DETECTIVE',
    title: '🕵️ First Detective',
    description: 'Complete your first phishing detection level.',
    icon: 'search',
    xpBonus: 200,
    rarity: 'Common'
  },
  {
    code: 'VAULT_MASTER',
    title: '🔐 Vault Master',
    description: 'Successfully complete the Password & Account Security district.',
    icon: 'shield',
    xpBonus: 500,
    rarity: 'Rare'
  },
  {
    code: 'QR_HUNTER',
    title: '📱 QR Cyber Tracker',
    description: 'Detect 10 tampered and fraudulent QR codes.',
    icon: 'qr-code',
    xpBonus: 400,
    rarity: 'Rare'
  },
  {
    code: 'FAST_RESPONDER',
    title: '⚡ Fast Responder',
    description: 'Make 5 rapid decisions in under 10 seconds with 100% accuracy.',
    icon: 'zap',
    xpBonus: 450,
    rarity: 'Epic'
  },
  {
    code: 'PERFECT_RUN',
    title: '🏆 Flawless Guardian',
    description: 'Complete a full game without losing a single heart.',
    icon: 'award',
    xpBonus: 600,
    rarity: 'Epic'
  },
  {
    code: 'SEVEN_DAY_DEFENDER',
    title: '🔥 Seven Day Defender',
    description: 'Maintain an active daily cybersecurity streak for 7 consecutive days.',
    icon: 'flame',
    xpBonus: 700,
    rarity: 'Epic'
  },
  {
    code: 'CYBER_GUARDIAN',
    title: '🛡️ Cyber Security Guardian',
    description: 'Conquer all 7 major topics and earn the supreme Master Badge.',
    icon: 'shield-check',
    xpBonus: 2500,
    rarity: 'Legendary'
  }
];

const seedDatabase = async () => {
  try {
    const connectDB = require('../config/db');
    await connectDB();

    // Clear existing collections
    await Topic.deleteMany({});
    await Game.deleteMany({});
    await Level.deleteMany({});
    await Achievement.deleteMany({});
    console.log('[Seed] Cleared existing topics, games, levels, and achievements.');

    // 1. Insert Achievements
    await Achievement.insertMany(achievementsData);
    console.log(`[Seed] Inserted ${achievementsData.length} achievements.`);

    // 2. Insert Topics
    const createdTopics = await Topic.insertMany(topicsData);
    console.log(`[Seed] Inserted ${createdTopics.length} major cybersecurity topics.`);

    // Create a mapping of topicNumber -> Topic document
    const topicMap = {};
    createdTopics.forEach((t) => {
      topicMap[t.topicNumber] = t;
    });

    // 3. Prepare and insert Games
    const gamesToInsert = gamesData.map((g) => {
      const topicDoc = topicMap[g.topicNumber];
      return {
        ...g,
        topicId: topicDoc._id
      };
    });

    const createdGames = await Game.insertMany(gamesToInsert);
    console.log(`[Seed] Inserted ${createdGames.length} mini-games across all 7 topics.`);

    // 4. Generate and insert Levels for all games
    let allLevelsToInsert = [];
    createdGames.forEach((game) => {
      const levels = generateLevelsForGame(game);
      const levelsWithGameId = levels.map((lvl) => ({
        ...lvl,
        gameId: game._id
      }));
      allLevelsToInsert = allLevelsToInsert.concat(levelsWithGameId);
    });

    await Level.insertMany(allLevelsToInsert);
    console.log(`[Seed] Inserted ${allLevelsToInsert.length} interactive levels (10 per game).`);

    // 5. Seed or ensure Demo Users (Admin and realistic leaderboard agents)
    const salt = await bcrypt.genSalt(10);
    const demoPassword = await bcrypt.hash('CyberMaster2026!', salt);

    const defaultAdmin = {
      username: 'Admin_Operator',
      email: 'admin@cyberworld.net',
      password: demoPassword,
      role: 'admin',
      avatar: 'cyber_sentinel',
      level: 1,
      xp: 0,
      totalScore: 0,
      streakDays: 1,
      themePreference: 'neon-purple'
    };

    await User.findOneAndUpdate({ email: defaultAdmin.email }, defaultAdmin, { upsert: true, new: true });
    console.log('[Seed] Admin account ready with 0 score.');

    console.log('\n=========================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('7 Major Topics | 35 Games | 350 Levels');
    console.log('Admin Credentials:');
    console.log('  Email: admin@cyberworld.net | Password: CyberMaster2026!');
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Database seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
