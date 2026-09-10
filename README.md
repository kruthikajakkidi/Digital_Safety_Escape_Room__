# Digital Safety Escape Room — Interactive Cybersecurity Learning & Gaming Platform

A cyberpunk web application that transforms cybersecurity education into an interactive escape room experience. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

---

## 🚀 Key Features

### 1. 7 Major Cybersecurity Districts & 35 Escape Rooms (10 Levels Each)
- **District 1: Inbox District (Phishing & Social Engineering)**
  - *Phishing Detective*: Interactive email red-flag inspector
  - *Fake Login*: Live browser URL and SSL certificate audit
  - *Social Engineering Chat*: Interactive branching chat simulator
  - *Link Inspector*: URL deconstruction (scheme, subdomain, domain, path)
  - *Phishing Final Case*: Multi-vector forensic case
- **District 2: Security Vault (Password & Account Security)**
  - *Password Fortress*: Live passphrase entropy analyzer and vault door visual
  - *Password Attack Simulator*: Brute-force vs dictionary vs salt demonstrator
  - *Password Reuse Trap*: Cascading account breach domino visualizer
  - *MFA Defender*: Multi-factor defense matrix
  - *Secure the Vault*: High-security vault lockdown
- **District 3: QR Campus (QR Codes & Safe Browsing)**
  - *QR Trap*: Optical poster scanner and tampering inspector
  - *Where Does This QR Go?*: Decoded endpoint sandbox preview
  - *Fake Website*: Counterfeit portal and scholarship audit
  - *QR Challenge Rush*: Speed classification round with combo multipliers
  - *Campus QR Mystery*: Interactive campus map investigation
- **District 4: Chat Zone (Scam Messages & Online Fraud)**
  - *Scam Chat*: SMS/messaging interface with Block, Report, and Verify
  - *Scam or Safe?*: Fast-paced swipe classifier
  - *Fake Offer*: Scrutinizing fraudulent remote internships and grants
  - *Impersonation Game*: Unmasking AI voice clones and distress hoaxes
  - *Scam Interceptor*: Emergency fraud response triage
- **District 5: Privacy Lab (Privacy & Personal Data)**
  - *Data Detective*: Confidential vs Public data classifier
  - *Privacy Settings*: Profile hardening and tracking dials
  - *App Permission Manager*: Camera/mic/contact permission audit
  - *Oversharing Trap*: Spotting leaked tokens in social media feeds
  - *Privacy Lockdown*: Complete digital footprint purge
- **District 6: Device Hub (Device & Digital Security)**
  - *Secure My Phone*: Mobile OS hardening and PIN controls
  - *Safe or Suspicious App*: APK installer sandbox analysis
  - *Public Wi-Fi*: Evil twin hotspot detector and VPN tunnel
  - *Update Alert*: Authentic patch verifier vs malware popups
  - *Device Rescue*: Compromised host remediation
- **District 7: Emergency Center (Cyber Emergency Response)**
  - *You Clicked the Link*: Post-click network isolation and triage
  - *Account Compromised*: Session termination and token revocation
  - *Lost Phone*: Remote lock and carrier eSIM suspension
  - *Payment Scam*: Card freeze, charge dispute, and IC3 report filing
  - *Cyber Emergency (The Final Escape Room)*: Simultaneous multi-threat crisis with countdown timer

---

### 2. Holographic Cyber Badge System (Instead of Paper Certificates)
- **7 Topic Badges**: Awarded upon clearing all 5 escape rooms in a district.
- **🛡️ CYBER SECURITY GUARDIAN Grand Badge**: Awarded upon conquering all 7 topics.
- **Dynamic Star Rating**: Calculated strictly from score percentage:
  - ★★★★★: 90–100%
  - ★★★★☆: 75–89%
  - ★★★☆☆: 60–74%
  - ★★☆☆☆: 40–59%
  - ★☆☆☆☆: Below 40%
- **Downloadable High-Res PNG**: Built-in Canvas 2D exporter generating holographic badges.
- **Cryptographic Verification ID**: Unique verifiable codes with a public badge verification lookup tool.

---

### 3. Gameplay Mechanics & Companion
- **Lives System**: 3 Hearts (`❤️ ❤️ ❤️`). Wrong moves deduct hearts; losing all 3 allows instant retry without frustration.
- **Instant Educational Explanations**: Immediate feedback explaining *why* decisions are safe or dangerous.
- **Animated Cyber Guide ("Cipher")**: Contextual companion with expressive moods (idle, cheering, warning, thinking).
- **Audio Synthesizer**: Pure Web Audio API synthesized sci-fi tones (clicks, success chimes, alarms, badge fanfares) with mute toggle.
- **5 Themes**: Neon Purple, Cyber Red, Matrix Green, Clean Cyber, and Soft Digital.
- **Leaderboards**: Global, Weekly, and Topic rankings with current user highlight.
- **XP, Levels & Daily Streak**: Level progression bar and daily cybersecurity streak tracking.
- **Admin Dashboard**: Analytics, attempt logs, and scenario management.

---

## 🛠️ Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB (running on `localhost:27017`)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Database (7 Topics, 35 Games, 350 Levels)
```bash
npm run seed
```

### 3. Start Development Servers (Backend + Frontend)
```bash
# In the root folder:
npm run server  # Starts Express API on http://localhost:5000
npm run client  # Starts Vite frontend on http://localhost:5173
```
Or simultaneously:
```bash
npm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Player** | `kruthika@cyberworld.net` | `CyberMaster2026!` |
| **Admin** | `admin@cyberworld.net` | `CyberMaster2026!` |
| **Guest Access** | Use **⚡ 1-Click Guest Access** on the login page for instant play! |
