# Digital Safety Escape Room – Interactive Cybersecurity Gaming Platform

## 📌 Overview
**Digital Safety Escape Room** is a full-stack, gamified cybersecurity training and escape room platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It transforms vital digital safety education into an engaging, interactive adventure across **7 cybersecurity districts**, **35 escape room games**, and **350 unique levels**. 

Players navigate through hyper-realistic real-life interfaces—including authentic webmail clients, browser address bars, SSL certificate drawers, smartphone messaging apps, and enterprise SOC incident consoles—to detect phishing attacks, audit fake login portals, defend against social engineering, configure cryptographic passphrases, and contain live cyber emergencies. The platform includes a dynamic **Lives & Combo system**, **instant educational explanations**, an animated **Cyber Guide companion**, a **Canvas-generated Holographic Badge system**, and a **Live Global Leaderboard**.

---

## 📖 Definitions

### MERN Stack
Full-stack web development architecture consisting of MongoDB, Express.js, React.js, and Node.js for scalable client-server applications.

### JWT Authentication
Stateless authentication protocol using digitally signed JSON Web Tokens (`jwt.sign` / `jwt.verify`) to verify user identities across API requests.

### Role-Based Access Control (RBAC)
Security mechanism that enforces strict route protection and privileges based on user roles (e.g., Player vs. Administrator).

### REST API
Representational State Transfer interface enabling structured JSON communication between the React frontend client and Express.js backend server.

### React.js
Component-based frontend JavaScript library powering the dynamic game engine, real-life UI viewports, state management, and interactive animations.

### Express.js
Fast, minimalist backend Node.js web framework managing gameplay endpoints, level evaluation, score submissions, and user authentication.

### MongoDB
Document-oriented NoSQL database storing users, district scenarios, level configurations, holographic badge metadata, and live leaderboard data.

### Zero Trust Architecture
Foundational cybersecurity paradigm ("Never Trust, Always Verify") requiring continuous verification of every entity, connection, and credential.

### Phishing & Social Engineering
Deceptive cyber attack vectors where adversaries impersonate trusted organizations (banks, schools, IT support) to manipulate victims into revealing confidential data.

### Typosquatting & Lookalike Domains
Technique where attackers register misspelled domains (e.g., `micros0ft.com`, `paypa1.com`) or manipulate subdomains to deceive unsuspecting users.

### Multi-Factor Authentication (MFA / 2FA)
Multi-layered account defense requiring two or more independent credentials (knowledge, possession, or biometrics) before granting access.

### Cryptographic Entropy
Mathematical measure of randomness and complexity in passwords, determining their resistance against dictionary and brute-force GPU cracking clusters.

### Browser-in-the-Browser (BitB) Attack
Advanced phishing technique where an attacker draws a simulated, fake browser popup window inside an HTML container to mimic legitimate Single Sign-On (SSO) login prompts.

### Adversary-in-the-Middle (AitM)
Sophisticated phishing attack utilizing reverse proxies to intercept user credentials and active session cookies in real time, bypassing traditional SMS/TOTP MFA.

### Optical QR Code Exploitation (Quishing)
Physical or digital tampering where malicious QR codes are pasted over legitimate posters to divert mobile users to credential-harvesting landing pages.

### Incident Command & SOC Triage
Security Operations Center protocol for identifying affected endpoints, isolating compromised network adapters, and mitigating pre-ransomware staging.

### Web Audio API Sound Synthesis
Browser-native audio synthesizer that programmatically generates realistic sci-fi and gaming sound effects (clicks, alarms, combo chimes, victory fanfares) in real time with zero external audio assets.

### Canvas Holographic Badges
Dynamic HTML5 Canvas rendering engine that generates downloadable, cryptographically verifiable high-resolution PNG cybersecurity certificates.

---

## 🚀 Features

### 1. Authentication & Authorization
- Secure user registration and login with bcrypt password hashing
- Stateless JWT authentication with persistent session management
- **⚡ 1-Click Guest Play** mode for instant evaluation without registration
- Role-based route guards protecting Player dashboards and Admin consoles

### 2. 7 Major Cybersecurity Districts (35 Games, 350 Levels)
- **District 1: Inbox District (Phishing & Social Engineering)**
  - *Phishing Detective*: Inspect realistic emails, uncovered senders, urgency traps, and attachments
  - *Fake Login*: Audit lookalike domains, punycodes, and TLS certificate issuers
  - *Social Engineering Chat*: Interactive branching chat against deceptive impostors
  - *Link Inspector*: URL deconstruction (scheme, subdomain, registered domain, path)
  - *Phishing Final Case*: Multi-vector forensic cyber espionage investigation
