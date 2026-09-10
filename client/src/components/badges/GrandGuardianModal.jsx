import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Award, X, Download, Star } from 'lucide-react';
import { StarRating } from './StarRating';
import { exportBadgeAsImage } from '../../utils/badgeExport';
import { useSound } from '../../context/SoundContext';

export const GrandGuardianModal = ({ badge, userName, isOpen, onClose }) => {
  const { play } = useSound();

  useEffect(() => {
    if (isOpen) {
      play.badge();
      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#06b6d4', '#eab308', '#22c55e']
      });
    }
  }, [isOpen]);

  if (!isOpen || !badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl p-8 cyber-panel border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.4)] animate-holo text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crown & Supreme Insignia */}
        <div className="inline-block p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-400 mb-4 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          <div className="text-6xl">🛡️</div>
        </div>

        <div className="inline-block px-4 py-1 rounded-full text-xs font-mono font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/50 mb-2">
          ★ SUPREME CYBER MASTERY UNLOCKED ★
        </div>

        <h2 className="text-2xl md:text-3xl font-cyber font-black tracking-wider text-white drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          CYBER SECURITY GUARDIAN
        </h2>
        <p className="text-sm font-mono text-cyan-300 mt-1">
          Highest Tier Cybersecurity Competency Honor
        </p>

        {/* Recipient */}
        <div className="my-5 py-3 border-y border-amber-400/30">
          <span className="text-xs font-mono text-cyber-muted block">HONORING AGENT</span>
          <span className="text-2xl font-bold font-cyber text-white tracking-wide">{userName}</span>
        </div>

        {/* Dynamic Stars */}
        <div className="flex justify-center mb-4">
          <StarRating rating={badge.starRating || 5} size="lg" />
        </div>

        {/* Master Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-left font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-cyber-muted block text-[10px]">TOPICS CLEARED</span>
            <strong className="text-base text-cyber-success">7 / 7</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-cyber-muted block text-[10px]">GAMES CONQUERED</span>
            <strong className="text-base text-cyber-primary">35 / 35</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-cyber-muted block text-[10px]">TOTAL SCORE</span>
            <strong className="text-base text-amber-400">{badge.score || '48,900'}</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-cyber-muted block text-[10px]">VERIFICATION ID</span>
            <strong className="text-xs text-cyan-300 truncate block">{badge.verificationId}</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => exportBadgeAsImage(badge, userName)}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-mono font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" /> Download Supreme Badge (PNG)
          </button>
          <button
            onClick={onClose}
            className="py-3 px-6 rounded-xl font-mono font-bold text-sm bg-white/10 hover:bg-white/20 text-cyber-text border border-white/20 transition-colors"
          >
            Return to World
          </button>
        </div>
      </div>
    </div>
  );
};
