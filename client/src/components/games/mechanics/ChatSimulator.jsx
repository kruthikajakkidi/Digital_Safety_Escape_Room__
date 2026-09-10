import React from 'react';
import { 
  ChevronLeft, Video, Phone, Info, ShieldAlert, 
  Send, Camera, Plus, Smile, Wifi, BatteryCharging, Signal
} from 'lucide-react';

export const ChatSimulator = ({ scenario }) => {
  const contactName = scenario.contactName || scenario.claimedIdentity || 'Unknown Sender';
  const initial = contactName.charAt(0).toUpperCase() || '?';
  const platform = scenario.platform || 'iMessage';

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Hyper-Realistic Smartphone Frame (iOS Style) */}
      <div className="max-w-md mx-auto rounded-[32px] border-[6px] border-gray-800 shadow-2xl bg-[#f2f2f7] overflow-hidden text-gray-900 relative">
        
        {/* Phone Speaker Notch / Dynamic Island & Status Bar */}
        <div className="bg-[#f8f8f8] px-6 pt-3 pb-2 flex items-center justify-between border-b border-gray-200 select-none">
          <span className="font-semibold text-xs text-gray-900">9:41</span>
          
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-4 rounded-full bg-black mx-auto shadow-inner" />

          {/* Status Icons: Signal, 5G/Wi-Fi, Battery */}
          <div className="flex items-center gap-1.5 text-gray-900">
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <div className="w-5 h-2.5 rounded-sm border border-gray-900 p-0.5 flex items-center">
              <div className="h-full w-full bg-gray-900 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Messaging Navigation Header */}
        <div className="px-4 py-3 bg-[#f8f8f8]/95 backdrop-blur-md border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#007aff] font-normal text-xs cursor-pointer">
            <ChevronLeft className="w-5 h-5 -ml-1" />
            <span className="font-medium">Messages</span>
          </div>

          {/* Centered Contact Profile */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center shadow-sm">
              {initial}
            </div>
            <span className="font-semibold text-xs text-gray-900 mt-0.5 truncate max-w-[150px]">
              {contactName}
            </span>
            <span className="text-[10px] text-gray-500 font-normal">
              {platform}
            </span>
          </div>

          {/* Video & Call Icons */}
          <div className="flex items-center gap-2 text-[#007aff]">
            <Video className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100" />
            <Phone className="w-3.5 h-3.5 cursor-pointer opacity-80 hover:opacity-100" />
          </div>
        </div>

        {/* Real-Life "Unknown Sender / Security Warning" Banner */}
        <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-[11px] leading-tight">
              Sender is not in your contacts list.
            </p>
            <p className="text-[10px] text-amber-700 leading-snug">
              Security notice: Organizations never ask for passwords, 2FA codes, or gift cards via text message.
            </p>
          </div>
        </div>

        {/* Chat Conversation Canvas */}
        <div className="p-4 space-y-4 bg-[#f2f2f7] min-h-[300px] flex flex-col justify-end">
          {/* Timestamp Divider */}
          <div className="text-center my-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-gray-200/80 text-gray-600">
              Today 10:42 AM
            </span>
          </div>

          {/* Incoming Message Bubble (Authentic iOS Style) */}
          <div className="flex items-end gap-2 max-w-[88%] self-start">
            <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center shrink-0 mb-1 shadow-xs">
              {initial}
            </div>
            <div className="relative bg-white text-gray-900 text-xs sm:text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-200/60">
              <p className="whitespace-pre-line select-text">
                {scenario.incomingMessage || 'Hello, this is an urgent security notification regarding your account credentials.'}
              </p>
              
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400">
                <span className="font-medium text-gray-500">
                  {scenario.claimedIdentity ? `Claim: ${scenario.claimedIdentity}` : ''}
                </span>
                <span>10:42 AM</span>
              </div>
            </div>
          </div>

          {/* Realistic Typing Bubble Indicator */}
          <div className="flex items-center gap-2 self-start pl-9">
            <div className="bg-white px-3.5 py-2 rounded-full rounded-bl-sm shadow-xs border border-gray-200/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[10px] text-gray-500 italic">
              Awaiting your response...
            </span>
          </div>
        </div>

        {/* Real-Life Bottom Smartphone Input Bar */}
        <div className="px-3 py-2 bg-[#f8f8f8] border-t border-gray-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-not-allowed">
            <Plus className="w-4 h-4" />
          </div>

          {/* Text Message Input Pill */}
          <div className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1.5 flex items-center justify-between text-xs text-gray-400">
            <span>{platform} message...</span>
            <Smile className="w-4 h-4 text-gray-400" />
          </div>

          {/* Send Button */}
          <div className="w-7 h-7 rounded-full bg-[#007aff] flex items-center justify-center text-white cursor-not-allowed shadow-sm">
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>

        {/* Bottom Home Indicator Bar (iOS Swipe Bar) */}
        <div className="bg-[#f8f8f8] pb-2 pt-1 flex justify-center">
          <div className="w-32 h-1 bg-gray-900/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
