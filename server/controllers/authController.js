const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, avatar, themePreference } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email and password' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || 'cyber_runner',
      themePreference: themePreference || 'neon-purple',
      level: 1,
      xp: 0,
      totalScore: 0,
      streakDays: 1,
      lastPlayedDate: new Date()
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        themePreference: user.themePreference,
        level: user.level,
        xp: user.xp,
        totalScore: user.totalScore,
        streakDays: user.streakDays
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be username or email

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username/email and password' });
    }

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check streak
    const now = new Date();
    const lastActive = new Date(user.lastPlayedDate);
    const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      user.streakDays += 1;
    } else if (diffDays > 1) {
      user.streakDays = 1;
    }
    user.lastPlayedDate = now;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        themePreference: user.themePreference,
        level: user.level,
        xp: user.xp,
        totalScore: user.totalScore,
        streakDays: user.streakDays
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Instant Guest Login (1-click access)
exports.guestLogin = async (req, res) => {
  try {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const guestUsername = `CyberAgent_${randomId}`;
    const guestEmail = `agent_${randomId}@cyberworld.net`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('cyber_guest_2026', salt);

    const user = await User.create({
      username: guestUsername,
      email: guestEmail,
      password: hashedPassword,
      avatar: 'cyber_runner',
      themePreference: 'neon-purple',
      level: 1,
      xp: 150,
      totalScore: 0,
      streakDays: 1,
      lastPlayedDate: new Date()
    });

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        themePreference: user.themePreference,
        level: user.level,
        xp: user.xp,
        totalScore: user.totalScore,
        streakDays: user.streakDays
      }
    });
  } catch (error) {
    console.error('Guest login error:', error);
    res.status(500).json({ success: false, message: 'Could not create guest session' });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error getting user' });
  }
};

// Update theme preference
exports.updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    const allowed = ['neon-purple', 'cyber-red', 'matrix-green', 'clean-cyber', 'soft-digital'];
    if (!allowed.includes(theme)) {
      return res.status(400).json({ success: false, message: 'Invalid theme' });
    }

    req.user.themePreference = theme;
    await req.user.save();

    res.json({ success: true, theme: req.user.themePreference });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating theme' });
  }
};
