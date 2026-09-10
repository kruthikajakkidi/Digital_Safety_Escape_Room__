import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Unlock, ChevronRight, Sparkles, Award } from 'lucide-react';
import { api } from '../utils/api';
import { useSound } from '../context/SoundContext';
import { ProgressBar } from '../components/common/ProgressBar';

export const TopicsOverviewPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { play } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/topics');
        if (res.success) {
          setTopics(res.topics);
        }
      } catch (err) {
        console.error('Error loading topics overview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>PROBING CYBER MAP DISTRICTS...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in select-none">
      <div className="rounded-3xl p-6 sm:p-8 cyber-panel border-cyber-border text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBER WORLD MAP • 7 DISTRICTS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider text-white">
          Cyber Security Districts
        </h1>

        <p className="text-xs sm:text-sm font-mono text-cyber-muted max-w-2xl mx-auto leading-relaxed">
          Traverse the 7 major digital security sectors. Each sector features 5 distinct hands-on escape rooms designed to build intuitive defense instincts.
        </p>
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
            className={`rounded-2xl p-6 cyber-panel border flex flex-col justify-between transition-all duration-300 ${
              topic.isUnlocked
                ? 'hover:-translate-y-2 cursor-pointer hover:border-cyber-primary shadow-cyber-card hover:shadow-neon'
                : 'opacity-50 border-cyber-border/30 cursor-not-allowed'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border"
                  style={{
                    color: topic.color || 'var(--cyber-primary)',
                    borderColor: `${topic.color || 'var(--cyber-primary)'}66`,
                    background: `${topic.color || 'var(--cyber-primary)'}15`
                  }}
                >
                  DISTRICT 0{topic.topicNumber}
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

              <div>
                <h3 className="font-cyber font-bold text-xl text-white mb-1">
                  {topic.title}
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  District: {topic.districtName}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-6 mt-4 border-t border-cyber-border/30">
              <ProgressBar
                progress={topic.completionPercentage || 0}
                label={`Progress: ${topic.completedGamesCount || 0} / 5 Games`}
                showText={true}
                color={topic.color}
              />

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-amber-400 font-bold">
                  {topic.badge ? `★ ${topic.badge.title}` : 'Badge: Locked'}
                </span>
                <span className="text-cyber-primary font-bold flex items-center gap-1">
                  Enter District <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
