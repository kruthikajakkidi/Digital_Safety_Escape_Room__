import React, { useState } from 'react';
import { Mail, AlertCircle, Paperclip, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useSound } from '../../../context/SoundContext';

export const PhishingInspector = ({ scenario, redFlags = [], onActionSelect }) => {
  const [revealedFlags, setRevealedFlags] = useState([]);
  const { play } = useSound();

  const toggleFlag = (flagId) => {
    if (!revealedFlags.includes(flagId)) {
      play.combo();
      setRevealedFlags([...revealedFlags, flagId]);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Email Client Mockup Window */}
      <div className="rounded-xl cyber-panel border-cyber-border overflow-hidden shadow-2xl">
        {/* Email Header Bar */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-cyber-border/40 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyber-muted">
            <Mail className="w-4 h-4 text-cyber-primary" />
            <span className="font-bold text-cyber-text">INBOX DISTRICT CLIENT</span>
          </div>
          <span className="text-[11px] text-cyber-secondary">{scenario.date || 'Today, 08:42 AM'}</span>
        </div>

        {/* Email Metadata Form */}
        <div className="p-4 space-y-2 border-b border-cyber-border/20 text-xs font-mono bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-cyber-muted w-14">FROM:</span>
            <button
              type="button"
              onClick={() => toggleFlag('flag-sender')}
              className={`text-left px-2 py-1 rounded transition-all flex items-center gap-1.5 ${
                revealedFlags.includes('flag-sender')
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/60'
                  : 'text-cyber-text hover:bg-white/10'
              }`}
            >
              <span>{scenario.from}</span>
              {revealedFlags.includes('flag-sender') && <ShieldAlert className="w-3.5 h-3.5 text-rose-400 inline" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-cyber-muted w-14">TO:</span>
            <span className="text-cyber-text/80">{scenario.to || 'agent.user@cyberworld.org'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-cyber-muted w-14">SUBJECT:</span>
            <button
              type="button"
              onClick={() => toggleFlag('flag-urgency')}
              className={`text-left px-2 py-0.5 rounded font-bold transition-all ${
                revealedFlags.includes('flag-urgency')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                  : 'text-cyber-text hover:bg-white/10'
              }`}
            >
              {scenario.subject}
            </button>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 text-sm text-cyber-text space-y-4 leading-relaxed font-sans">
          <div dangerouslySetInnerHTML={{ __html: scenario.bodyHtml }} />

          {/* Interactive Link Inspector Highlight */}
          <div className="p-3 rounded-lg bg-black/40 border border-cyber-border/40 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-cyber-muted">Hyperlink Destination Preview:</span>
            <button
              type="button"
              onClick={() => toggleFlag('flag-link')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                revealedFlags.includes('flag-link')
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/60'
                  : 'bg-white/5 hover:bg-white/10 text-cyan-300'
              }`}
            >
              http://{scenario.targetDomain || 'netflx-billing-verify.com'}/auth/verify
            </button>
          </div>

          {/* Attachment Box if Present */}
          {scenario.attachment && (
            <div className="mt-4 pt-4 border-t border-cyber-border/20">
              <span className="text-xs font-mono text-cyber-muted block mb-2">ATTACHMENT DETECTED:</span>
              <button
                type="button"
                onClick={() => toggleFlag('flag-attachment')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                  revealedFlags.includes('flag-attachment')
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/60'
                    : 'bg-white/5 hover:bg-white/10 text-cyber-text border border-cyber-border/40'
                }`}
              >
                <Paperclip className="w-4 h-4 text-cyber-secondary" />
                <span className="font-bold">{scenario.attachment.name}</span>
                <span className="text-cyber-muted text-[10px]">({scenario.attachment.size})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Red Flags Discovered Counter */}
      {redFlags.length > 0 && (
        <div className="p-3 rounded-xl bg-black/30 border border-cyber-border/30 flex items-center justify-between text-xs font-mono">
          <span className="text-cyber-muted">Red Flags Uncovered:</span>
          <span className="font-bold text-cyber-primary">
            {revealedFlags.length} / {redFlags.length} Identified
          </span>
        </div>
      )}
    </div>
  );
};
