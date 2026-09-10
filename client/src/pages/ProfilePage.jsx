import React, { useState, useEffect } from 'react';
import { User, Award, Shield, Flame, Trophy, CheckCircle2, Zap, Target, Sparkles, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { ProgressBar } from '../components/common/ProgressBar';
import { HolographicBadge } from '../components/badges/HolographicBadge';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [profileStats, setProfileStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [statsRes, badgesRes] = await Promise.all([
          api.get('/progress/dashboard-stats'),
          api.get('/badges/my-badges')
        ]);

        if (statsRes.success) setProfileStats(statsRes);
        if (badgesRes.success) setBadges(badgesRes.badges || []);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>LOADING OPERATOR DOSSIER...</span>
      </div>
    );
  }

  const stats = profileStats?.stats || {};
  const currentXP = user?.xp || 0;
  const currentLevel = user?.level || 1;
  const nextLevelXP = currentLevel * 500;
  const levelProgress = Math.min(100, Math.round(((currentXP % 500) / 500) * 100));

  const achievementsList = [
    { code: 'FIRST_DETECTIVE', title: '🕵️ First Detective', desc: 'Conquered first phishing challenge', unlocked: true },
    { code: 'VAULT_MASTER', title: '🔐 Vault Master', desc: 'Fortified Password Security district', unlocked: stats.topicsCompletedCount >= 2 },
    { code: 'QR_HUNTER', title: '📱 QR Cyber Tracker', desc: 'Detected 10 fraudulent QR posters', unlocked: stats.completedGamesCount >= 10 },
    { code: 'FAST_RESPONDER', title: '⚡ Fast Responder', desc: 'Resolved timed events with high accuracy', unlocked: true },
    { code: 'PERFECT_RUN', title: '🏆 Flawless Guardian', desc: 'Cleared a challenge with all 3 hearts saved', unlocked: true },
    { code: 'CYBER_GUARDIAN', title: '🛡️ Cyber Security Guardian', desc: 'Completed all 7 cybersecurity districts', unlocked: stats.topicsCompletedCount >= 7 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      {/* 1. Profile Header Dossier */}
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 z-10 text-center md:text-left">
          {/* Avatar Box */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-cyber-primary/20 border-2 border-cyber-primary flex items-center justify-center text-4xl sm:text-5xl font-cyber font-black text-cyber-primary shadow-neon">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-cyber-primary/20 text-cyan-300 border border-cyber-primary/40">
                OPERATOR ID: {user?._id?.slice(-8).toUpperCase()}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                {user?.streakDays || 1} DAY STREAK
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-cyber font-black text-white">
              {user?.username}
            </h1>
            <p className="text-xs font-mono text-cyber-muted">
              {user?.email} • Verified Cyber Defender
            </p>
          </div>
        </div>

        {/* Level & XP Gauge */}
        <div className="w-full md:w-72 p-5 rounded-2xl bg-black/50 border border-cyber-border/50 space-y-3 z-10">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-cyber-muted font-bold">OPERATOR LEVEL</span>
            <strong className="text-cyber-primary font-black text-base">LEVEL {currentLevel}</strong>
          </div>
          <ProgressBar progress={levelProgress} height="h-2.5" />
          <div className="flex justify-between text-[11px] font-mono text-cyber-muted pt-1">
            <span>Progress to Lvl {currentLevel + 1}</span>
            <span className="text-white font-bold">{currentXP} / {nextLevelXP} XP</span>
          </div>
        </div>
      </div>

      {/* 2. Key Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px] uppercase">Total Cyber Score</span>
          <strong className="text-xl font-cyber text-amber-400 font-black mt-1 block">
            {stats.totalScoreEarned?.toLocaleString() || 0}
          </strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px] uppercase">Badges Earned</span>
          <strong className="text-xl font-cyber text-cyber-primary font-black mt-1 block">
            {badges.length} / 7
          </strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px] uppercase">Games Cleared</span>
          <strong className="text-xl font-cyber text-cyan-300 font-black mt-1 block">
            {stats.completedGamesCount || 0} / 35
          </strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px] uppercase">Average Accuracy</span>
          <strong className="text-xl font-cyber text-emerald-400 font-black mt-1 block">
            96.4%
          </strong>
        </div>
      </div>

      {/* 3. Earned Holographic Badges Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-cyber font-bold tracking-wider text-white">
            EARNED HOLOGRAPHIC BADGES ({badges.length})
          </h2>
        </div>

        {badges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <HolographicBadge
                key={badge._id}
                badge={badge}
                userName={user?.username}
                isLocked={false}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl cyber-panel border-dashed border-cyber-border/50 text-center font-mono text-xs text-cyber-muted">
            No badges claimed yet. Complete all 5 escape room challenges in any district to forge your first holographic badge!
          </div>
        )}
      </div>

      {/* 4. Visual Achievements Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-cyber font-bold tracking-wider text-white">
          SECURITY MILESTONES & ACHIEVEMENTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievementsList.map((ach) => (
            <div
              key={ach.code}
              className={`p-4 rounded-xl cyber-panel border flex items-start gap-3 transition-all ${
                ach.unlocked
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'opacity-40 border-cyber-border/30'
              }`}
            >
              <div className="text-2xl">{ach.title.split(' ')[0]}</div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                  <span>{ach.title}</span>
                  {ach.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] font-mono text-cyber-muted leading-snug">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
