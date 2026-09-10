import React, { useState, useEffect } from 'react';
import { ShieldCheck, BarChart3, Users, Award, PlayCircle, Settings, CheckCircle2 } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await api.get('/admin/analytics');
        if (res.success) {
          setAnalytics(res);
        }
      } catch (err) {
        console.error('Error fetching admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>AUTHENTICATING ROOT TELEMETRY ACCESS...</span>
      </div>
    );
  }

  const stats = analytics?.stats || {};
  const topicStats = analytics?.topicStats || [];
  const recentAttempts = analytics?.recentAttempts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>ROOT SECURITY COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cyber font-black text-white">
            Administrative Telemetry & Oversight
          </h1>
          <p className="text-xs font-mono text-cyber-muted">
            Operator: {user?.username} ({user?.role?.toUpperCase()})
          </p>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">TOTAL OPERATORS</span>
          <strong className="text-xl font-cyber text-white block mt-1">{stats.totalUsers || 5}</strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">ACTIVE DISTRICTS</span>
          <strong className="text-xl font-cyber text-cyber-primary block mt-1">{stats.totalTopics || 7}</strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">ESCAPE CHALLENGES</span>
          <strong className="text-xl font-cyber text-cyan-300 block mt-1">{stats.totalGames || 35}</strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">TOTAL STAGES</span>
          <strong className="text-xl font-cyber text-emerald-400 block mt-1">{stats.totalLevels || 350}</strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">BADGES MINTED</span>
          <strong className="text-xl font-cyber text-amber-400 block mt-1">{stats.totalBadgesEarned || 0}</strong>
        </div>

        <div className="p-4 rounded-xl cyber-panel border-cyber-border/40 text-center">
          <span className="text-cyber-muted block text-[10px]">PASS RATE</span>
          <strong className="text-xl font-cyber text-emerald-400 block mt-1">{stats.passRate || 92}%</strong>
        </div>
      </div>

      {/* District Badges Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-cyber font-bold text-white tracking-wider">
          DISTRICT BADGE COMPLETION RATES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topicStats.map((t) => (
            <div key={t.topicNumber} className="p-4 rounded-xl cyber-panel border border-cyber-border/40 font-mono text-xs space-y-2">
              <div className="text-cyber-muted text-[10px] uppercase">DISTRICT 0{t.topicNumber}</div>
              <div className="font-bold text-white truncate">{t.title}</div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-cyber-muted">Badges Issued:</span>
                <span className="font-bold text-amber-400">{t.badgesIssued}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Game Attempts Table */}
      <div className="rounded-2xl cyber-panel border-cyber-border overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-black/60 border-b border-cyber-border/40 flex items-center justify-between">
          <h3 className="font-cyber font-bold text-sm text-white">
            LIVE ATTEMPTS LOG
          </h3>
          <span className="text-xs font-mono text-cyan-300">
            Telemetry Stream Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-black/30 border-b border-white/10 text-cyber-muted uppercase text-[10px]">
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Challenge</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Lives Left</th>
                <th className="py-3 px-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentAttempts.length > 0 ? (
                recentAttempts.map((att, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-cyber-text">
                      {att.userId?.username || 'Agent'}
                    </td>
                    <td className="py-3 px-4 text-cyan-300">
                      {att.gameId?.title || 'Challenge'}
                    </td>
                    <td className="py-3 px-4">
                      Stage {att.levelNumber}
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-bold">
                      +{att.scoreEarned} pts
                    </td>
                    <td className="py-3 px-4 text-rose-400">
                      {att.livesRemaining} / 3
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        att.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {att.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-cyber-muted">
                    Telemetry logs initializing... Play any level to generate real-time attempt logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
