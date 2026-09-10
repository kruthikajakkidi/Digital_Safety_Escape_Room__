const mongoose = require('mongoose');
const http = require('http');

const runApiTests = async () => {
  console.log('--- Starting Digital Safety Escape Room API Sanity Tests ---');

  // Start express server programmatically for testing
  const express = require('express');
  const cors = require('cors');
  const dotenv = require('dotenv');
  dotenv.config();

  const connectDB = require('./config/db');
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/topics', require('./routes/topicRoutes'));
  app.use('/api/games', require('./routes/gameRoutes'));
  app.use('/api/progress', require('./routes/progressRoutes'));
  app.use('/api/badges', require('./routes/badgeRoutes'));
  app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5001, resolve));
  console.log('✓ Test server listening on port 5001');

  const post = async (url, data, token) => {
    const res = await fetch(`http://localhost:5001${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return res.json();
  };

  const get = async (url, token) => {
    const res = await fetch(`http://localhost:5001${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.json();
  };

  // Test 1: Guest Login
  const guestRes = await post('/api/auth/guest', {});
  if (!guestRes.success || !guestRes.token) throw new Error('Guest login failed');
  const token = guestRes.token;
  console.log(`✓ Guest Login Success: Username ${guestRes.user.username}`);

  // Test 2: Fetch all 7 topics
  const topicsRes = await get('/api/topics', token);
  if (!topicsRes.success || topicsRes.topics.length !== 7) {
    throw new Error(`Expected 7 topics, got ${topicsRes.topics?.length}`);
  }
  console.log(`✓ Fetched 7 Cybersecurity Topics successfully (Topic 1: ${topicsRes.topics[0].title})`);

  // Test 3: Fetch Topic Details & its 5 Games
  const topicDetails = await get('/api/topics/phishing-social-engineering', token);
  if (!topicDetails.success || topicDetails.games.length !== 5) {
    throw new Error(`Expected 5 games in Topic 1, got ${topicDetails.games?.length}`);
  }
  console.log(`✓ Topic Details Verified: 5 Games present (${topicDetails.games.map(g => g.title).join(', ')})`);

  // Test 4: Fetch Game Levels
  const gameRes = await get('/api/games/phishing-detective', token);
  if (!gameRes.success || gameRes.levels.length !== 10) {
    throw new Error(`Expected 10 levels, got ${gameRes.levels?.length}`);
  }
  console.log(`✓ Game Details Verified: 10 Stages found for ${gameRes.game.title}`);

  // Test 5: Submit Level Result
  const level1 = gameRes.levels[0];
  const submitRes = await post('/api/progress/submit-level', {
    gameId: gameRes.game._id,
    levelNumber: 1,
    scoreEarned: 180,
    livesRemaining: 3,
    passed: true
  }, token);
  if (!submitRes.success || !submitRes.passed) throw new Error('Submit level failed');
  console.log(`✓ Level 1 submitted successfully! Score: ${submitRes.scoreEarned}, XP earned: ${submitRes.xpEarned}`);

  // Test 6: Dashboard stats
  const dashRes = await get('/api/progress/dashboard-stats', token);
  if (!dashRes.success || dashRes.stats.totalPossibleLevels !== 350) {
    throw new Error('Dashboard stats verification failed');
  }
  console.log(`✓ Dashboard Stats: Levels Completed = ${dashRes.stats.completedLevelsCount}, Score = ${dashRes.stats.totalScoreEarned}`);

  // Test 7: Leaderboard
  const lbRes = await get('/api/leaderboard?type=global', token);
  if (!lbRes.success || lbRes.leaderboard.length === 0) {
    throw new Error('Leaderboard fetch failed');
  }
  console.log(`✓ Leaderboard verified with ${lbRes.leaderboard.length} ranked agents. Top agent: ${lbRes.leaderboard[0].username} with ${lbRes.leaderboard[0].score} pts`);

  server.close();
  await mongoose.disconnect();
  console.log('🎉 ALL API SANITY TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
};

runApiTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
