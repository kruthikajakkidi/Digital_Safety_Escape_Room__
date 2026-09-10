import React from 'react';
import { AlertTriangle, Flame, Shield, Terminal, Server } from 'lucide-react';

export const EmergencyTriage = ({ scenario, timeRemaining = 30 }) => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-rose-500/60 p-6 shadow-[0_0_30px_rgba(239,68,68,0.25)] space-y-4 bg-gradient-to-b from-rose-950/20 to-black/60 animate-pulse-slow">
        {/* Severity Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-black text-rose-400">
            <Flame className="w-5 h-5 text-rose-500 animate-bounce" />
            <span>INCIDENT COMMAND CONSOLE</span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-rose-500 text-white shadow-[0_0_12px_#ef4444]">
            {scenario.incidentSeverity || 'SEV-1 CRITICAL'}
          </span>
        </div>

        {/* Affected Host Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex items-center gap-3">
            <Server className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[10px] text-cyber-muted block">AFFECTED ENDPOINT</span>
              <strong className="text-cyber-text">{scenario.affectedHost || 'ENDPOINT-HOST-01'}</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-rose-400" />
            <div>
              <span className="text-[10px] text-cyber-muted block">CONTAINMENT PROTOCOL</span>
              <strong className="text-rose-400">IMMEDIATE ACTION REQUIRED</strong>
            </div>
          </div>
        </div>

        {/* Threat Alert Summary */}
        <div className="p-4 rounded-xl bg-black/70 border border-rose-500/40 text-sm font-mono text-rose-200 leading-relaxed">
          <p className="font-bold flex items-center gap-2 mb-1 text-white">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Alert Feed:
          </p>
          <p>{scenario.incidentSummary}</p>
        </div>
      </div>
    </div>
  );
};
