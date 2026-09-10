import React, { useState } from 'react';
import { QrCode, AlertTriangle, ExternalLink, Zap, RotateCcw, Camera, Eye } from 'lucide-react';

export const QRScanner = ({ scenario }) => {
  const [activeZoom, setActiveZoom] = useState('1x');

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Hyper-Realistic Smartphone Camera Viewfinder */}
      <div className="max-w-md mx-auto rounded-[32px] border-[6px] border-gray-800 shadow-2xl bg-black overflow-hidden text-white relative">
        
        {/* Camera Top Controls Bar */}
        <div className="px-5 py-3 bg-black/80 backdrop-blur-md flex items-center justify-between text-xs z-20 select-none">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Zap className="w-4 h-4" />
            <span className="text-[10px]">AUTO</span>
          </div>

          <span className="text-[11px] font-medium text-gray-300">PHOTO</span>

          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-gray-600">RAW</span>
          </div>
        </div>

        {/* Camera Viewfinder & Physical Target */}
        <div className="relative p-6 min-h-[340px] flex flex-col items-center justify-center bg-radial from-gray-800 to-black overflow-hidden">
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:33.3%_33.3%] pointer-events-none" />

          {/* Physical Flyer Being Aimed At (Paper Poster on Wall) */}
          <div className="relative w-64 bg-white text-gray-900 p-4 rounded-xl shadow-2xl border border-gray-300 select-none transform hover:scale-[1.02] transition-transform">
            {/* Paper Header */}
            <div className="text-center border-b border-gray-200 pb-2 mb-3">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">
                {scenario.posterLocation || 'PUBLIC CAMPUS BOARD'}
              </span>
              <h4 className="text-xs font-black text-gray-900 uppercase">
                {scenario.posterTitle || 'OFFICIAL PARKING / EVENT NOTICE'}
              </h4>
            </div>

            {/* QR Code with Corner Focus Brackets */}
            <div className="relative w-36 h-36 mx-auto bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-2 shadow-inner">
              {/* Yellow Camera QR Focus Brackets */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-sm" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-sm" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-sm" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-sm" />

              <QrCode className="w-28 h-28 text-gray-900" />
            </div>

            {/* Physical Tampering Callout Overlay */}
            {scenario.physicalAnomaly && (
              <div className="mt-3 p-2 bg-rose-50 border border-rose-300 rounded-lg text-left text-[11px] text-rose-900 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Physical Tamper Alert:</strong> {scenario.physicalAnomaly}
                </span>
              </div>
            )}
          </div>

          {/* iOS Camera QR Code Yellow Link Notification Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-30">
            <div className="bg-amber-400 text-black px-3.5 py-2.5 rounded-full shadow-2xl flex items-center justify-between text-xs font-semibold animate-fade-in border border-amber-300">
              <div className="flex items-center gap-2 truncate pr-2">
                <ExternalLink className="w-4 h-4 shrink-0 text-gray-900" />
                <span className="truncate font-mono text-[11px]">
                  {scenario.decodedEndpoint || 'https://qr-payment-station.xyz/session'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-900 bg-amber-300 px-2 py-0.5 rounded-full shrink-0">
                Safari ↗
              </span>
            </div>
          </div>
        </div>

        {/* Camera Zoom & Bottom Shutter Controls Bar */}
        <div className="p-4 bg-black/95 border-t border-gray-800 flex flex-col items-center gap-3 select-none">
          {/* Zoom Selector Pills */}
          <div className="flex items-center gap-3 bg-gray-900/90 px-3 py-1 rounded-full text-xs font-bold text-gray-400">
            {['0.5', '1x', '2'].map((zoom) => (
              <button
                key={zoom}
                type="button"
                onClick={() => setActiveZoom(zoom)}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                  activeZoom === zoom ? 'bg-amber-400 text-black' : 'hover:text-white'
                }`}
              >
                {zoom}
              </button>
            ))}
          </div>

          {/* Camera Shutter Bar */}
          <div className="w-full flex items-center justify-around pt-1">
            <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-xs">
              🖼️
            </div>
            
            {/* Shutter Circle Button */}
            <div className="w-16 h-16 rounded-full border-4 border-white p-1 flex items-center justify-center cursor-pointer hover:scale-95 transition-transform">
              <div className="w-full h-full rounded-full bg-white" />
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 cursor-pointer">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
