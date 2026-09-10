import React, { useState } from 'react';
import { Shield, Download, Check, ExternalLink, Award, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { StarRating } from './StarRating';
import { exportBadgeAsImage } from '../../utils/badgeExport';
import { useSound } from '../../context/SoundContext';

export const HolographicBadge = ({ badge, userName = 'Cyber Agent', isLocked = false, onSelect }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { play } = useSound();

  const handleDownload = (e) => {
    e.stopPropagation();
    play.click();
    setDownloading(true);
    setTimeout(() => {
      exportBadgeAsImage(badge, userName);
      setDownloading(false);
      play.success();
    }, 400);
  };

  const handleCopyId = (e) => {
    e.stopPropagation();
    play.click();
    navigator.clipboard.writeText(badge.verificationId || 'CSG-VERIFIED');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeColor = badge.color || 'var(--cyber-primary)';
  const isGrand = badge.badgeType === 'grand_guardian';

  if (isLocked) {
    return (
      <div className="relative group rounded-2xl p-6 cyber-panel border-cyber-border/40 opacity-60 flex flex-col items-center justify-center text-center min-h-[360px]">
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyber-muted/40 flex items-center justify-center mb-4 text-cyber-muted">
          <Shield className="w-10 h-10" />
        </div>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyber-bg border border-cyber-border/50 text-cyber-muted mb-2">
          🔒 BADGE LOCKED
        </div>
        <h3 className="font-cyber font-bold text-lg text-cyber-text mb-1">{badge.title}</h3>
        <p className="text-xs text-cyber-muted max-w-xs">{badge.category || 'Complete all 5 games in this district to unlock this badge.'}</p>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`relative group rounded-2xl p-6 cyber-panel transition-all duration-500 hover:-translate-y-2 cursor-pointer select-none overflow-hidden ${
        isGrand ? 'border-2 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.35)]' : 'border border-cyber-border hover:border-cyber-primary shadow-cyber-card hover:shadow-neon'
      } animate-holo`}
      style={{
        background: `radial-gradient(circle at 50% 0%, ${badgeColor}18 0%, rgba(15,10,30,0.85) 75%)`
      }}
    >
      {/* Corner Cyber Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: badgeColor }} />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: badgeColor }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: badgeColor }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: badgeColor }} />

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-4">
        <span 
          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
          style={{ 
            color: isGrand ? '#fde047' : badgeColor,
            borderColor: `${badgeColor}66`,
            background: `${badgeColor}15`
          }}
        >
          {isGrand ? '👑 SUPREME BADGE' : 'DISTRICT BADGE'}
        </span>
        <span className="text-[11px] font-mono text-cyber-muted">
          ID: {badge.verificationId?.slice(0, 12)}
        </span>
      </div>

      {/* Central Holographic Insignia */}
      <div className="flex flex-col items-center justify-center my-4">
        <div 
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${badgeColor}33, ${badgeColor}0d)`,
            border: `2px solid ${badgeColor}`,
            boxShadow: `0 0 25px ${badgeColor}40`
          }}
        >
          {/* Hexagon / Emblem */}
          <div className="text-4xl filter drop-shadow">
            {isGrand ? '🛡️' : badge.icon === 'mail-warning' ? '🎣' : badge.icon === 'key' ? '🔐' : badge.icon === 'qr-code' ? '📱' : badge.icon === 'message-square-warning' ? '🚨' : badge.icon === 'eye-off' ? '👁️' : badge.icon === 'smartphone' ? '⚡' : '💥'}
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-300 animate-pulse" />
        </div>

        {/* Badge Title */}
        <h3 className="font-cyber font-bold text-lg text-cyber-text text-center tracking-wide group-hover:text-cyber-primary transition-colors">
          {badge.title}
        </h3>
        <p className="text-xs font-mono text-cyber-secondary uppercase tracking-wider mt-0.5">
          {badge.category}
        </p>

        {/* Dynamic Star Rating */}
        <div className="mt-3">
          <StarRating rating={badge.starRating || 5} size="md" />
        </div>

        {/* Score Pill */}
        <div className="mt-2 text-xs font-mono px-3 py-1 rounded-full bg-black/40 border border-cyber-border/40 text-cyber-text/90">
          Score: <strong className="text-cyber-primary">{badge.score || 0}</strong> / {badge.maxScore || 7500} ({badge.scorePercentage || 90}%)
        </div>
      </div>

      {/* Recipient and Verification Footer */}
      <div className="pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs text-cyber-muted font-mono">
        <div>
          <span className="text-[10px] block opacity-70">AGENT</span>
          <span className="font-bold text-cyber-text">{userName}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] block opacity-70">STATUS</span>
          <span className="text-cyber-success font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> VERIFIED
          </span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-cyber-primary/20 hover:bg-cyber-primary text-cyber-text border border-cyber-primary/60 transition-all hover:shadow-neon-sm"
        >
          <Download className="w-3.5 h-3.5" />
          {downloading ? 'Exporting...' : 'Save PNG'}
        </button>

        <button
          onClick={handleCopyId}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-cyber-muted hover:text-cyber-text border border-cyber-border/40 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-cyber-success" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied ID' : 'Copy ID'}
        </button>
      </div>
    </div>
  );
};
