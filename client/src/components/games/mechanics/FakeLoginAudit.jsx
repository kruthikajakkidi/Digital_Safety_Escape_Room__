import React, { useState } from 'react';
import { Globe, Lock, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { useSound } from '../../../context/SoundContext';

export const FakeLoginAudit = ({ scenario }) => {
  const [showCert, setShowCert] = useState(false);
  const { play } = useSound();

  return (
    <div className="w-full space-y-4">
      {/* Simulated Browser Frame */}
      <div className="rounded-xl cyber-panel border-cyber-border overflow-hidden shadow-2xl">
        {/* Browser Top Navigation Bar */}
        <div className="p-3 bg-black/60 border-b border-cyber-border/40 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Browser Address / URL Bar */}
          <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-cyber-border/60 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setShowCert(!showCert);
                play.click();
              }}
              title="Click to inspect SSL certificate"
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-emerald-400"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase font-bold">HTTPS</span>
            </button>

            <span className="text-cyber-text truncate select-all">{scenario.urlBar}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowCert(!showCert);
              play.click();
            }}
            className="text-xs font-mono text-cyan-300 hover:underline flex items-center gap-1 shrink-0"
          >
            <Info className="w-3.5 h-3.5" />
            {showCert ? 'Hide SSL' : 'Inspect SSL'}
          </button>
        </div>

        {/* Certificate Inspector Popup Drawer */}
        {showCert && (
          <div className="p-3 bg-emerald-950/30 border-b border-emerald-500/30 font-mono text-xs text-cyber-text space-y-1 animate-fade-in">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> SSL Certificate Telemetry:
            </div>
            <p className="text-[11px] text-cyber-muted">
              Issuer: {scenario.certificateIssuer || "Let's Encrypt Free Authority (Generated 24h ago)"}
            </p>
            <p className="text-[11px] text-amber-300">
              Note: Free TLS encrypts the transmission wire, but does NOT certify that the website owner is the genuine organization!
            </p>
          </div>
        )}

        {/* Simulated Website Sign-In Page */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/30">
          <div className="w-full max-w-sm p-6 rounded-xl cyber-panel border-cyber-border/50 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyber-primary/20 border border-cyber-primary/60 mx-auto flex items-center justify-center text-cyber-primary text-xl font-bold font-cyber">
              {scenario.spoofedBrand?.charAt(0) || '🔑'}
            </div>

            <h4 className="text-base font-cyber font-bold text-cyber-text">
              {scenario.pageTitle || 'Single Sign-On Authentication'}
            </h4>
            <p className="text-xs text-cyber-muted">
              Please enter your credentials to continue to your secure workspace.
            </p>

            <div className="space-y-3 text-left">
              {(scenario.formFields || ['Username or Email', 'Password']).map((field, idx) => (
                <div key={idx}>
                  <label className="text-[11px] font-mono text-cyber-muted block mb-1">{field}</label>
                  <input
                    type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                    placeholder={`Enter ${field}`}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-cyber-border/40 text-xs font-mono text-cyber-muted cursor-not-allowed"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-cyber-muted">
                Audit the address bar and decide what action to take below.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
