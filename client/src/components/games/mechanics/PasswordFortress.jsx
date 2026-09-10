import React, { useState } from 'react';
import { Shield, Lock, Unlock, KeyRound, Check, AlertCircle } from 'lucide-react';

export const PasswordFortress = ({ scenario }) => {
  const [testPassword, setTestPassword] = useState('');

  // Calculate live strength metrics
  const hasUpper = /[A-Z]/.test(testPassword);
  const hasLower = /[a-z]/.test(testPassword);
  const hasNumber = /[0-9]/.test(testPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(testPassword);
  const isLongEnough = testPassword.length >= 14;

  let score = 0;
  if (testPassword.length >= 8) score += 20;
  if (testPassword.length >= 14) score += 25;
  if (hasUpper) score += 15;
  if (hasLower) score += 10;
  if (hasNumber) score += 15;
  if (hasSymbol) score += 15;

  const isFortified = score >= 80;

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-cyber-border p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-secondary font-bold">
            <KeyRound className="w-4 h-4 text-cyber-primary" />
            <span>CRYPTOGRAPHIC VAULT METRICS</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
            isFortified ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
          }`}>
            {isFortified ? '🛡️ VAULT FORTIFIED' : '⚠️ VAULT AT RISK'}
          </span>
        </div>

        {/* Live Interactive Passphrase Tester */}
        <div>
          <label className="text-xs font-mono text-cyber-muted block mb-1.5">
            Test Passphrase Strength & Entropy Analyzer:
          </label>
          <div className="relative">
            <input
              type="text"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="e.g. cobalt#Solar-Falcon99*Wave"
              className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-cyber-border text-sm font-mono text-cyber-text focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
            />
          </div>
        </div>

        {/* Live Strength Bar */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-cyber-muted">Estimated Entropy & Crack Resistance:</span>
            <span className="font-bold text-cyber-primary">{score}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/50 border border-cyber-border/40 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                score >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          <div className={`p-2 rounded border flex items-center gap-1.5 ${isLongEnough ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-cyber-muted'}`}>
            <Check className="w-3.5 h-3.5" /> 14+ Chars
          </div>
          <div className={`p-2 rounded border flex items-center gap-1.5 ${hasUpper && hasLower ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-cyber-muted'}`}>
            <Check className="w-3.5 h-3.5" /> Case Mix
          </div>
          <div className={`p-2 rounded border flex items-center gap-1.5 ${hasNumber ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-cyber-muted'}`}>
            <Check className="w-3.5 h-3.5" /> Numbers
          </div>
          <div className={`p-2 rounded border flex items-center gap-1.5 ${hasSymbol ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-cyber-muted'}`}>
            <Check className="w-3.5 h-3.5" /> Symbols
          </div>
        </div>
      </div>
    </div>
  );
};
