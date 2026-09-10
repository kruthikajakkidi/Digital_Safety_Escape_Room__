import React from 'react';
import { Shield, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export const GenericInteractive = ({ gameTitle, scenario }) => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-cyber-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-secondary font-bold">
          <Terminal className="w-4 h-4 text-cyber-primary" />
          <span>CYBER SIMULATION VIEWPORT</span>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-cyber-border/40 space-y-3 font-mono text-xs sm:text-sm text-cyber-text">
          <div className="text-cyan-300 font-bold text-sm">
            {scenario.context || gameTitle}
          </div>
          <p className="text-cyber-muted leading-relaxed">
            {scenario.scenarioDetails || 'Analyze the operational parameters, identify vulnerabilities or safe configurations, and execute your decision below.'}
          </p>
        </div>
      </div>
    </div>
  );
};
