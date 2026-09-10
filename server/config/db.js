const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dns = require('dns');

// Configure reliable DNS servers (Google / Cloudflare) to prevent SRV lookup failures on Windows/ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom dns is restricted in environment
}

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_safety_escape_room';

  // Auto-fix: If password contains unencoded '@' character (e.g. user:Abhi@1201@cluster...)
  // The last '@' before cluster hostname should separate credentials from host.
  const srvMatch = mongoUri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):(.*)@([^@]+)$/);
  if (srvMatch) {
    const [_, prefix, username, rawPassword, hostAndParams] = srvMatch;
    // Encode any unencoded @ in password to %40
    const encodedPassword = encodeURIComponent(decodeURIComponent(rawPassword));
    mongoUri = `${prefix}${username}:${encodedPassword}@${hostAndParams}`;
  }

  // Ensure default database name if none specified in Atlas URI
  if (mongoUri.includes('mongodb+srv://') && !mongoUri.match(/mongodb\.net\/([^?]+)/)) {
    mongoUri = mongoUri.replace('mongodb.net/?', 'mongodb.net/digital_safety_escape_room?');
    if (!mongoUri.includes('/digital_safety_escape_room')) {
      mongoUri = mongoUri.replace('mongodb.net/', 'mongodb.net/digital_safety_escape_room');
    }
  }

  // Safely mask password in logs for cloud MongoDB Atlas URLs
  const maskedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:*****@');

  try {
    console.log(`[Database] Connecting to MongoDB (Atlas/Local): ${maskedUri}`);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      autoIndex: true
    });
    console.log(`[Database] ✓ Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database] ✕ MongoDB Connection Error: ${error.message}`);
    console.error(`[Database] Check your MONGO_URI in server/.env (e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/digital_safety_escape_room)`);
    process.exit(1);
  }
};

module.exports = connectDB;
