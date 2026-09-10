import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Shield, Filter, Award, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const LeaderboardPage = () => {
  const { user } = useAuth();
  const { play } = useSound();

  const [activeTab, setActiveTab] = useState('global'); // 'global' | 'weekly' | 'topic'
  const [selectedTopicSlug, setSelectedTopicSlug] = useState('');
  const [topics, setTopics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/topics');
        if (res.success && res.topics.length > 0) {
          setTopics(res.topics);
          setSelectedTopicSlug(res.topics[0].slug);
        }
      } catch (err) {
        console.error('Error fetching topics:', err);
      }
    };
    fetchTopics();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let url = `/leaderboard?type=${activeTab}`;
      if (activeTab === 'topic' && selectedTopicSlug) {
        url += `&topicSlug=${selectedTopicSlug}`;
      }
      const res = await api.get(url);
      if (res.success) {
        setLeaderboard(res.leaderboard || []);
        setCurrentUserRank(res.currentUserRank || null);
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab, selectedTopicSlug]);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono font-bold text-cyber-muted">#{rank}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>GLOBAL CYBER DEFENSE RANKINGS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider text-white">
          Cyber Leaderboard
        </h1>

        <p className="text-xs sm:text-sm font-mono text-cyber-muted max-w-xl mx-auto leading-relaxed">
          Compare threat containment performance with operators worldwide. Rank is earned through speed, accuracy, and flawless escape room completions.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => {
              setActiveTab('global');
              play.click();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'global'
                ? 'bg-cyber-primary text-white shadow-neon-sm'
                : 'bg-white/5 hover:bg-white/10 text-cyber-muted hover:text-white border border-white/10'
            }`}
          >
            Global All-Time
          </button>

          <button
            onClick={() => {
              setActiveTab('weekly');
              play.click();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-cyber-primary text-white shadow-neon-sm'
                : 'bg-white/5 hover:bg-white/10 text-cyber-muted hover:text-white border border-white/10'
            }`}
          >
            Weekly Champions
          </button>

          <button
            onClick={() => {
              setActiveTab('topic');
              play.click();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'topic'
                ? 'bg-cyber-primary text-white shadow-neon-sm'
                : 'bg-white/5 hover:bg-white/10 text-cyber-muted hover:text-white border border-white/10'
            }`}
          >
            By Topic District
          </button>
        </div>

        {/* Topic Filter Dropdown */}
        {activeTab === 'topic' && (
          <div className="pt-3 max-w-xs mx-auto animate-fade-in">
            <select
              value={selectedTopicSlug}
              onChange={(e) => {
                setSelectedTopicSlug(e.target.value);
                play.click();
              }}
              className="w-full px-4 py-2 rounded-xl bg-black/60 border border-cyber-border text-xs font-mono text-cyber-text focus:outline-none focus:border-cyber-primary"
            >
              {topics.map((t) => (
                <option key={t.slug} value={t.slug} className="bg-zinc-900 text-white">
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Top 3 Podium Cards */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/40 text-center flex flex-col items-center justify-between order-2 md:order-1">
            <div className="text-3xl mb-1">🥈</div>
            <span className="text-[10px] font-mono font-bold text-gray-400">RANK #2</span>
            <div className="font-cyber font-bold text-base text-white my-1">{leaderboard[1]?.username}</div>
            <span className="text-xs font-mono text-cyan-300">LVL {leaderboard[1]?.level}</span>
            <div className="text-xl font-cyber font-black text-amber-400 mt-2">{leaderboard[1]?.score?.toLocaleString()} PTS</div>
          </div>

          {/* Rank 1 (Tall & Glow) */}
          <div className="p-7 rounded-2xl cyber-panel border-2 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)] text-center flex flex-col items-center justify-between order-1 md:order-2 animate-holo">
            <div className="text-4xl mb-1">🥇</div>
            <span className="text-[10px] font-mono font-black text-amber-400 tracking-wider">CHAMPION #1</span>
            <div className="font-cyber font-black text-lg text-white my-1">{leaderboard[0]?.username}</div>
            <span className="text-xs font-mono text-cyan-300">LVL {leaderboard[0]?.level}</span>
            <div className="text-2xl font-cyber font-black text-amber-400 mt-2">{leaderboard[0]?.score?.toLocaleString()} PTS</div>
          </div>

          {/* Rank 3 */}
          <div className="p-6 rounded-2xl cyber-panel border border-cyber-border/40 text-center flex flex-col items-center justify-between order-3">
            <div className="text-3xl mb-1">🥉</div>
            <span className="text-[10px] font-mono font-bold text-amber-600">RANK #3</span>
            <div className="font-cyber font-bold text-base text-white my-1">{leaderboard[2]?.username}</div>
            <span className="text-xs font-mono text-cyan-300">LVL {leaderboard[2]?.level}</span>
            <div className="text-xl font-cyber font-black text-amber-400 mt-2">{leaderboard[2]?.score?.toLocaleString()} PTS</div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-2xl cyber-panel border-cyber-border overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-black/60 border-b border-cyber-border/40 text-cyber-muted uppercase text-[11px]">
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4 text-center">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/20">
              {leaderboard.map((entry) => {
                const isYou = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.userId}
                    className={`transition-colors ${
                      isYou
                        ? 'bg-cyber-primary/20 border-l-4 border-l-cyber-primary font-bold shadow-neon-sm'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      {getRankBadge(entry.rank)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyber-primary/20 border border-cyber-primary/50 flex items-center justify-center font-cyber text-xs text-cyber-primary">
                          {entry.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-cyber-text flex items-center gap-1.5">
                            <span>{entry.username}</span>
                            {isYou && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyber-primary text-white">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-cyber-muted">Verified Defender</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-cyan-300 font-bold">
                      LVL {entry.level}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-cyber font-black text-amber-400 text-sm">
                        {entry.score?.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">
                      {entry.accuracy || 95}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-300 font-bold">
                        ★ {entry.badgesCount || 0}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Current User Fixed Bottom Strip if Not in Top */}
        {currentUserRank && !leaderboard.slice(0, 10).some((e) => e.isCurrentUser) && (
          <div className="p-4 bg-cyber-primary/20 border-t-2 border-cyber-primary flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-black text-amber-400">YOUR RANK: #{currentUserRank.rank}</span>
              <span className="text-white font-bold">{currentUserRank.username}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-400 font-black">{currentUserRank.score?.toLocaleString()} PTS</span>
              <span className="text-emerald-400">{currentUserRank.accuracy}% Accuracy</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
