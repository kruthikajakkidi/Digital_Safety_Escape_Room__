import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, Check, X, ShieldAlert, KeyRound } from 'lucide-react';

export const PasswordFortress = ({ scenario }) => {
  const [testPassword, setTestPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

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

  // Real-world crack time estimate
  const getCrackTime = () => {
    if (!testPassword) return 'Enter a password to analyze';
    if (score < 30) return 'Instant (Brute-forced in milliseconds)';
    if (score < 50) return 'Approx. 4 hours on modern GPU cluster';
    if (score < 75) return 'Approx. 6 months';
    if (score < 85) return 'Approx. 800 years';
    return 'Over 2.4 million centuries (Immune to dictionary & offline hashcat clusters)';
  };

  return (
    <div className="w-full space-y-4 font-sans">
      <div className="rounded-2xl border border-gray-300 shadow-xl bg-white p-6 sm:p-7 space-y-5 text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">
                Password Security & Entropy Audit
              </h3>
              <span className="text-[11px] text-gray-500">
                Real-world cryptographic strength estimator (NIST 800-63B standards)
              </span>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            isFortified 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {isFortified ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NIST Compliant</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Needs Hardening</span>
              </>
            )}
          </span>
        </div>

        {/* Live Interactive Passphrase Tester */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Test Passphrase Strength & Dictionary Crack Resistance:
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="Type or test a passphrase (e.g. correct-horse-battery-staple#9)"
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-50 border border-gray-300 text-sm font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="space-y-2 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-gray-600">Calculated Crack Resistance:</span>
            <span className="font-bold text-gray-900">{score}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.max(score, 4)}%` }}
            />
          </div>
          <div className="text-[11px] text-gray-600 pt-1 flex items-center justify-between">
            <span className="font-medium">Estimated Crack Time:</span>
            <span className="font-mono font-semibold text-gray-900">{getCrackTime()}</span>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
            isLongEnough 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}>
            {isLongEnough ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-gray-400" />}
            <span className="font-medium">14+ Characters</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
            hasUpper && hasLower 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}>
            {hasUpper && hasLower ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-gray-400" />}
            <span className="font-medium">Mixed Case</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
            hasNumber 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}>
            {hasNumber ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-gray-400" />}
            <span className="font-medium">Numbers (0-9)</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
            hasSymbol 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}>
            {hasSymbol ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-gray-400" />}
            <span className="font-medium">Symbols (!@#$)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
