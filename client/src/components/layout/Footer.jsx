import React from 'react';
import { Shield, Lock, Terminal, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-cyber-border/30 bg-cyber-bg/90 py-8 px-4 sm:px-6 lg:px-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-cyber-muted">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyber-primary" />
          <span className="font-bold text-cyber-text">Digital Safety Escape Room</span>
          <span>• Interactive Cybersecurity Gaming & Training</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyber-secondary" /> Zero Trust Architecture
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyber-success" /> 7 Districts • 35 Games
          </span>
        </div>

        <div className="text-[11px] opacity-75">
          Crafted for Cyber Defense & Educational Literacy
        </div>
      </div>
    </footer>
  );
};
