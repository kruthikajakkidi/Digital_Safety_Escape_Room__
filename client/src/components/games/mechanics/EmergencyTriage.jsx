import React from 'react';
import { AlertTriangle, Flame, Shield, Terminal, Server, Clock, Activity, HardDrive } from 'lucide-react';

export const EmergencyTriage = ({ scenario, timeRemaining = 30 }) => {
  return (
    <div className="w-full space-y-4 font-sans">
      {/* Enterprise SOC Security Operations Console (CrowdStrike / Defender Style) */}
      <div className="rounded-2xl border border-red-300 shadow-xl bg-white overflow-hidden text-gray-900">
        
        {/* SOC Incident Header */}
        <div className="px-6 py-4 bg-red-50 border-b border-red-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-red-950">
                  INCIDENT COMMAND ALERT #{scenario.interactivePayload || 'INC-8821'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                  {scenario.incidentSeverity || 'SEV-1 CRITICAL'}
                </span>
              </div>
              <span className="text-[11px] text-red-700">
                Active Breach Detection & Live Containment Triage
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-red-900 bg-white/80 px-3 py-1 rounded-lg border border-red-200">
            <Clock className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Target Response Window: {timeRemaining}s</span>
          </div>
        </div>

        {/* Endpoint Telemetry Breakdown */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-semibold uppercase">
                <Server className="w-3.5 h-3.5 text-blue-600" />
                <span>Affected Endpoint</span>
              </div>
              <strong className="font-mono text-gray-900 block text-sm">
                {scenario.affectedHost || 'CORP-WS-0941.internal'}
              </strong>
              <span className="text-[10px] text-gray-500 block">Host Status: Beaconing Outbound</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-semibold uppercase">
                <Activity className="w-3.5 h-3.5 text-amber-600" />
                <span>Threat Signature</span>
              </div>
              <strong className="font-mono text-amber-900 block text-sm">
                T1059 / Command & Scripting
              </strong>
              <span className="text-[10px] text-gray-500 block">MITRE ATT&CK Classification</span>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1">
              <div className="flex items-center gap-2 text-red-700 text-[10px] font-bold uppercase">
                <Shield className="w-3.5 h-3.5 text-red-600" />
                <span>Containment Status</span>
              </div>
              <strong className="font-mono text-red-800 block text-sm">
                ACTION PENDING
              </strong>
              <span className="text-[10px] text-red-700 block">Zero-Trust Isolation Needed</span>
            </div>
          </div>

          {/* Incident Telemetry Log Box */}
          <div className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-800 pb-2">
              <span className="flex items-center gap-1.5 text-red-400 font-bold">
                <Terminal className="w-3.5 h-3.5" /> Live EDR Agent Telemetry Feed:
              </span>
              <span>Sensors Online (100%)</span>
            </div>
            <p className="text-gray-200 leading-relaxed pt-1">
              {scenario.incidentSummary || scenario.scenarioDetails || 'Anomalous executable spawned child PowerShell process beaconing to unrecognized external IP. Memory entropy indicates possible pre-ransomware staging.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
