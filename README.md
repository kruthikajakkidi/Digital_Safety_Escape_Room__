# Digital Safety Escape Room – Cybersecurity Training Platform

## 📌 Overview
Digital Safety Escape Room is a full-stack cybersecurity training and simulation platform built using the MERN stack. It transforms digital safety and defense education into an interactive escape room experience featuring 7 cybersecurity districts, 35 escape rooms, 350 challenges, realistic simulated interfaces (email, browser, chat, mobile), and a verifiable holographic badge system.
 
---

## 🚀 Features

### 1. Authentication & Security
- Secure registration and login using JWT authentication
- Password hashing with bcrypt
- 1-Click Guest Access for instant evaluation
- Role-based protection for Players and Administrators

### 2. Cybersecurity Escape Rooms (7 Districts & 35 Games)
- Phishing Detective & Email Inspector (District 1)
- Fake Login & Domain Typosquatting Audits (District 1)
- Social Engineering & Scam Chat Simulator (District 1 & 4)
- Password Fortress & Passphrase Entropy Analyzer (District 2)
- MFA & Two-Factor Defense Simulator (District 2)
- QR Code Tampering & Optical Scanner (District 3)
- Privacy Lab & App Permission Auditing (District 5)
- Device Hardening & Public Wi-Fi Defense (District 6)
- Emergency Incident Triage & Live Crisis Response (District 7)

### 3. Hyper-Realistic Simulated Interfaces
- Realistic Google Chrome browser window with tab favicons & omnibox
- Realistic Gmail webmail interface with white background and link hover preview
- Realistic smartphone messaging screen (iOS / WhatsApp style)
- Real-life SSL padlock certificate inspection drawer
- Smartphone camera viewfinder for QR scanning
- Enterprise SOC incident command console

### 4. Gameplay & Escape Room Mechanics
- Lives system: 3 Hearts per stage with instant retry
- Combo multipliers up to 4x for consecutive correct choices
- Timed speed bonus challenges
- Instant tactical intel hints
- Immediate educational explanations for all choices
- Animated Cyber Guide companion ("Cipher") with dynamic moods
- Browser-synthesized Web Audio sound effects

### 5. Holographic Cyber Badge System
- 7 District completion badges
- Master "Cyber Security Guardian" Grand Badge
- Star ratings (1 to 5 Stars) based strictly on accuracy
- Downloadable high-resolution holographic PNG badges via HTML5 Canvas
- Public cryptographic badge verification system

### 6. Leaderboard & Player Progression
- Live Global Leaderboard with real-time player rankings
- All-Time, Weekly, and District ranking filters
- XP levels, ranks, and daily training streaks
- Genuine player data with zero fake sample users

### 7. Administrator Command Dashboard
- Control panel to monitor registered agents and platform activities
- Global metrics: completed escape rooms, accuracy rates, and minted badges
- Scenario audit attempt telemetry and security logs

---

## 🛠️ Technologies Used
- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- HTML5 Canvas API (Holographic Badges)
- Web Audio API (Synthesized SFX)
- REST APIs
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

---

## ⚙️ How to Run (Short)

### Clone Project
```bash
git clone https://github.com/kruthikajakkidi/Digital_Safety_Escape_Room__.git
cd Digital_Safety_Escape_Room
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Open App
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5000](http://localhost:5000)

### Add `.env`
Make sure both frontend and backend `.env` files are configured before running.

**Backend (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/digital_safety_escape_room
JWT_SECRET=cyber_escape_room_secret_key_2026
CLIENT_URL=http://localhost:5173
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=/api
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Player** | `kruthika@cyberworld.net` | `CyberMaster2026!` |
| **Admin** | `admin@cyberworld.net` | `CyberMaster2026!` |
| **Guest** | Click **⚡ 1-Click Guest Access** on the login page |

---

## 🌐 Live Deployments
- **Frontend (Vercel)**: [https://digital-safety-escape-room-dusky.vercel.app](https://digital-safety-escape-room-dusky.vercel.app)
- **Backend (Render)**: [https://digital-safety-escape-room-9s6d.onrender.com](https://digital-safety-escape-room-9s6d.onrender.com)

