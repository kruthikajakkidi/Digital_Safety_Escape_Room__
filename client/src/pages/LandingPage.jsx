import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Award, Flame, Zap, ArrowRight, CheckCircle2, 
  Terminal, Lock, QrCode, Mail, Smartphone, AlertTriangle, 
  Sparkles, Star, ChevronRight, Eye, Trophy, Play, Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { CyberCharacter } from '../components/companion/CyberCharacter';

export const LandingPage = () => {
  const { guestLogin } = useAuth();
  const { play } = useSound();
  const navigate = useNavigate();

  const [loadingGuest, setLoadingGuest] = useState(false);
  const [activeDistrictTab, setActiveDistrictTab] = useState(0);
  const [demoRedFlagClicked, setDemoRedFlagClicked] = useState(false);

  const handleGuestAccess = async () => {
    play.click();
    setLoadingGuest(true);
    try {
      await guestLogin();
      play.success();
      navigate('/');
    } catch (err) {
      console.error('Guest access failed:', err);
      navigate('/login');
    } finally {
      setLoadingGuest(false);
    }
  };

  const districts = [
    {
      num: '01',
      title: 'Phishing & Social Engineering',
      district: 'Inbox District',
      icon: Mail,
      color: '#a855f7',
      badge: 'Phishing Sentinel Badge',
      desc: 'Inspect spoofed sender addresses, artificial urgency, and weaponized macros. Scrutinize email headers, fake login portals, and deceptive phone messages.',
      games: ['Phishing Detective', 'Fake Login Auditor', 'Social Engineering Chat', 'Link Inspector', 'Phishing Final Case']
    },
    {
      num: '02',
      title: 'Password & Account Security',
      district: 'Security Vault',
      icon: Lock,
      color: '#3b82f6',
      badge: 'Vault Architect Badge',
      desc: 'Build unbreakable passphrases, analyze entropy against GPU dictionary crackers, stop credential stuffing cascades, and orchestrate hardware MFA defense.',
      games: ['Password Fortress', 'Password Attack Simulator', 'Password Reuse Trap', 'MFA Defender', 'Secure the Vault']
    },
    {
      num: '03',
      title: 'QR Codes & Safe Browsing',
      district: 'QR Campus',
      icon: QrCode,
      color: '#10b981',
      badge: 'QR Cyber Tracker Badge',
      desc: 'Scan physical flyers for tamper sticker overlays (Quishing), triage decoded endpoints in a sandbox, and navigate the campus map to locate rogue QR codes.',
      games: ['QR Trap', 'Where Does This QR Go?', 'Fake Website Audit', 'QR Challenge Rush', 'Campus QR Mystery']
    },
    {
      num: '04',
      title: 'Scam Messages & Online Fraud',
      district: 'Chat Zone',
      icon: AlertTriangle,
      color: '#f97316',
      badge: 'Fraud Interceptor Badge',
      desc: 'Block delivery notification smishing, unmask fake remote internship contracts, detect AI-cloned voice emergencies, and intercept multi-stage extortion scams.',
      games: ['Scam Chat Simulator', 'Scam or Safe Swipe', 'Fake Offer Inspector', 'Impersonation Game', 'Scam Interceptor']
    },
    {
      num: '05',
      title: 'Privacy & Personal Data',
      district: 'Privacy Lab',
      icon: Eye,
      color: '#06b6d4',
      badge: 'Data Shield Guardian Badge',
      desc: 'Sort public vs confidential tokens, audit excessive camera and contact permissions on mobile apps, and eliminate background oversharing in social media photos.',
      games: ['Data Detective', 'Privacy Settings Hardening', 'App Permission Manager', 'Oversharing Trap', 'Privacy Lockdown']
    },
    {
      num: '06',
      title: 'Device & Digital Security',
      district: 'Device Hub',
      icon: Smartphone,
      color: '#ec4899',
      badge: 'Device Hardener Badge',
      desc: 'Harden mobile operating systems with biometric fallbacks and SIM PINs, identify unencrypted evil twin Wi-Fi honeypots, and verify authentic OS security patches.',
      games: ['Secure My Phone', 'Safe or Suspicious App', 'Public Wi-Fi Sentinel', 'Update Alert Verifier', 'Device Rescue Remediation']
    },
    {
      num: '07',
      title: 'Cyber Emergency Response',
      district: 'Emergency Center (Final Boss)',
      icon: Terminal,
      color: '#ef4444',
      badge: 'Incident Responder Badge',
      desc: 'The ultimate escape room! Perform crisis triage after clicking a malicious link, terminate hijacked sessions, remote-wipe lost devices, and resolve multi-vector breaches.',
      games: ['You Clicked the Link', 'Account Compromised', 'Lost Phone Containment', 'Payment Scam Triage', 'Cyber Emergency (Final Room)']
    }
  ];

  return (
    <div className="w-full space-y-16 pb-20 select-none animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 cyber-panel border-cyber-border shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Cyber Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyber-primary/20 blur-[130px] pointer-events-none" />

          {/* Left Hero Content */}
          <div className="space-y-6 max-w-2xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-cyber-primary/20 text-cyan-300 border border-cyber-primary/40 shadow-neon-sm">
              <Sparkles className="w-4 h-4 text-cyber-primary animate-pulse" />
              <span>INTERACTIVE CYBER DEFENSE PLATFORM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cyber font-black tracking-wide text-white leading-tight">
              MASTER CYBER SAFETY THROUGH <span className="text-cyber-primary drop-shadow-[0_0_20px_var(--cyber-primary-glow)]">IMMERSIVE ESCAPE ROOMS</span>
            </h1>

            <p className="text-sm sm:text-base font-mono text-cyber-muted leading-relaxed">
              No boring generic quizzes. Infiltrate <strong>7 Cyber Districts</strong> and <strong>35 Hands-On Mini-Games</strong>. Audit real-time phishing emails, dissect rogue QR codes, fortify cryptographic vaults, and earn verifiable <strong>Holographic Cyber Badges</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleGuestAccess}
                disabled={loadingGuest}
                className="px-7 py-3.5 rounded-xl font-mono text-sm font-bold bg-gradient-to-r from-cyan-500 to-cyber-primary hover:from-cyan-400 hover:to-cyber-primary/90 text-black shadow-neon flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{loadingGuest ? 'Initializing Access...' : '⚡ 1-Click Instant Guest Play'}</span>
              </button>

              <Link
                to="/login"
                onClick={() => play.click()}
                className="px-6 py-3.5 rounded-xl font-mono text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition-all"
              >
                <span>Sign In to Mainframe</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/register"
                onClick={() => play.click()}
                className="px-5 py-3.5 rounded-xl font-mono text-xs font-bold text-cyber-muted hover:text-white transition-colors"
              >
                New Operator Registration →
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-cyber-border/40 text-left font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-cyber font-bold text-white">7</div>
                <div className="text-[11px] text-cyber-muted">Major Districts</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-cyber font-bold text-cyber-primary">35</div>
                <div className="text-[11px] text-cyber-muted">Escape Games</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-cyber font-bold text-emerald-400">350</div>
                <div className="text-[11px] text-cyber-muted">Progressive Stages</div>
              </div>
            </div>
          </div>

          {/* Right Hero: Guide Companion & Interactive Micro-Demo */}
          <div className="z-10 flex flex-col items-center space-y-6 shrink-0 w-full lg:w-auto">
            <CyberCharacter
              mood="cheering"
              message="Welcome, prospective Agent! Test your security reflexes before entering."
              size="lg"
              showBubble={true}
            />

            {/* Interactive Sneak Peek Widget */}
            <div className="w-full max-w-sm p-4 rounded-2xl cyber-panel border border-cyber-border/70 text-left font-mono text-xs space-y-2 shadow-xl animate-holo">
              <div className="flex items-center justify-between text-[10px] text-cyber-secondary font-bold">
                <span>INTERACTIVE SAMPLE: PHISHING AUDIT</span>
                <span className="text-amber-400">LIVE PREVIEW</span>
              </div>
              <p className="text-cyber-text text-[11px]">
                Sender: <code className="text-cyan-300">support@netflx-verify-billing.com</code>
              </p>
              <button
                type="button"
                onClick={() => {
                  setDemoRedFlagClicked(true);
                  play.success();
                }}
                className={`w-full p-2 rounded-lg text-left transition-all ${
                  demoRedFlagClicked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-white/5 hover:bg-white/10 text-rose-300 border border-rose-500/30'
                }`}
              >
                {demoRedFlagClicked
                  ? '✓ Red Flag Spotted: "netflx" is missing the "i" — Spoofed Domain!'
                  : '🔍 Tap to inspect suspicious lookalike domain'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "WHAT TO EXPECT" FEATURE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            CORE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-cyber font-black tracking-wider text-white">
            What You Can Expect Inside
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyber-muted">
            Designed as a high-tech cybersecurity gaming world where real defense skills are developed through hands-on gameplay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyber-primary/20 border border-cyber-primary/50 flex items-center justify-center text-cyber-primary">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              Hands-On Interaction (Not MCQs)
            </h3>
            
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              Holographic Cyber Badges
            </h3>
           
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              3 Hearts & Combos System
            </h3>
          
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              Instant Explanations on Every Move
            </h3>
            
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              Global & Weekly Leaderboards
            </h3>
           
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/60 space-y-3 shadow-cyber-card hover:border-cyber-primary transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              5 Switchable Cyberpunk Themes
            </h3>
            
          </div>
        </div>
      </section>

      {/* 3. THE 7 DISTRICTS INTERACTIVE EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyber-primary uppercase tracking-widest block">
            CYBER CITY MAP
          </span>
          <h2 className="text-2xl sm:text-4xl font-cyber font-black tracking-wider text-white">
            Explore All 7 Major Districts
          </h2>
          
        </div>

        {/* District Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {districts.map((d, index) => (
            <button
              key={d.num}
              onClick={() => {
                setActiveDistrictTab(index);
                play.click();
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                activeDistrictTab === index
                  ? 'bg-cyber-primary text-white shadow-neon-sm scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-cyber-muted hover:text-white border border-white/10'
              }`}
            >
              {d.num}. {d.district}
            </button>
          ))}
        </div>

        {/* Active District Card */}
        {(() => {
          const cur = districts[activeDistrictTab];
          const IconComp = cur.icon;
          return (
            <div className="rounded-3xl p-8 sm:p-10 cyber-panel border border-cyber-border shadow-2xl relative overflow-hidden animate-fade-in space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-cyber-border/40 pb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg shrink-0 border"
                    style={{
                      background: `${cur.color}22`,
                      borderColor: `${cur.color}88`,
                      color: cur.color
                    }}
                  >
                    <IconComp className="w-8 h-8" />
                  </div>
                  <div>
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase border"
                      style={{ color: cur.color, borderColor: `${cur.color}66`, background: `${cur.color}15` }}
                    >
                      DISTRICT {cur.num} • {cur.district}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-cyber font-black text-white mt-1">
                      {cur.title}
                    </h3>
                  </div>
                </div>

                <div className="text-left md:text-right font-mono text-xs">
                  <span className="text-cyber-muted block">HOLOGRAPHIC REWARD:</span>
                  <span className="text-amber-400 font-bold text-sm">★ {cur.badge}</span>
                </div>
              </div>

              <p className="text-sm font-mono text-cyber-muted max-w-3xl leading-relaxed">
                {cur.desc}
              </p>

              <div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
                  5 Escape Room Challenges Inside This District:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {cur.games.map((gName, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-cyber-border/40 font-mono text-xs text-cyber-text flex items-center gap-2 hover:border-cyber-primary transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyber-primary/20 text-cyber-primary flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-bold truncate">{gName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. THE USER JOURNEY FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            GAMEPLAY PROGRESSION
          </span>
          <h2 className="text-2xl sm:text-4xl font-cyber font-black tracking-wider text-white">
            The Operator Journey
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyber-muted">
            From initial cadet to Supreme Cyber Security Guardian.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 font-mono text-xs text-center">
          <div className="p-5 rounded-2xl cyber-panel border border-cyber-border/50 space-y-2">
            <span className="w-7 h-7 rounded-full bg-cyber-primary/20 text-cyber-primary mx-auto flex items-center justify-center font-bold">1</span>
            <strong className="text-white block font-cyber text-sm">Enter Cyber World</strong>
            <p className="text-[11px] text-cyber-muted">Login or jump in instantly with 1-click guest access.</p>
          </div>

          <div className="p-5 rounded-2xl cyber-panel border border-cyber-border/50 space-y-2">
            <span className="w-7 h-7 rounded-full bg-cyber-primary/20 text-cyber-primary mx-auto flex items-center justify-center font-bold">2</span>
            <strong className="text-white block font-cyber text-sm">Select District</strong>
            <p className="text-[11px] text-cyber-muted">Choose any of the 7 major cybersecurity topic sectors.</p>
          </div>

          <div className="p-5 rounded-2xl cyber-panel border border-cyber-border/50 space-y-2">
            <span className="w-7 h-7 rounded-full bg-cyber-primary/20 text-cyber-primary mx-auto flex items-center justify-center font-bold">3</span>
            <strong className="text-white block font-cyber text-sm">Play 5 Games</strong>
            <p className="text-[11px] text-cyber-muted">Clear all 5 escape rooms per district, 10 levels each.</p>
          </div>

          <div className="p-5 rounded-2xl cyber-panel border border-cyber-border/50 space-y-2">
            <span className="w-7 h-7 rounded-full bg-cyber-primary/20 text-cyber-primary mx-auto flex items-center justify-center font-bold">4</span>
            <strong className="text-white block font-cyber text-sm">Defend 3 Hearts</strong>
            <p className="text-[11px] text-cyber-muted">Avoid traps, build combos, and get instant explanations.</p>
          </div>

          <div className="p-5 rounded-2xl cyber-panel border border-cyber-border/50 space-y-2">
            <span className="w-7 h-7 rounded-full bg-cyber-primary/20 text-cyber-primary mx-auto flex items-center justify-center font-bold">5</span>
            <strong className="text-white block font-cyber text-sm">Forge Badges</strong>
            <p className="text-[11px] text-cyber-muted">Claim your holographic badge with dynamic star rating.</p>
          </div>

          <div className="p-5 rounded-2xl cyber-panel border-2 border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.3)] space-y-2 animate-holo">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-black mx-auto flex items-center justify-center font-bold">6</span>
            <strong className="text-amber-300 block font-cyber text-sm">Grand Guardian</strong>
            <p className="text-[11px] text-cyber-muted">Master all 7 topics to unlock the Supreme Guardian Badge!</p>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 cyber-panel border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(6,182,212,0.25)] text-center space-y-6 relative overflow-hidden">
          <div className="inline-block p-4 rounded-3xl bg-cyan-500/10 border border-cyan-400/40 text-4xl mb-2">
            🛡️
          </div>

          <h2 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider text-white">
            Ready to Test Your Cyber Instincts?
          </h2>

          <p className="text-sm font-mono text-cyber-muted max-w-xl mx-auto leading-relaxed">
            Begin your training right now. No setup required. Click below to launch your first cybersecurity escape room challenge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleGuestAccess}
              disabled={loadingGuest}
              className="px-8 py-3.5 rounded-xl font-mono text-sm font-bold bg-gradient-to-r from-cyan-400 to-cyber-primary hover:from-cyan-300 hover:to-cyber-primary/90 text-black shadow-neon flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{loadingGuest ? 'Starting Session...' : 'Launch Instant Guest Session'}</span>
            </button>

            <Link
              to="/login"
              onClick={() => play.click()}
              className="px-6 py-3.5 rounded-xl font-mono text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
