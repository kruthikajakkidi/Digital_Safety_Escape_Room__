import React from 'react';
import { Heart } from 'lucide-react';

export const LivesDisplay = ({ lives = 3, maxLives = 3 }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-cyber-border/40 backdrop-blur-sm">
      <span className="text-[11px] font-mono font-bold text-cyber-muted mr-1">LIVES</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLives }).map((_, index) => {
          const isAlive = index < lives;
          return (
            <div key={index} className="transition-all duration-300">
              <Heart
                className={`w-5 h-5 transition-all ${
                  isAlive
                    ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse-slow'
                    : 'text-gray-600/40 fill-gray-800/40 scale-90'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
