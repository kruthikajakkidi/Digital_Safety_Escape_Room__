import React, { useState } from 'react';
import { 
  Lock, AlertTriangle, ShieldCheck, Info, Star, RotateCw, 
  ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2, Globe, ExternalLink
} from 'lucide-react';
import { useSound } from '../../../context/SoundContext';

export const FakeLoginAudit = ({ scenario }) => {
  const [showCert, setShowCert] = useState(false);
  const { play } = useSound();

  const brand = (scenario.spoofedBrand || '').toLowerCase();
  const hasHttps = scenario.hasHttps !== false;

  // Render brand-specific authentic logo
  const renderBrandLogo = () => {
    if (brand.includes('microsoft') || brand.includes('azure')) {
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <span className="bg-[#f25022] w-2.5 h-2.5" />
            <span className="bg-[#7fba00] w-2.5 h-2.5" />
            <span className="bg-[#00a4ef] w-2.5 h-2.5" />
            <span className="bg-[#ffb900] w-2.5 h-2.5" />
          </div>
          <span className="font-semibold text-lg text-gray-700 tracking-tight">Microsoft</span>
        </div>
      );
    }
    if (brand.includes('google')) {
      return (
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#4285f4]">G</span>
            <span className="text-[#ea4335]">o</span>
            <span className="text-[#fbbc05]">o</span>
            <span className="text-[#4285f4]">g</span>
            <span className="text-[#34a853]">l</span>
            <span className="text-[#ea4335]">e</span>
          </span>
        </div>
      );
    }
    if (brand.includes('paypal')) {
      return (
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl font-black italic tracking-tighter text-[#003087]">
            Pay<span className="text-[#0079c1]">Pal</span>
          </span>
        </div>
      );
    }
    if (brand.includes('apple')) {
      return (
        <div className="flex items-center justify-center mb-4 text-3xl text-gray-900">
          
        </div>
      );
    }
    if (brand.includes('discord')) {
      return (
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-black text-lg">
            🎮
          </div>
        </div>
      );
    }
    if (brand.includes('steam')) {
      return (
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#171a21] flex items-center justify-center text-white text-lg">
            ⚙️
          </div>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 mx-auto mb-4 flex items-center justify-center text-blue-600 text-xl font-bold shadow-sm">
        {scenario.spoofedBrand?.charAt(0) || '🔑'}
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Hyper-Realistic Google Chrome Browser Window */}
      <div className="rounded-2xl border border-gray-300 shadow-2xl bg-[#dee1e6] overflow-hidden text-gray-900 font-sans relative">
        
        {/* Top Chrome Tab Bar */}
        <div className="px-3 pt-2.5 pb-0 flex items-center justify-between select-none border-b border-gray-300">
          <div className="flex items-center gap-1.5 flex-1 max-w-sm">
            {/* Active Webpage Tab */}
            <div className="flex items-center gap-2 bg-[#ffffff] px-3.5 py-1.5 rounded-t-lg text-xs font-medium text-gray-800 shadow-sm border-t border-l border-r border-gray-300 relative top-[1px]">
              <span className="text-xs">
                {brand.includes('google') ? '🔍' : brand.includes('microsoft') ? '🪟' : brand.includes('paypal') ? '💳' : '🌐'}
              </span>
              <span className="truncate max-w-[180px] font-sans">
                {scenario.pageTitle || 'Sign in to your account'}
              </span>
              <span className="text-gray-400 hover:text-gray-700 ml-1 text-xs cursor-pointer">×</span>
            </div>

            {/* New Tab Button */}
            <button type="button" className="p-1 hover:bg-gray-300/60 rounded-full text-gray-600 text-xs" title="New tab">
              +
            </button>
          </div>

          {/* Window Controls (Minimize, Maximize, Close) */}
          <div className="flex items-center gap-2 text-gray-600 pr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
          </div>
        </div>

        {/* Browser Navigation Toolbar & Omnibox */}
        <div className="px-3 py-1.5 bg-[#ffffff] border-b border-gray-200 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400 cursor-not-allowed" title="Back">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400 cursor-not-allowed" title="Forward">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Reload">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox / Address Bar */}
          <div className="flex-1 bg-[#f1f3f4] hover:bg-[#eaecef] transition-colors rounded-full px-3 py-1.5 flex items-center gap-2 border border-transparent hover:border-gray-300 text-gray-800">
            {/* Padlock / Security Trigger */}
            <button
              type="button"
              onClick={() => {
                setShowCert(!showCert);
                play.click();
              }}
              title="Click to view site information & SSL certificate"
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all ${
                hasHttps 
                  ? 'text-gray-700 hover:bg-gray-200/80' 
                  : 'bg-rose-100 text-rose-700 font-bold'
              }`}
            >
              {hasHttps ? (
                <Lock className="w-3.5 h-3.5 text-gray-700" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              )}
              {!hasHttps && <span className="text-[10px] uppercase font-bold">Not Secure</span>}
            </button>

            {/* URL String */}
            <span className="font-mono text-xs text-gray-900 truncate flex-1 select-all">
              {scenario.urlBar}
            </span>

            <button
              type="button"
              onClick={() => {
                setShowCert(!showCert);
                play.click();
              }}
              className="text-[11px] font-sans font-medium text-blue-600 hover:text-blue-800 hover:underline shrink-0 hidden sm:inline"
            >
              {showCert ? 'Hide Certificate' : 'Inspect Certificate'}
            </button>

            <Star className="w-3.5 h-3.5 text-gray-400 hover:text-amber-500 cursor-pointer" />
          </div>

          {/* User Profile Avatar */}
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            U
          </div>
        </div>

        {/* Chrome "Site Information" Security Drawer */}
        {showCert && (
          <div className="px-5 py-3.5 bg-white border-b border-gray-200 font-sans text-xs text-gray-800 shadow-md animate-fade-in space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 
                {hasHttps ? 'Connection is encrypted' : 'Connection is insecure (HTTP)'}
              </div>
              <span className="text-[11px] text-gray-500 font-mono">Chrome Security Telemetry</span>
            </div>

            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Certificate Status:</span>
                <span className="font-medium text-emerald-700">Valid & Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Certificate Issuer:</span>
                <span className="font-medium text-gray-900">
                  {scenario.certificateIssuer || "Let's Encrypt Free Authority (Issued recently)"}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg leading-relaxed">
              <strong>⚠️ Educational Note:</strong> A valid SSL padlock (HTTPS) encrypts data between your browser and the web server. It does <em>NOT</em> authenticate that the website owner is the genuine organization! Free certificates can be obtained by anyone in seconds.
            </p>
          </div>
        )}

        {/* Simulated Website Viewport (Pure White / Authentic Web Page) */}
        <div className="p-6 sm:p-12 flex flex-col items-center justify-center bg-[#f0f2f5] min-h-[360px]">
          
          {/* Authentic Login Card */}
          <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-gray-200 shadow-xl text-left space-y-4">
            
            {/* Logo */}
            {renderBrandLogo()}

            {/* Form Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                {scenario.pageTitle || 'Sign in'}
              </h3>
              <p className="text-xs text-gray-500">
                to continue to {scenario.spoofedBrand || 'your account'}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 pt-2">
              {(scenario.formFields || ['Email address or username', 'Password']).map((field, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 block">
                    {field}
                  </label>
                  <input
                    type={field.toLowerCase().includes('password') || field.toLowerCase().includes('pin') ? 'password' : 'text'}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    disabled
                    className="w-full px-3.5 py-2 rounded-lg bg-gray-50 border border-gray-300 text-xs text-gray-500 cursor-not-allowed focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons Mockup */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-blue-600 hover:underline cursor-not-allowed">
                Forgot credentials?
              </span>
              <button
                type="button"
                disabled
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm cursor-not-allowed"
              >
                Sign In
              </button>
            </div>

            {/* Subtle Audit Guidance Callout */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
              <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>
                Carefully audit the domain in the address bar above before selecting an action below.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
