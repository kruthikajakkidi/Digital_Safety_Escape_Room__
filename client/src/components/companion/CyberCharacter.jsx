import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const CyberCharacter = ({
  mood = 'idle', // 'idle' | 'walking' | 'cheering' | 'warning' | 'thinking'
  message = null,
  size = 'md', // 'sm' | 'md' | 'lg'
  showBubble = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-36 h-48'
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'warning': return '#ef4444';
      case 'cheering': return '#22c55e';
      case 'thinking': return '#eab308';
      default: return 'var(--cyber-primary)';
    }
  };

  return (
    <div 
      className={`relative inline-flex flex-col items-center select-none transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Interactive Speech / Tip Bubble */}
      {showBubble && message && (
        <div className="absolute -top-16 z-20 max-w-xs px-3.5 py-2 rounded-xl text-xs font-mono cyber-panel border-cyber-border shadow-neon-sm text-cyber-text animate-bounce transition-all">
          <div className="flex items-center gap-1.5 font-bold mb-0.5 text-cyber-primary text-[11px]">
            {mood === 'cheering' && <ShieldCheck className="w-3.5 h-3.5 text-cyber-success" />}
            {mood === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-cyber-danger" />}
            {mood === 'thinking' && <HelpCircle className="w-3.5 h-3.5 text-cyber-warning" />}
            {mood === 'idle' && <Sparkles className="w-3.5 h-3.5 text-cyber-primary" />}
            <span>CIPHER (GUIDE)</span>
          </div>
          <p className="leading-snug text-cyber-text/90 text-[11px]">{message}</p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cyber-card border-r border-b border-cyber-border" />
        </div>
      )}

      {/* Cyber Companion SVG */}
      <div className={`relative ${sizeClasses[size]} ${mood === 'walking' ? 'animate-pulse-slow' : 'animate-float'}`}>
        <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_0_12px_var(--cyber-primary-glow)]">
          {/* Cyber Aura Halo */}
          <circle cx="60" cy="80" r="50" fill="none" stroke={getMoodColor()} strokeWidth="1" opacity="0.3" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '16s' }} />

          {/* Floating Base Thruster Glow */}
          <ellipse cx="60" cy="148" rx="22" ry="5" fill={getMoodColor()} opacity="0.4" className="animate-pulse" />
          <path d="M50 140 Q60 156 70 140" fill={getMoodColor()} opacity="0.8" />

          {/* Torso / Cyber Armor */}
          <path d="M42 75 L78 75 L84 125 L36 125 Z" fill="#18132e" stroke="var(--cyber-border)" strokeWidth="2.5" />
          {/* Neon Armor Accents */}
          <line x1="60" y1="80" x2="60" y2="120" stroke={getMoodColor()} strokeWidth="3" />
          <line x1="48" y1="95" x2="72" y2="95" stroke={getMoodColor()} strokeWidth="2" opacity="0.8" />

          {/* Left Arm / Shield Hand */}
          {mood === 'warning' ? (
            // Holding neon shield
            <g>
              <path d="M38 80 L18 95 L22 120" fill="none" stroke="var(--cyber-border)" strokeWidth="4" strokeLinecap="round" />
              <polygon points="12,90 28,90 32,110 20,130 8,110" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="2" />
            </g>
          ) : (
            <path d="M38 80 L24 105 L30 120" fill="none" stroke="var(--cyber-border)" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* Right Arm / Celebration or Pointing */}
          {mood === 'cheering' ? (
            <path d="M82 80 L102 55 L96 45" fill="none" stroke={getMoodColor()} strokeWidth="4" strokeLinecap="round" />
          ) : mood === 'thinking' ? (
            <path d="M82 80 L95 85 L85 65" fill="none" stroke="var(--cyber-border)" strokeWidth="4" strokeLinecap="round" />
          ) : (
            <path d="M82 80 L96 105 L90 120" fill="none" stroke="var(--cyber-border)" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* Cyber Neck Connector */}
          <rect x="54" y="65" width="12" height="12" fill="#2d2250" />

          {/* Cyber Helmet */}
          <path d="M35 55 C35 30, 85 30, 85 55 C85 68, 75 72, 60 72 C45 72, 35 68, 35 55 Z" fill="#120c27" stroke="var(--cyber-border)" strokeWidth="3" />
          {/* Side Comm Antennas */}
          <path d="M30 46 L35 48" stroke={getMoodColor()} strokeWidth="3" strokeLinecap="round" />
          <path d="M85 48 L90 46" stroke={getMoodColor()} strokeWidth="3" strokeLinecap="round" />

          {/* Interactive Visor Display */}
          <rect x="42" y="44" width="36" height="16" rx="6" fill="#070313" stroke={getMoodColor()} strokeWidth="1.5" />
          {/* Visor Eyes / Scanning Waves */}
          {mood === 'cheering' ? (
            // Happy ^ ^ eyes
            <g stroke={getMoodColor()} strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M47 54 Q51 48 55 54" />
              <path d="M65 54 Q69 48 73 54" />
            </g>
          ) : mood === 'warning' ? (
            // Alert ! eye
            <g fill="#ef4444">
              <rect x="58" y="47" width="4" height="6" rx="1" />
              <circle cx="60" cy="56" r="1.5" />
            </g>
          ) : (
            // Scanning LED bar
            <g>
              <circle cx="50" cy="52" r="3" fill={getMoodColor()} />
              <circle cx="70" cy="52" r="3" fill={getMoodColor()} />
              <line x1="53" y1="52" x2="67" y2="52" stroke={getMoodColor()} strokeWidth="1.5" opacity="0.6" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
