import React from 'react';
import { Shield, Sparkles, Terminal, Info, Laptop } from 'lucide-react';

export const GenericInteractive = ({ gameTitle, scenario }) => {
  return (
    <div className="w-full space-y-4 font-sans">
      {/* Modern Security Workstation Window */}
      <div className="rounded-2xl border border-gray-300 shadow-xl bg-white overflow-hidden text-gray-900">
        
        {/* Window Titlebar */}
        <div className="bg-[#dee1e6] px-4 py-2.5 flex items-center justify-between border-b border-gray-300 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-xs font-semibold text-gray-700 ml-2">
              Security Investigation Workstation — {gameTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
            <Laptop className="w-3.5 h-3.5 text-gray-500" />
            <span>Interactive Terminal</span>
          </div>
        </div>

        {/* Workstation Content Viewport */}
        <div className="p-6 sm:p-7 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-gray-900">
              {scenario.context || gameTitle}
            </h3>
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Active Security Inspection
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-gray-200 text-sm text-gray-800 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Scenario Situation Report:</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {scenario.scenarioDetails || 'Carefully analyze the security parameters, assess the threat vectors, and select the safest response below.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
