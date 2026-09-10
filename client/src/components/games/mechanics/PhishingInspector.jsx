import React, { useState } from 'react';
import { 
  ArrowLeft, Archive, AlertOctagon, Trash2, MailOpen, Clock, 
  Tag, MoreVertical, Star, Reply, Printer, ExternalLink, 
  ChevronDown, Paperclip, Download, ShieldAlert, CheckCircle2,
  Search, Shield, AlertTriangle, FileText, CornerDownRight
} from 'lucide-react';
import { useSound } from '../../../context/SoundContext';

export const PhishingInspector = ({ scenario, redFlags = [] }) => {
  const [revealedFlags, setRevealedFlags] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(false);
  const { play } = useSound();

  const toggleFlag = (flagId) => {
    if (!revealedFlags.includes(flagId)) {
      play.combo();
      setRevealedFlags((prev) => [...prev, flagId]);
    }
  };

  // Parse sender display name and raw email
  const rawFrom = scenario.from || 'Security Service <security@account-update-alert.com>';
  const fromName = rawFrom.includes('<') ? rawFrom.split('<')[0].trim() : rawFrom;
  const fromEmail = rawFrom.includes('<') ? rawFrom.match(/<([^>]+)>/)?.[1] || rawFrom : rawFrom;
  const initial = fromName.charAt(0).toUpperCase() || 'S';

  // Realistic brand avatar color mapping
  const getAvatarBg = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('netflix')) return 'bg-[#e50914] text-white';
    if (lower.includes('google')) return 'bg-[#1a73e8] text-white';
    if (lower.includes('paypal')) return 'bg-[#003087] text-white';
    if (lower.includes('chase') || lower.includes('bank')) return 'bg-[#117aca] text-white';
    if (lower.includes('university') || lower.includes('bursar')) return 'bg-[#8c1d40] text-white';
    if (lower.includes('carter') || lower.includes('ceo')) return 'bg-[#6b21a8] text-white';
    return 'bg-[#0284c7] text-white';
  };

  const targetLink = `http://${scenario.targetDomain || 'netflx-verify-update.com'}/auth/verify?session=94821`;

  return (
    <div className="w-full space-y-4">
      {/* Hyper-Realistic Google Chrome Browser Frame */}
      <div className="rounded-2xl border border-gray-300 shadow-2xl bg-[#e8eaed] overflow-hidden text-gray-900 font-sans relative">
        
        {/* Chrome Window Top Tab Bar */}
        <div className="bg-[#dee1e6] px-3 pt-2.5 pb-0 flex items-center justify-between select-none border-b border-gray-300">
          <div className="flex items-center gap-1.5 flex-1 max-w-xs">
            {/* Active Chrome Tab */}
            <div className="flex items-center gap-2 bg-[#f6f8fc] px-3.5 py-1.5 rounded-t-lg text-xs font-medium text-gray-800 shadow-sm border-t border-l border-r border-gray-300 relative top-[1px]">
              <div className="w-3.5 h-3.5 rounded-sm bg-red-600 flex items-center justify-center text-[9px] text-white font-black">
                M
              </div>
              <span className="truncate max-w-[150px]">Inbox (1) - Gmail</span>
              <span className="text-gray-400 hover:text-gray-700 ml-1 text-xs">×</span>
            </div>
            {/* New Tab Button */}
            <button type="button" className="p-1 hover:bg-gray-300/60 rounded-full text-gray-600 text-xs" title="New tab">
              +
            </button>
          </div>

          {/* Chrome Window Control Buttons */}
          <div className="flex items-center gap-2 text-gray-600 pr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400/60 inline-block" />
          </div>
        </div>

        {/* Chrome Navigation & Omnibox Address Bar */}
        <div className="px-3 py-1.5 bg-[#f6f8fc] border-b border-gray-200 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <span className="p-1 hover:bg-gray-200 rounded cursor-not-allowed opacity-40">←</span>
            <span className="p-1 hover:bg-gray-200 rounded cursor-not-allowed opacity-40">→</span>
            <span className="p-1 hover:bg-gray-200 rounded cursor-pointer">↻</span>
          </div>

          {/* Real Chrome Omnibox */}
          <div className="flex-1 bg-white border border-gray-300 hover:border-gray-400 rounded-full px-3 py-1 flex items-center gap-2 shadow-inner text-gray-700">
            <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-medium">
              🔒 <span className="text-gray-500 hidden sm:inline">https://</span>
            </span>
            <span className="font-sans text-xs text-gray-900 truncate flex-1">
              mail.google.com<span className="text-gray-400">/mail/u/0/#inbox/{scenario.targetDomain ? scenario.targetDomain.slice(0, 8) : 'p94821'}</span>
            </span>
            <Star className="w-3.5 h-3.5 text-gray-400 hover:text-amber-400 cursor-pointer" />
          </div>

          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            U
          </div>
        </div>

        {/* Top Gmail App Bar / Search Header */}
        <div className="px-4 py-2.5 bg-[#f6f8fc] border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-gray-700 text-sm hidden sm:inline">Gmail</span>
          </div>

          {/* Search bar mockup */}
          <div className="flex-1 max-w-md bg-[#eaf1fb] hover:bg-[#e1eaf7] transition-colors rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-gray-600 shadow-inner">
            <Search className="w-3.5 h-3.5 text-gray-500" />
            <span className="truncate text-gray-500">Search mail</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans text-gray-500">1 of 18</span>
          </div>
        </div>

        {/* Gmail Action Toolbar */}
        <div className="px-4 py-2 bg-white/70 border-b border-gray-200 flex items-center justify-between text-gray-600 text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full transition-colors" title="Back to Inbox">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full transition-colors" title="Archive">
              <Archive className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              type="button" 
              onClick={() => toggleFlag('flag-sender')}
              className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors" 
              title="Report phishing"
            >
              <AlertOctagon className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full transition-colors" title="Delete">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full transition-colors" title="Mark as unread">
              <MailOpen className="w-4 h-4 text-gray-600" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full transition-colors hidden sm:inline-flex" title="Snooze">
              <Clock className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full" title="Print">
              <Printer className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-200/70 rounded-full" title="Open in new window">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Email Header / Subject Line */}
        <div className="px-6 sm:px-8 pt-6 pb-4 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg sm:text-xl font-normal text-gray-900 tracking-tight leading-snug">
              {scenario.subject}
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
              Inbox
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 self-end sm:self-auto">
            <button 
              type="button" 
              onClick={() => setIsStarred(!isStarred)}
              className="p-1 hover:text-amber-500 transition-colors"
              title="Star email"
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-gray-400'}`} />
            </button>
            <button type="button" className="p-1 hover:text-gray-700" title="Reply">
              <Reply className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:text-gray-700" title="More options">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sender Information Bar */}
        <div className="px-6 sm:px-8 py-4 bg-white flex items-start justify-between gap-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            {/* Sender Circle Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${getAvatarBg(fromName)}`}>
              {initial}
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="font-semibold text-sm text-gray-900">{fromName}</span>
                <button
                  type="button"
                  onClick={() => toggleFlag('flag-sender')}
                  className={`text-xs px-1.5 py-0.5 rounded transition-all flex items-center gap-1 ${
                    revealedFlags.includes('flag-sender')
                      ? 'bg-rose-100 text-rose-700 font-bold border border-rose-300'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                  title="Inspect sender email address"
                >
                  <span>&lt;{fromEmail}&gt;</span>
                  {revealedFlags.includes('flag-sender') && (
                    <span className="text-[10px] bg-rose-600 text-white px-1 rounded font-mono">FLAGGED</span>
                  )}
                </button>
              </div>

              {/* To me dropdown trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                >
                  <span>to me</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Expanded Security Details Popover */}
                {showDetails && (
                  <div className="absolute top-6 left-0 z-30 w-80 sm:w-96 p-4 rounded-xl bg-white border border-gray-300 shadow-xl text-xs space-y-2 font-sans animate-fade-in text-gray-800">
                    <div className="grid grid-cols-4 gap-1.5 pb-2 border-b border-gray-100">
                      <span className="text-gray-500">from:</span>
                      <span className="col-span-3 font-medium text-gray-900">{scenario.from}</span>

                      <span className="text-gray-500">to:</span>
                      <span className="col-span-3 text-gray-900">{scenario.to || 'agent.user@cyberworld.org'}</span>

                      <span className="text-gray-500">date:</span>
                      <span className="col-span-3 text-gray-900">{scenario.date || 'Today, 09:14 AM'}</span>

                      <span className="text-gray-500">subject:</span>
                      <span className="col-span-3 text-gray-900">{scenario.subject}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 pt-1 text-[11px]">
                      <span className="text-gray-500">mailed-by:</span>
                      <span className="col-span-3 text-amber-700 font-mono">
                        {scenario.targetDomain ? `relay-${scenario.targetDomain}` : 'external-mailer.xyz'}
                      </span>

                      <span className="text-gray-500">security:</span>
                      <span className="col-span-3 text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Unauthenticated domain (Sender verification failed)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date Stamp */}
          <div className="text-xs text-gray-500 whitespace-nowrap pt-1 font-normal">
            {scenario.date || 'Today, 09:14 AM'} (2 hours ago)
          </div>
        </div>

        {/* Pure White Email Content Canvas */}
        <div className="p-6 sm:p-10 bg-white min-h-[220px] text-[14px] text-gray-800 leading-relaxed font-sans space-y-5">
          {/* Email Body text with authentic webmail link typography */}
          <div 
            onMouseOver={(e) => {
              if (e.target.tagName === 'A' || e.target.closest('a')) {
                setHoveredLink(true);
              }
            }}
            onMouseOut={(e) => {
              if (e.target.tagName === 'A' || e.target.closest('a')) {
                setHoveredLink(false);
              }
            }}
            onClick={(e) => {
              const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
              if (link) {
                e.preventDefault();
                toggleFlag('flag-link');
              }
            }}
            className="prose max-w-none text-gray-800 leading-relaxed space-y-3 [&_a]:text-[#1a73e8] [&_a]:font-medium [&_a]:underline hover:[&_a]:text-[#1557b0] [&_p]:text-gray-800"
            dangerouslySetInnerHTML={{ __html: scenario.bodyHtml }} 
          />

          {/* Interactive Link Target Preview Box */}
          <div className="pt-4 border-t border-gray-200/80">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block">
                  Interactive Link Target Inspection:
                </span>
                <p className="text-xs text-gray-600">
                  Hover or click to inspect where the button/link actually directs:
                </p>
              </div>

              <button
                type="button"
                onMouseEnter={() => setHoveredLink(true)}
                onMouseLeave={() => setHoveredLink(false)}
                onClick={() => toggleFlag('flag-link')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  revealedFlags.includes('flag-link')
                    ? 'bg-rose-100 text-rose-800 border border-rose-300 shadow-sm'
                    : 'bg-white hover:bg-blue-50 text-blue-600 border border-gray-300 hover:border-blue-300'
                }`}
              >
                <span>{scenario.targetDomain || 'netflx-verify-update.com'}</span>
                {revealedFlags.includes('flag-link') ? (
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded">Rogue Host</span>
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                )}
              </button>
            </div>
          </div>

          {/* Attachment Box if Present (Gmail Style) */}
          {scenario.attachment && (
            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-500 block mb-2">1 Attachment:</span>
              <div 
                onClick={() => toggleFlag('flag-attachment')}
                className={`inline-flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  revealedFlags.includes('flag-attachment')
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-800'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left pr-4">
                  <div className="font-semibold text-xs text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                    {scenario.attachment.name}
                  </div>
                  <span className="text-[11px] text-gray-500">{scenario.attachment.size || '142 KB'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 pl-2 border-l border-gray-200">
                  <Download className="w-4 h-4 hover:text-gray-700" />
                </div>
              </div>
            </div>
          )}

          {/* Real-Life Chrome / Browser Status Bar Link Preview (Bottom Left) */}
          {(hoveredLink || revealedFlags.includes('flag-link')) && (
            <div className="fixed bottom-3 left-4 z-50 bg-[#202124] text-gray-200 text-xs font-mono px-3 py-1.5 rounded shadow-2xl border border-gray-700 flex items-center gap-2 animate-fade-in">
              <CornerDownRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>{targetLink}</span>
            </div>
          )}
        </div>

        {/* Red Flags Discovered Counter Bar */}
        {redFlags.length > 0 && (
          <div className="px-6 py-3 bg-[#eaf1fb] border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-gray-700">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Red Flags Identified:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold px-2 py-0.5 rounded-full bg-white text-blue-700 border border-blue-200">
                {revealedFlags.length} / {redFlags.length} Found
              </span>
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                (Click sender email, link target, or attachments to analyze)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

