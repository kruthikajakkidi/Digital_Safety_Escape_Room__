import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Award, Flame, Zap, ArrowRight, Lock, Unlock, 
  Target, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Trophy 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { api } from '../utils/api';
import { ProgressBar } from '../components/common/ProgressBar';
import { CyberCharacter } from '../components/companion/CyberCharacter';
import { HolographicBadge } from '../components/badges/HolographicBadge';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { play } = useSound();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsRes, topicsRes] = await Promise.all([
          api.get('/progress/dashboard-stats'),
          api.get('/topics')
        ]);

        if (statsRes.success) setDashboardData(statsRes);
        if (topicsRes.success) setTopics(topicsRes.topics);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>BOOTING CYBER DEFENSE MAINFRAME...</span>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const weakestTopic = stats.weakestTopic;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyber-primary/20 text-cyan-300 border border-cyber-primary/40">
            <Sparkles className="w-3.5 h-3.5 text-cyber-primary" />
            <span>OPERATIONAL SECTOR: CYBER WORLD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-black tracking-wide text-white drop-shadow-md">
            Welcome, Agent <span className="text-cyber-primary">{user?.username || 'Defender'}</span>
          </h1>

          <p className="text-sm font-mono text-cyber-muted leading-relaxed">
            Ready to test your cyber instincts? Infiltrate simulated incident sectors, identify live manipulation red flags, and forge your holographic security badges.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <button
              onClick={() => {
                play.click();
                navigate('/topics');
              }}
              className="px-6 py-3 rounded-xl font-mono font-bold text-xs bg-cyber-primary hover:bg-cyber-primary/80 text-white shadow-neon flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Enter Cyber Districts</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {weakestTopic && (
              <button
                onClick={() => {
                  play.click();
                  navigate(`/topics/${weakestTopic.slug}`);
                }}
                className="px-5 py-3 rounded-xl font-mono font-bold text-xs bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/40 flex items-center gap-2 transition-all"
              >
                <Target className="w-4 h-4 text-amber-400" />
                <span>Practice Weak Area ({weakestTopic.title})</span>
              </button>
            )}
          </div>
        </div>

        {/* Companion Avatar Guide */}
        <div className="z-10 shrink-0">
          <CyberCharacter
            mood="cheering"
            message="All 7 districts are operational! Where shall we train today?"
            size="lg"
            showBubble={true}
          />
        </div>
      </div>

      {/* 2. CENTRAL PROGRESS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Progress Gauge */}
        <div className="md:col-span-2 p-6 rounded-2xl cyber-panel border-cyber-border/60 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-cyber-muted font-bold uppercase tracking-wider">Overall Cybersecurity Progress</span>
              <span className="text-cyber-primary font-bold text-base">{stats.overallProgressPercent || 0}%</span>
            </div>
            <ProgressBar progress={stats.overallProgressPercent || 0} height="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-cyber-muted block">TOPICS</span>
              <strong className="text-cyber-text text-sm">{stats.topicsCompletedCount || 0} / {stats.totalTopics || 7}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-cyber-muted block">GAMES</span>
              <strong className="text-cyber-secondary text-sm">{stats.completedGamesCount || 0} / {stats.totalGames || 35}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-cyber-muted block">LEVELS</span>
              <strong className="text-emerald-400 text-sm">{stats.completedLevelsCount || 0} / 350</strong>
            </div>
          </div>
        </div>

        {/* Total Score Card */}
        <div className="p-6 rounded-2xl cyber-panel border-cyber-border/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyber-muted font-bold uppercase">Total Cyber Score</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-cyber font-black text-amber-400 tracking-wide">
              {stats.totalScoreEarned?.toLocaleString() || 0}
            </div>
            <span className="text-[11px] font-mono text-cyber-muted">Points accumulated across levels</span>
          </div>
          <div className="text-xs font-mono text-cyber-secondary">
            Badge Rank: {stats.badgesEarnedCount || 0} Holographic Badges
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="p-6 rounded-2xl cyber-panel border-cyber-border/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyber-muted font-bold uppercase">Daily Cyber Streak</span>
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-cyber font-black text-orange-400 tracking-wide">
              {user?.streakDays || 1} DAYS
            </div>
            <span className="text-[11px] font-mono text-cyber-muted">Active daily training streak</span>
          </div>
          <div className="text-xs font-mono text-emerald-400">
            Keep streak alive for XP multipliers!
          </div>
        </div>
      </div>

      {/* 3. PERFORMANCE RECOMMENDATIONS (STRONGEST vs WEAKEST) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.strongestTopic && (
          <div className="p-4 rounded-xl cyber-panel border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">STRONGEST DISTRICT</span>
                <strong className="text-sm font-cyber text-white">{stats.strongestTopic.title}</strong>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{stats.strongestTopic.percentage}% Mastery</span>
          </div>
        )}

        {stats.weakestTopic && (
          <div className="p-4 rounded-xl cyber-panel border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold block">NEEDS PRACTICE</span>
                <strong className="text-sm font-cyber text-white">{stats.weakestTopic.title}</strong>
              </div>
            </div>
            <Link
              to={`/topics/${stats.weakestTopic.slug}`}
              onClick={() => play.click()}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 transition-colors"
            >
              Train Now
            </Link>
          </div>
        )}
      </div>

      {/* 4. CYBER WORLD: 7 DISTRICTS OVERVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-cyber font-black tracking-wider text-white">
              CYBER CITY DISTRICTS
            </h2>
            <p className="text-xs font-mono text-cyber-muted">
              Choose a major cybersecurity topic to enter its escape room games
            </p>
          </div>
          <Link
            to="/topics"
            onClick={() => play.click()}
            className="text-xs font-mono text-cyber-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic._id}
              onClick={() => {
                if (topic.isUnlocked) {
                  play.click();
                  navigate(`/topics/${topic.slug}`);
                }
              }}
              className={`relative rounded-2xl p-6 cyber-panel border transition-all duration-300 flex flex-col justify-between ${
                topic.isUnlocked
                  ? 'hover:-translate-y-1.5 cursor-pointer hover:border-cyber-primary hover:shadow-neon'
                  : 'opacity-60 border-cyber-border/30 cursor-not-allowed'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border"
                    style={{
                      color: topic.color || 'var(--cyber-primary)',
                      borderColor: `${topic.color || 'var(--cyber-primary)'}55`,
                      background: `${topic.color || 'var(--cyber-primary)'}15`
                    }}
                  >
                    DISTRICT 0{topic.topicNumber} • {topic.districtName}
                  </span>

                  {topic.isUnlocked ? (
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-cyber-muted flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> LOCKED
                    </span>
                  )}
                </div>

                <h3 className="font-cyber font-bold text-lg text-white mb-2">
                  {topic.title}
                </h3>
                <p className="text-xs font-mono text-cyber-muted line-clamp-2 mb-4 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-cyber-border/30">
                <ProgressBar
                  progress={topic.completionPercentage || 0}
                  label={`Progress: ${topic.completedGamesCount || 0}/5 Games`}
                  showText={true}
                  color={topic.color}
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-cyber-muted">
                    {topic.badge ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        ★ {topic.badgeName}
                      </span>
                    ) : (
                      <span>Badge: Incomplete</span>
                    )}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyber-primary flex items-center gap-1">
                    Enter <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
