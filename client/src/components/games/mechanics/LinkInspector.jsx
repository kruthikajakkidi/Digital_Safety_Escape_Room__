import React from 'react';
import { Link2, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const LinkInspector = ({ scenario }) => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-cyber-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-secondary font-bold">
          <Link2 className="w-4 h-4" />
          <span>DECONSTRUCTED URL TELEMETRY</span>
        </div>

        {/* Full URL banner */}
        <div className="p-3.5 rounded-lg bg-black/60 border border-cyber-border/60 text-xs sm:text-sm font-mono text-cyber-text break-all">
          <span className="text-cyber-muted mr-2">TARGET:</span>
          <span className="text-cyan-300 font-bold">{scenario.rawUrl}</span>
        </div>

        {/* Breakdown Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-cyber-muted block">1. SCHEME</span>
            <span className="text-emerald-400 font-bold">{scenario.scheme || 'https://'}</span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-cyber-muted block">2. SUBDOMAIN</span>
            <span className="text-cyan-300 font-bold">{scenario.subdomain || 'www'}</span>
          </div>

          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/40">
            <span className="text-[10px] text-rose-300 block font-bold">3. REGISTERED DOMAIN</span>
            <span className="text-rose-400 font-bold">{scenario.registeredDomain || 'unknown'}</span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-cyber-muted block">4. PATH</span>
            <span className="text-cyber-muted truncate block">{scenario.path || '/'}</span>
          </div>
        </div>

        {/* Educational Warning Pill */}
        <div className="p-3 rounded-lg bg-black/40 border border-cyber-border/40 text-xs font-mono flex items-start gap-2 text-cyber-muted">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-cyber-text">Analysis Hint:</strong> The server that receives your data is determined exclusively by the <strong>Registered Domain</strong> (Part 3), NOT by words in the subdomain or path!
          </span>
        </div>
      </div>
    </div>
  );
};
