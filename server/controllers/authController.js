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

// Google OAuth Login / Register
exports.googleLogin = async (req, res) => {
  try {
    const { credential, email: directEmail, name: directName, googleId: directGoogleId, picture: directPicture } = req.body;

    let email = directEmail;
    let name = directName;
    let googleId = directGoogleId;
    let picture = directPicture;

    // If Google Identity Services JWT credential string is provided, verify or decode payload
    if (credential) {
      try {
        // 1. Attempt official Google token verification via Google's tokeninfo endpoint
        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (googleRes.ok) {
          const verifiedPayload = await googleRes.json();
          email = verifiedPayload.email;
          name = verifiedPayload.name || verifiedPayload.given_name;
          googleId = verifiedPayload.sub;
          picture = verifiedPayload.picture;
        } else {
          // 2. Fallback to decoding JWT payload directly
          const decoded = jwt.decode(credential);
          if (decoded) {
            email = decoded.email;
            name = decoded.name || decoded.given_name;
            googleId = decoded.sub;
            picture = decoded.picture;
          }
        }
      } catch (verifyErr) {
        // Fallback to decode if offline or fetch fails
        try {
          const decoded = jwt.decode(credential);
          if (decoded) {
            email = decoded.email;
            name = decoded.name || decoded.given_name;
            googleId = decoded.sub;
            picture = decoded.picture;
          }
        } catch (decodeErr) {
          console.warn('Could not decode Google JWT credential token:', decodeErr);
        }
      }
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google account email is required' });
    }

    email = email.toLowerCase().trim();

    // Check if user already exists with this email or googleId
    let user = await User.findOne({
      $or: [
        { email },
        ...(googleId ? [{ googleId }] : [])
      ]
    });

    if (user) {
      // Link googleId or picture if not present
      if (!user.googleId && googleId) user.googleId = googleId;
      if (picture && !user.profilePicture) user.profilePicture = picture;

      // Update streak
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
    } else {
      // Create new user from Google profile
      let baseUsername = (name || email.split('@')[0]).replace(/[^a-zA-Z0-9_]/g, '');
      if (baseUsername.length < 3) baseUsername = `Agent_${baseUsername}`;
      
      // Ensure unique username
      let finalUsername = baseUsername;
      let counter = 1;
      while (await User.findOne({ username: finalUsername })) {
        finalUsername = `${baseUsername}_${counter}`;
        counter++;
      }

      user = await User.create({
        username: finalUsername,
        email,
        googleId: googleId || `goog_${Date.now()}`,
        profilePicture: picture || null,
        avatar: 'cyber_runner',
        themePreference: 'neon-purple',
        level: 1,
        xp: 250, // Welcome bonus XP
        totalScore: 0,
        streakDays: 1,
        lastPlayedDate: new Date()
      });
    }

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
        profilePicture: user.profilePicture,
        themePreference: user.themePreference,
        level: user.level,
        xp: user.xp,
        totalScore: user.totalScore,
        streakDays: user.streakDays
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ success: false, message: 'Server error processing Google authentication' });
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
