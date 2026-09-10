import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Shield, Lock, Unlock, Play, Award, CheckCircle2, 
  Sparkles, Star, ChevronRight, Trophy 
} from 'lucide-react';
import { api } from '../utils/api';
import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { HolographicBadge } from '../components/badges/HolographicBadge';
import { GrandGuardianModal } from '../components/badges/GrandGuardianModal';

export const TopicDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { play } = useSound();
  const { user, refreshUser } = useAuth();

  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimingBadge, setClaimingBadge] = useState(false);
  const [grandModalData, setGrandModalData] = useState(null);

  const loadTopic = async () => {
    try {
      const res = await api.get(`/topics/${slug}`);
      if (res.success) {
        setTopicData(res);
      }
    } catch (err) {
      console.error('Error fetching topic details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopic();
  }, [slug]);

  const handleClaimBadge = async () => {
    play.click();
    setClaimingBadge(true);
    try {
      const res = await api.post('/badges/issue', { topicSlug: slug });
      if (res.success) {
        play.badge();
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        await loadTopic();
        refreshUser();

        if (res.grandGuardianUnlocked && res.grandBadge) {
          setGrandModalData(res.grandBadge);
        }
      }
    } catch (err) {
      alert(err.message || 'Could not claim badge yet');
    } finally {
      setClaimingBadge(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>DECRYPTING DISTRICT TELEMETRY...</span>
      </div>
    );
  }

  if (!topicData || !topicData.topic) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4 font-mono">
        <h2 className="text-xl text-rose-400 font-bold">District not found</h2>
        <Link to="/" className="text-cyber-primary underline">Return to Dashboard</Link>
      </div>
    );
  }

  const { topic, games } = topicData;
  const allGamesCompleted = games.every((g) => g.isCompleted);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      {/* Back to World */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            play.click();
            navigate('/');
          }}
          className="p-2 rounded-xl text-cyber-muted hover:text-cyber-text hover:bg-white/10 transition-colors flex items-center gap-1.5 font-mono text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cyber World</span>
        </button>
      </div>

      {/* District Header Panel */}
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border"
              style={{
                color: topic.color || 'var(--cyber-primary)',
                borderColor: `${topic.color || 'var(--cyber-primary)'}55`,
                background: `${topic.color || 'var(--cyber-primary)'}15`
              }}
            >
              <span>DISTRICT 0{topic.topicNumber} • {topic.districtName}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-black tracking-wide text-white">
              {topic.title}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-cyber-muted leading-relaxed">
              {topic.description}
            </p>
          </div>

          {/* District Status Gauge */}
          <div className="w-full md:w-72 p-5 rounded-2xl bg-black/50 border border-cyber-border/50 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-cyber-muted">GAMES CLEARED</span>
              <strong className="text-cyber-text">{topic.completedGames} / {topic.totalGames}</strong>
            </div>
            <ProgressBar progress={(topic.completedGames / topic.totalGames) * 100} color={topic.color} height="h-2.5" />
            <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-white/10">
              <span className="text-cyber-muted">DISTRICT SCORE</span>
              <strong className="text-amber-400 font-bold">{topic.totalTopicScore?.toLocaleString() || 0} PTS</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5 GAME CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-cyber font-bold tracking-wider text-white">
            5 DISTRICT ESCAPE ROOM CHALLENGES
          </h2>
          <span className="text-xs font-mono text-cyber-muted">
            Complete all 5 to earn the {topic.badgeName}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, idx) => (
            <div
              key={game._id}
              className={`rounded-2xl p-6 cyber-panel border flex flex-col justify-between transition-all duration-300 ${
                game.isUnlocked
                  ? 'hover:-translate-y-1.5 hover:border-cyber-primary shadow-cyber-card hover:shadow-neon'
                  : 'opacity-50 border-cyber-border/30'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyber-secondary uppercase">
                    CHALLENGE 0{game.gameNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    game.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : game.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>

                <h3 className="font-cyber font-bold text-lg text-white">
                  {game.title}
                </h3>

                {/* Progress stats */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-cyber-muted">Stages Completed:</span>
                    <span className="font-bold text-cyber-text">{game.completedLevels} / {game.totalLevels}</span>
                  </div>
                  <ProgressBar progress={game.completionPercentage} height="h-2" />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-cyber-border/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyber-muted block">BEST SCORE</span>
                  <strong className="text-xs font-mono text-amber-400">{game.bestScore} PTS</strong>
                </div>

                {game.isUnlocked ? (
                  <button
                    onClick={() => {
                      play.click();
                      navigate(`/play/${game.slug}`);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon-sm flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{game.isCompleted ? 'Replay' : game.completedLevels > 0 ? 'Continue' : 'Play'}</span>
                  </button>
                ) : (
                  <div className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyber-muted bg-white/5 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Topic Badge Showcase Card */}
          <div className="rounded-2xl p-6 cyber-panel border-2 border-dashed border-cyber-border/60 flex flex-col justify-between items-center text-center space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                DISTRICT BADGE REWARD
              </span>
              <h3 className="font-cyber font-bold text-lg text-white">
                {topic.badgeName}
              </h3>
              <p className="text-xs font-mono text-cyber-muted">
                Awarded upon completing all 5 escape room challenges in this sector.
              </p>
            </div>

            {topic.badge ? (
              <div className="w-full">
                <HolographicBadge badge={topic.badge} userName={user?.username} />
              </div>
            ) : (
              <div className="space-y-3 w-full">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-3xl opacity-50">
                  🛡️
                </div>
                <button
                  onClick={handleClaimBadge}
                  disabled={!allGamesCompleted || claimingBadge}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all ${
                    allGamesCompleted
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-neon hover:scale-105 cursor-pointer'
                      : 'bg-white/5 text-cyber-muted border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {claimingBadge ? 'Minting Badge...' : allGamesCompleted ? '★ Claim Holographic Badge' : `🔒 Complete All 5 Games (${topic.completedGames}/5)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grand Guardian Modal */}
      {grandModalData && (
        <GrandGuardianModal
          badge={grandModalData}
          userName={user?.username}
          isOpen={true}
          onClose={() => setGrandModalData(null)}
        />
      )}
    </div>
  );
};
