import React from 'react';
import { Link2, AlertOctagon, Lock, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LinkInspector = ({ scenario }) => {
  return (
    <div className="w-full space-y-4 font-sans">
      <div className="rounded-2xl border border-gray-300 shadow-xl bg-white p-6 sm:p-7 space-y-5 text-gray-900">
        
        {/* Real-Life Browser Address Bar Preview */}
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Browser Address Bar Representation (Google Chrome):
            </span>
            <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              URL Decomposition
            </span>
          </div>

          <div className="p-3 bg-[#f1f3f4] rounded-full border border-gray-300 flex items-center gap-2 shadow-inner">
            <Lock className="w-4 h-4 text-gray-600 ml-1 shrink-0" />
            <div className="font-mono text-xs sm:text-sm truncate select-all">
              <span className="text-gray-400">{scenario.scheme || 'https://'}</span>
              <span className="text-gray-600">{scenario.subdomain ? `${scenario.subdomain}.` : ''}</span>
              <span className="text-gray-950 font-bold bg-amber-100 px-1 py-0.5 rounded border border-amber-300">
                {scenario.registeredDomain || 'example.com'}
              </span>
              <span className="text-gray-500">{scenario.path || '/login'}</span>
            </div>
          </div>
        </div>

        {/* Breakdown Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {/* Scheme */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block">
              1. Transfer Protocol
            </span>
            <span className="font-mono font-bold text-emerald-700 block text-sm">
              {scenario.scheme || 'https://'}
            </span>
            <span className="text-[10px] text-gray-500 block">Transport Layer Security</span>
          </div>

          {/* Subdomain */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block">
              2. Subdomain Prefix
            </span>
            <span className="font-mono font-bold text-blue-700 block text-sm truncate">
              {scenario.subdomain || 'www'}
            </span>
            <span className="text-[10px] text-gray-500 block">Configured by domain owner</span>
          </div>

          {/* Registered Domain */}
          <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide flex items-center justify-between">
              <span>3. Target Domain</span>
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded">DESTINATION</span>
            </span>
            <span className="font-mono font-black text-rose-900 block text-sm truncate">
              {scenario.registeredDomain || 'unknown'}
            </span>
            <span className="text-[10px] text-rose-700 font-medium block">Controls destination server</span>
          </div>

          {/* Path */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block">
              4. Endpoint Resource Path
            </span>
            <span className="font-mono font-medium text-gray-800 block text-sm truncate">
              {scenario.path || '/'}
            </span>
            <span className="text-[10px] text-gray-500 block">Folder & query parameters</span>
          </div>
        </div>

        {/* Real-World Security Rule Callout */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed">
          <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-950 font-semibold block text-sm">
              Real-World Browser Routing Rule:
            </strong>
            <p>
              Your browser sends your passwords and authentication cookies <strong>exclusively to the Registered Domain (Block 3)</strong>. Attackers often insert deceptive brand names like <code className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded font-mono">google.com</code> or <code className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded font-mono">paypal</code> into the <em>Subdomain</em> (Block 2) to trick users. Always look immediately to the left of the first single slash <code className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded font-mono">/</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
