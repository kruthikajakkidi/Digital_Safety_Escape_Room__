import React from 'react';
import { MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ChatSimulator = ({ scenario }) => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-cyber-border overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-black/50 border-b border-cyber-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyber-primary/20 border border-cyber-primary/60 flex items-center justify-center font-bold text-cyber-primary text-sm">
              {scenario.avatarText || '💬'}
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-cyber-text flex items-center gap-1.5">
                <span>{scenario.contactName}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-cyber-muted">
                {scenario.platform || 'Encrypted Direct Message'}
              </span>
            </div>
          </div>

          <div className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 border border-rose-500/30 text-rose-300">
            UNVERIFIED SENDER
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20 min-h-[220px] flex flex-col justify-end">
          {/* Timestamp */}
          <div className="text-center">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-cyber-muted">
              Today • Security Flagged Channel
            </span>
          </div>

          {/* Incoming Message Bubble */}
          <div className="flex items-start gap-3 max-w-lg">
            <div className="w-8 h-8 rounded-full bg-cyber-primary/20 border border-cyber-primary/50 flex items-center justify-center text-xs shrink-0 text-cyber-primary">
              {scenario.avatarText || '👤'}
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none cyber-panel border-cyber-border text-xs sm:text-sm text-cyber-text leading-relaxed shadow-lg">
              <p>{scenario.incomingMessage}</p>
              <div className="text-[10px] font-mono text-cyber-muted mt-2 flex items-center justify-between">
                <span>Claimed Identity: {scenario.claimedIdentity || 'Support'}</span>
                <span>Sent just now</span>
              </div>
            </div>
          </div>

          {/* Typing indicator simulation */}
          <div className="flex items-center gap-1.5 pl-11 text-[11px] font-mono text-cyber-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce delay-200" />
            <span className="ml-1 opacity-70">Awaiting your response...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
