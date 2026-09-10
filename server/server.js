const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Origins allowed for CORS (Local development, Vercel frontend, Render backend)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://digital-safety-escape-room-9s6d.onrender.com'
  
];

if (process.env.CLIENT_URL) {
  const envOrigins = process.env.CLIENT_URL.split(',').map(u => u.trim().replace(/\/+$/, '')).filter(Boolean);
  allowedOrigins.push(...envOrigins);
}

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (Postman, server-to-server, curl, health checks)
    if (!origin) return callback(null, true);

    // Allow explicitly defined origins (localhost, custom CLIENT_URL)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Automatically allow any Vercel deployed URL (*.vercel.app)
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Automatically allow any Render deployed URL (*.onrender.com)
    if (/^https:\/\/.*\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }

    // In development mode, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/badges', require('./routes/badgeRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', platform: 'Digital Safety Escape Room API', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Digital Safety Escape Room running on port ${PORT}`);
});
