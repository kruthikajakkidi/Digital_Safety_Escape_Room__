import React from 'react';

export const ProgressBar = ({ progress = 0, color = 'var(--cyber-primary)', height = 'h-2.5', showText = false, label = '' }) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="w-full">
      {(showText || label) && (
        <div className="flex justify-between items-center text-xs font-mono mb-1.5">
          {label && <span className="text-cyber-muted">{label}</span>}
          <span className="font-bold text-cyber-text ml-auto">{clamped}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-black/40 border border-cyber-border/40 overflow-hidden relative`}>
        <div
          className="h-full rounded-full transition-all duration-500 relative"
          style={{
            width: `${clamped}%`,
            background: color.startsWith('var') ? color : `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 12px ${color}88`
          }}
        >
          {/* Animated glow shimmer on bar */}
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
