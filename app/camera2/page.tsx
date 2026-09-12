'use client';

import React, { useState } from 'react';

export default function ResaleScannerPage() {
  const [isPressed, setIsPressed] = useState(false);

  const handleStartScan = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  return (
    <div className="h-full w-full overflow-hidden text-[#F8F6F0] antialiased select-none flex justify-center items-center bg-stone-950 font-sans min-h-screen">
      {/* Custom Styles / Keyframes embedded via React style block */}
      <style jsx global>{`
        @keyframes subtle-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.015);
          }
        }

        @keyframes audio-wave {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }

        .animate-breathe {
          animation: subtle-breathe 4s ease-in-out infinite;
        }

        .wave-bar-1 { animation: audio-wave 1.2s ease-in-out infinite 0.1s; }
        .wave-bar-2 { animation: audio-wave 1.2s ease-in-out infinite 0.3s; }
        .wave-bar-3 { animation: audio-wave 1.2s ease-in-out infinite 0.2s; }
      `}</style>

      {/* Mobile Viewport Simulator Shell */}
      <main className="relative w-full max-w-[430px] h-screen sm:h-[92vh] sm:max-h-[890px] sm:rounded-[48px] overflow-hidden shadow-2xl flex flex-col justify-between bg-black border border-stone-800/60" data-purpose="mobile-viewport">
        
        {/* BEGIN: LiveCameraFeed */}
        <div className="absolute inset-0 z-0 overflow-hidden" data-purpose="camera-background">
          <div className="w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800/20 via-transparent to-black/80 pointer-events-none" />
          </div>
          {/* Film grain & warm ambient gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply pointer-events-none" />
        </div>
        {/* END: LiveCameraFeed */}

        {/* BEGIN: TopStatusBarAndControls */}
        <header className="relative z-20 pt-3 px-6 flex flex-col gap-3" data-purpose="top-navigation">
          {/* Status Bar Row */}
          <div className="w-full flex justify-between items-center text-[13px] font-medium tracking-tight text-white/80" data-purpose="ios-status-bar">
            <span>9:41</span>
            <div className="w-24 h-4 bg-black rounded-full mx-auto hidden sm:block opacity-60" />
            <div className="flex items-center gap-1.5">
              {/* Cellular Signal */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
              </svg>
              {/* Wifi */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-3.5 bg-white/90 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Header Action Bar (Dismiss, Lighting Toggle) */}
          <div className="flex items-center justify-between mt-1" data-purpose="header-actions">
            {/* Close Button */}
            <button
              aria-label="Dismiss scan"
              className="w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform"
              type="button"
            >
              <svg className="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Torch / Flash Toggle */}
            <button
              aria-label="Toggle camera light"
              className="w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform"
              type="button"
            >
              <svg className="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Prompt & Identification Badge */}
          <div className="mt-4 px-1 text-center" data-purpose="editorial-prompt">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/15 text-[11px] tracking-wide text-[#F8F6F0]/90 mb-3 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">Handbag identified</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-[34px] tracking-tight leading-[1.15] font-normal text-[#F8F6F0] drop-shadow-md">
              Great. Now show me the bottom corners so I can check for wear.
            </h1>
          </div>
        </header>
        {/* END: TopStatusBarAndControls */}

        {/* BEGIN: ViewfinderFramingBrackets */}
        <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-4 pointer-events-none" data-purpose="viewfinder-guides">
          <div className="relative w-full aspect-[4/5] max-h-[380px] flex items-center justify-center animate-breathe">
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[2.5px] border-l-[2.5px] border-amber-100/90 rounded-tl-sm shadow-[0_0_12px_rgba(251,191,36,0.35)]" />
            {/* Top-Right Bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[2.5px] border-r-[2.5px] border-amber-100/90 rounded-tr-sm shadow-[0_0_12px_rgba(251,191,36,0.35)]" />
            {/* Bottom-Left Bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[2.5px] border-l-[2.5px] border-amber-100/90 rounded-bl-sm shadow-[0_0_12px_rgba(251,191,36,0.35)]" />
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2.5px] border-r-[2.5px] border-amber-100/90 rounded-br-sm shadow-[0_0_12px_rgba(251,191,36,0.35)]" />
          </div>
        </section>
        {/* END: ViewfinderFramingBrackets */}

        {/* BEGIN: BottomInteractionBar */}
        <footer className="relative z-20 pb-8 pt-4 px-6 flex flex-col items-center gap-5 bg-gradient-to-t from-black via-black/80 to-transparent" data-purpose="interaction-dock">
          {/* Voice Input Pill Bar */}
          <button
            className="group w-full py-3 px-4 rounded-2xl bg-stone-900/65 backdrop-blur-2xl border border-white/10 hover:border-white/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-between shadow-xl"
            data-purpose="voice-query-pill"
            type="button"
          >
            <div className="flex items-center gap-3">
              {/* Ambient Mic Icon */}
              <div className="w-8 h-8 rounded-full bg-stone-800/80 border border-white/10 flex items-center justify-center text-amber-100 group-hover:bg-stone-700/80 transition-colors">
                <svg className="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[13.5px] font-medium text-[#F8F6F0]/90 tracking-tight flex items-center gap-1.5">
                  <span>Tell me anything about it...</span>
                </p>
              </div>
            </div>
            {/* Animated Audio Waveform Dots */}
            <div className="flex items-center gap-0.5 px-2 h-5">
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-1" />
              <span className="w-[2.5px] bg-stone-300 rounded-full wave-bar-2" />
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-3" />
            </div>
          </button>

          {/* Primary Controls Row */}
          <div className="w-full flex items-center justify-between px-2 pt-1" data-purpose="primary-controls">
            {/* Left Accessory Spacer */}
            <div className="w-10 h-10" />

            {/* Center Shutter Button: "Analyzing" State */}
            <div className="flex flex-col items-center gap-2">
              <button
                aria-label="Inspection in progress"
                className={`relative group transition-transform duration-200 ${isPressed ? 'scale-90' : 'active:scale-95'}`}
                id="start-scan-btn"
                onClick={handleStartScan}
                type="button"
              >
                <div className="absolute -inset-1.5 rounded-full bg-amber-100/20 blur-md animate-pulse" />
                <div className="relative w-20 h-20 rounded-full border-[2.5px] border-amber-100/70 flex items-center justify-center p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center shadow-inner">
                    <div className="w-[84%] h-[84%] rounded-full border border-stone-300/80 bg-gradient-to-tr from-stone-200 to-white flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <span className="text-[11px] font-semibold text-amber-100/90 uppercase tracking-[0.18em] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-300" />
                Analyzing
              </span>
            </div>

            {/* Right Accessory: Camera Flip Switch */}
            <button
              aria-label="Switch camera angle"
              className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-xl border border-white/15 flex items-center justify-center text-[#F8F6F0]/85 active:scale-95 transition-all hover:bg-stone-800/80 shadow-md"
              type="button"
            >
              <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Home Indicator Line for iOS Devices */}
          <div className="w-32 h-1 bg-white/30 rounded-full mt-1" />
        </footer>
        {/* END: BottomInteractionBar */}
      </main>
    </div>
  );
}