- **District 2: Security Vault (Password & Account Security)**
  - *Password Fortress*: Passphrase entropy analyzer with real-time crack resistance calculation
  - *Password Attack Simulator*: Brute-force vs. dictionary vs. salted hash cracking speeds
  - *Password Reuse Trap*: Visualizing cascading credential domino breaches across accounts
  - *MFA Defender*: Defending against MFA fatigue, SIM swaps, and AitM reverse proxies
  - *Secure the Vault*: High-security cryptographic vault lockdown
- **District 3: QR Campus (QR Codes & Safe Browsing)**
  - *QR Trap*: Optical scanner identifying physical sticker tampering on campus flyers
  - *Where Does This QR Go?*: Decoded endpoint sandbox preview before loading
  - *Fake Website*: Identifying counterfeit scholarship and financial aid portals
  - *QR Challenge Rush*: Rapid classification rounds with combo multipliers
  - *Campus QR Mystery*: Interactive campus map physical security investigation
- **District 4: Chat Zone (Scam Messages & Online Fraud)**
  - *Scam Chat*: SMS/iMessage interface with Block, Report, and Verify options
  - *Scam or Safe?*: Fast-paced message classifier
  - *Fake Offer*: Scrutinizing fraudulent remote internships and grant luring
  - *Impersonation Game*: Detecting AI voice cloning, CEO fraud, and distress hoaxes
  - *Scam Interceptor*: Emergency fraud response and credential recovery triage
- **District 5: Privacy Lab (Privacy & Personal Data)**
  - *Data Detective*: Confidential vs. Public data classification
  - *Privacy Settings*: Social media profile hardening and tracking toggle audits
  - *App Permission Manager*: Auditing camera, microphone, and background location permissions
  - *Oversharing Trap*: Spotting sensitive badges, barcodes, and itineraries in social photos
  - *Privacy Lockdown*: Comprehensive personal digital footprint purge
- **District 6: Device Hub (Device & Digital Security)**
  - *Secure My Phone*: Mobile operating system hardening and biometric locking
  - *Safe or Suspicious App*: Sideloaded APK sandbox and package signature analysis
  - *Public Wi-Fi*: Evil Twin hotspot detection and encrypted VPN tunneling
  - *Update Alert*: Authentic operating system patches vs. trojanized update popups
  - *Device Rescue*: Compromised endpoint malware containment and recovery
- **District 7: Emergency Center (Cyber Emergency Response)**
  - *You Clicked the Link*: Immediate post-click network isolation and triage
  - *Account Compromised*: Active session termination and OAuth token revocation
  - *Lost Phone*: Remote wipe, device locking, and eSIM carrier suspension
  - *Payment Scam*: Debit freeze, charge disputes, and IC3 cybercrime report filing
  - *Cyber Emergency (The Final Escape Room)*: Simultaneous multi-threat crisis with countdown timer

### 3. Hyper-Realistic Real-Life Simulated Interfaces
- **Authentic Google Chrome & Gmail Client**: Pure white email body (`bg-white`), realistic headers, sender avatars, TLS popover, attachment cards, and a real-life bottom-left destination URL preview status bar on hover
- **Google Chrome / Edge Browser Window**: Window tab bar with brand favicons (Microsoft, Google, PayPal, Apple, Discord, Steam), padlock SSL certificate drawer, and branded sign-in cards
- **Smartphone Messaging Interface**: Realistic iPhone / WhatsApp UI with 9:41 AM status bar, Dynamic Island, unknown sender warning banner, clean white chat bubbles, and typing dots
- **Browser Address Bar Deconstruction**: Omnibox breakdown isolating Protocol, Subdomain, Target Registered Domain, and Resource Path
- **Password Entropy Vault**: Apple Keychain and Google Password Manager audit with show/hide password toggle, dynamic crack time calculations, and NIST 800-63B standards
- **Optical QR Camera Viewfinder**: Realistic mobile camera viewfinder with Auto Flash, zoom pills, shutter button, and Safari QR link pill pointing at a printed paper flyer
- **Enterprise SOC Incident Console**: CrowdStrike Falcon / Microsoft Defender style console with SEV-1 Critical badge, affected host telemetry, and containment procedures

