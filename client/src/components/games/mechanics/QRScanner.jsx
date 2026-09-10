import React, { useState } from 'react';
import { QrCode, Scan, AlertTriangle, ExternalLink } from 'lucide-react';

export const QRScanner = ({ scenario }) => {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl cyber-panel border-cyber-border p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold self-start">
          <Scan className="w-4 h-4" />
          <span>OPTICAL QR CODE SCANNER</span>
        </div>

        {/* Viewfinder Graphic */}
        <div className="relative w-56 h-56 rounded-2xl border-2 border-dashed border-cyber-secondary/60 bg-black/60 flex items-center justify-center overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-bounce" style={{ animationDuration: '2s' }} />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* QR Icon / Poster Representation */}
          <div className="text-center p-4">
            <QrCode className="w-24 h-24 text-white mx-auto opacity-90" />
            <span className="text-[10px] font-mono text-cyan-300 block mt-1 font-bold">
              {scenario.posterTitle || 'CAMPUS FLYER QR'}
            </span>
          </div>
        </div>

        {/* Poster Context & Physical Anomaly Callout */}
        <div className="w-full p-3.5 rounded-lg bg-black/40 border border-cyber-border/40 font-mono text-xs text-left space-y-1">
          <div className="flex items-center justify-between text-[11px] text-cyber-muted">
            <span>Location: {scenario.posterLocation || 'Public Area'}</span>
            <span className="text-amber-400 font-bold">PHYSICAL INSPECTION</span>
          </div>
          {scenario.physicalAnomaly && (
            <p className="text-rose-400 font-bold flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Notice: {scenario.physicalAnomaly}
            </p>
          )}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2">
            <span className="text-cyber-muted">Decoded Endpoint:</span>
            <span className="text-cyan-300 font-bold truncate select-all">{scenario.decodedEndpoint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
