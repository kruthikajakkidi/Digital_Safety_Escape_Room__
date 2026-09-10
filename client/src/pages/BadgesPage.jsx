import React, { useState, useEffect } from 'react';
import { Award, Shield, Search, CheckCircle2, Download, Sparkles, Trophy } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { HolographicBadge } from '../components/badges/HolographicBadge';
import { GrandGuardianModal } from '../components/badges/GrandGuardianModal';

export const BadgesPage = () => {
  const { user } = useAuth();
  const { play } = useSound();

  const [badges, setBadges] = useState([]);
  const [grandBadge, setGrandBadge] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verification lookup
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searching, setSearching] = useState(false);

  const [selectedGrandModal, setSelectedGrandModal] = useState(false);

  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        const [badgesRes, topicsRes] = await Promise.all([
          api.get('/badges/my-badges'),
          api.get('/topics')
        ]);

        if (badgesRes.success) {
          setBadges(badgesRes.badges || []);
          setGrandBadge(badgesRes.grandBadge || null);
        }
        if (topicsRes.success) {
          setTopics(topicsRes.topics || []);
        }
      } catch (err) {
        console.error('Error fetching badges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadgeData();
  }, []);

  const handleVerifySearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    play.click();
    setSearching(true);
    setSearchError('');
    setSearchResult(null);

    try {
      const res = await api.get(`/badges/verify/${searchId.trim()}`);
      if (res.success && res.badge) {
        setSearchResult(res.badge);
        play.success();
      }
    } catch (err) {
      setSearchError('Verification Failed: Badge ID not found or invalid.');
      play.error();
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>AUTHENTICATING HOLOGRAPHIC BADGE REGISTRY...</span>
      </div>
    );
  }

  // Combine topics with earned badges
  const allBadgesDisplay = topics.map((t) => {
    const earned = badges.find((b) => b.topicNumber === t.topicNumber);
    if (earned) {
      return { ...earned, isLocked: false };
    }
    return {
      title: t.badgeName,
      category: t.title,
      color: t.color,
      icon: t.badgeIcon,
      isLocked: true
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in select-none">
      {/* 1. Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>CYBER COMPETENCY BADGE VAULT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider text-white">
          Holographic Cyber Badges
        </h1>

        <p className="text-xs sm:text-sm font-mono text-cyber-muted max-w-2xl mx-auto leading-relaxed">
          Official tamper-evident cybersecurity badges. Complete all 5 escape room challenges in each major sector to earn your holographic badge with dynamic star rating and verifiable cryptographic IDs.
        </p>
      </div>

      {/* 2. Grand Cyber Guardian Showcase Banner */}
      {grandBadge ? (
        <div 
          onClick={() => setSelectedGrandModal(true)}
          className="rounded-3xl p-6 sm:p-8 cyber-panel border-2 border-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.3)] cursor-pointer animate-holo flex flex-col md:flex-row items-center justify-between gap-6 transition-transform hover:scale-[1.01]"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.5)]">
              🛡️
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                ★ MASTER LEVEL CERTIFIED ★
              </span>
              <h2 className="text-2xl font-cyber font-black text-white">
                CYBER SECURITY GUARDIAN
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                Awarded for conquering all 7 cybersecurity districts and 35 escape rooms.
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGrandModal(true);
            }}
            className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black shadow-neon shrink-0 transition-transform hover:scale-105"
          >
            View Supreme Badge
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/40 flex items-center justify-between gap-4 text-xs font-mono text-cyber-muted">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400/60" />
            <div>
              <strong className="text-white block font-cyber">CYBER SECURITY GUARDIAN (GRAND BADGE)</strong>
              <span>Unlock all 7 topic badges to claim the supreme master cybersecurity badge. ({badges.length}/7 Completed)</span>
            </div>
          </div>
          <span className="font-bold text-cyber-primary">{Math.round((badges.length / 7) * 100)}% UNLOCKED</span>
        </div>
      )}

      {/* 3. All 7 Topic Badges Gallery */}
      <div className="space-y-4">
        <h2 className="text-xl font-cyber font-black tracking-wider text-white">
          DISTRICT CYBER BADGES (7 TOPICS)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allBadgesDisplay.map((badge, index) => (
            <HolographicBadge
              key={index}
              badge={badge}
              userName={user?.username}
              isLocked={badge.isLocked}
            />
          ))}
        </div>
      </div>

      {/* 4. Public Cryptographic Verification Lookup */}
      <div className="p-6 rounded-2xl cyber-panel border-cyber-border/60 max-w-2xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-300 font-bold">
          <Search className="w-4 h-4" />
          <span>VERIFY OFFICIAL CYBERSECURITY BADGE</span>
        </div>

        <p className="text-xs font-mono text-cyber-muted">
          Enter any badge verification ID (e.g. <code>BADGE-T1-XXXXXX</code>) to validate its cryptographic authenticity on the public registry.
        </p>

        <form onSubmit={handleVerifySearch} className="flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Badge Verification ID..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-xs font-mono text-cyber-text focus:outline-none focus:border-cyber-primary"
          />
          <button
            type="submit"
            disabled={searching}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon-sm"
          >
            {searching ? 'Checking...' : 'Verify'}
          </button>
        </form>

        {searchError && (
          <p className="text-xs font-mono text-rose-400 font-bold">{searchError}</p>
        )}

        {searchResult && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 text-left font-mono text-xs space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> AUTHENTIC CYBERSECURITY BADGE
              </span>
              <span>{searchResult.verificationId}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-cyber-text pt-2 border-t border-white/10">
              <p>Holder: <strong className="text-white">{searchResult.holder}</strong></p>
              <p>Badge: <strong className="text-cyan-300">{searchResult.title}</strong></p>
              <p>Score: <strong className="text-amber-400">{searchResult.score} / {searchResult.maxScore}</strong></p>
              <p>Stars: <strong className="text-amber-400">{searchResult.starRating} Stars</strong></p>
            </div>
          </div>
        )}
      </div>

      {/* Grand Guardian Modal */}
      {selectedGrandModal && grandBadge && (
        <GrandGuardianModal
          badge={grandBadge}
          userName={user?.username}
          isOpen={true}
          onClose={() => setSelectedGrandModal(false)}
        />
      )}
    </div>
  );
};