### 4. Gamification & Escape Room Mechanics
- **Lives System**: 3 Hearts (`❤️ ❤️ ❤️`) per stage with instant retry upon depletion
- **Combo Multipliers**: Consecutive correct defensive actions trigger up to 4x score multipliers
- **Speed Bonus Timer**: Timed stages reward rapid threat neutralization
- **Tactical Intel Hints**: Contextual hints available when evaluating complex attack vectors
- **Instant Educational Explanations**: Immediate feedback explaining *why* decisions are safe or risky
- **Animated Cyber Guide ("Cipher")**: Expressive companion reacting with live moods (idle, cheering, warning, thinking)
- **Web Audio Sound Effects**: Custom synthesized audio with instant mute toggle

### 5. Holographic Cyber Badge System
- 7 District Badges awarded upon completing all 5 escape rooms in a topic
- Master **"Cyber Security Guardian"** Grand Badge awarded upon completing all 35 rooms
- **Dynamic Star Ratings (1–5 Stars)**: Strictly determined by accuracy percentage (90%+ = 5 Stars)
- **HTML5 Canvas Exporter**: Generates downloadable, high-resolution holographic PNG badges featuring the player's name, completion date, and unique cryptographic verification ID
- **Public Badge Verification**: Lookup tool to verify badge authenticity and score history

### 6. Live Global Leaderboard & Progression
- Real-time Leaderboard with verified user rankings, XP, rooms cleared, and badges earned (strictly genuine user data)
- Filterable views: Global All-Time, Weekly, and District-specific rankings
- XP Level Progression bar with dynamic tier progression
- Daily Cybersecurity Training Streak tracking

### 7. Administrator Command Dashboard
- Centralized administrative dashboard with platform analytics
- High-level metrics: Total Registered Agents, Completed Rooms, Minted Badges, and Platform Accuracy
- Security scenario monitoring and audit attempt telemetry
- Role-protected administrative routes

---

## 🛠️ Technologies Used

### Frontend
- **React.js (v18)** – Interactive component architecture
- **Vite** – Ultra-fast build tool and development server
- **Tailwind CSS** – Custom cybersecurity dark/neon theme & photorealistic light UI styling
- **Lucide React** – Modern, clean icon library
- **HTML5 Canvas API** – Dynamic holographic certificate badge generation & PNG export
- **Web Audio API** – Programmatic sci-fi sound synthesis
- **Canvas Confetti** – Victory particle animation effects

### Backend
- **Node.js** – Server runtime environment
- **Express.js** – RESTful API routing and middleware
- **MongoDB & Mongoose** – NoSQL database and schema modeling
- **JSON Web Tokens (JWT)** – Stateless authentication and session security
- **bcryptjs** – Secure one-way password hashing
- **CORS** – Dynamic origin filtering for local and production domains
- **Dotenv** – Environment variable management

### Cloud & Deployment
- **Vercel** – Global edge frontend deployment with SPA routing (`vercel.json`)
- **Render** – Managed backend web service deployment
- **MongoDB Atlas** – Cloud-hosted, high-availability database cluster

---

## ⚙️ How to Run (Short)

### 1. Clone Project
```bash
git clone https://github.com/kruthikajakkidi/Digital_Safety_Escape_Room__.git
cd Digital_Safety_Escape_Room
```

### 2. Configure Environment Variables
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

### 3. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds 7 Topics, 35 Games, and 350 Levels
npm run dev      # Starts API on http://localhost:5000
```

### 4. Frontend Setup
```bash
cd ../client
npm install
npm run dev      # Starts app on http://localhost:5173
```

### 5. Open the Application
- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Type |
|---|---|---|---|
| **Player** | `kruthika@cyberworld.net` | `CyberMaster2026!` | Standard Escape Room Access |
| **Admin** | `admin@cyberworld.net` | `CyberMaster2026!` | Full Admin Dashboard & Analytics |
| **Instant Play** | *N/A* | *N/A* | Click **⚡ 1-Click Guest Access** on Login Page |

---

## 🌐 Live Deployments

- **Frontend (Vercel)**: [https://digital-safety-escape-room-dusky.vercel.app](https://digital-safety-escape-room-dusky.vercel.app)
- **Backend API (Render)**: [https://digital-safety-escape-room-9s6d.onrender.com](https://digital-safety-escape-room-9s6d.onrender.com)
- **GitHub Repository**: [https://github.com/kruthikajakkidi/Digital_Safety_Escape_Room__.git](https://github.com/kruthikajakkidi/Digital_Safety_Escape_Room__.git)

