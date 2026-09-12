'use client';

import React, { useState, useRef } from 'react';

interface StoredFile {
  id: string;
  file: File;
  previewUrl: string;
}

export default function ResaleScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedFiles, setCapturedFiles] = useState<StoredFile[]>([]);
  
  // Hidden file input reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file picker when capture button is clicked
  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 200);

    // Open file selector
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle selected/imported files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newEntries: StoredFile[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setCapturedFiles((prev) => [...prev, ...newEntries]);

    // Reset input value so the same file can be selected again if needed
    e.target.value = '';
  };

  // Remove individual stored item
  const handleRemoveFile = (idToRemove: string) => {
    setCapturedFiles((prev) => {
      const fileToRemove = prev.find((item) => item.id === idToRemove);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== idToRemove);
    });
  };

  return (
    <div className="h-full w-full overflow-hidden text-[#F8F6F0] antialiased select-none flex justify-center items-center bg-stone-950 font-sans min-h-screen">
      {/* Hidden File Input for capture/import */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

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

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Mobile Viewport Simulator Shell */}
      <main className="relative w-full max-w-[430px] h-screen sm:h-[92vh] sm:max-h-[890px] sm:rounded-[48px] overflow-hidden shadow-2xl flex flex-col justify-between bg-black border border-stone-800/60">
        
        {/* BEGIN: LiveCameraFeed */}
        <div className="absolute inset-0 z-0 overflow-hidden" data-purpose="camera-background">
          <div className="w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-black relative">
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xl" />
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

          {/* Header Action Bar */}
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

          {/* Editorial Prompt */}
          <div className="mt-4 px-1 text-center" data-purpose="editorial-prompt">
            <h1 className="font-serif text-3xl sm:text-[34px] tracking-tight leading-[1.15] font-normal text-[#F8F6F0] drop-shadow-md">
              Show me what you want to sell.
            </h1>
            <p className="text-[13px] font-light text-[#F8F6F0]/70 tracking-wide mt-1.5">
              Align item inside the frame • natural light works best
            </p>
          </div>
        </header>
        {/* END: TopStatusBarAndControls */}

        {/* BEGIN: ViewfinderFramingBrackets */}
        <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-4 pointer-events-none" data-purpose="viewfinder-guides">
          <div className="relative w-full aspect-[4/5] max-h-[380px] flex items-center justify-center animate-breathe">
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-[#F8F6F0]/80 rounded-tl-sm shadow-sm" />
            {/* Top-Right Bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[2px] border-r-[2px] border-[#F8F6F0]/80 rounded-tr-sm shadow-sm" />
            {/* Bottom-Left Bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[2px] border-l-[2px] border-[#F8F6F0]/80 rounded-bl-sm shadow-sm" />
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-[#F8F6F0]/80 rounded-br-sm shadow-sm" />
          </div>
        </section>
        {/* END: ViewfinderFramingBrackets */}

        {/* BEGIN: BottomInteractionBar */}
        <footer className="relative z-20 pb-8 pt-2 px-6 flex flex-col items-center gap-4 bg-gradient-to-t from-black via-black/80 to-transparent" data-purpose="interaction-dock">
          
          {/* Imported Files Preview Strip */}
          {capturedFiles.length > 0 && (
            <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-1 bg-stone-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
              {capturedFiles.map((item, index) => (
                <div key={item.id} className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-white/20 group">
                  <img
                    src={item.previewUrl}
                    alt={`Captured frame ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(item.id)}
                    aria-label="Delete image"
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="shrink-0 pl-1 pr-2 text-xs text-stone-400 font-medium">
                {capturedFiles.length} item{capturedFiles.length > 1 ? 's' : ''} stored
              </div>
            </div>
          )}

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

            {/* Audio Waveform Dots */}
            <div className="flex items-center gap-0.5 px-2 h-5">
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-1" />
              <span className="w-[2.5px] bg-stone-300 rounded-full wave-bar-2" />
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-3" />
            </div>
          </button>

          {/* Shutter Row */}
          <div className="w-full flex items-center justify-between px-2 pt-1" data-purpose="primary-controls">
            {/* Left Accessory: Latest Image Thumbnail or Placeholder */}
            <div className="w-10 h-10 flex items-center justify-center">
              {capturedFiles.length > 0 ? (
                <div className="w-10 h-10 rounded-xl border border-white/30 overflow-hidden relative shadow-lg">
                  <img
                    src={capturedFiles[capturedFiles.length - 1].previewUrl}
                    alt="Latest item"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -top-1 -right-1 bg-[#E5D3B3] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {capturedFiles.length}
                  </span>
                </div>
              ) : (
                <div className="w-10 h-10" />
              )}
            </div>

            {/* Center Shutter */}
            <div className="flex flex-col items-center gap-2">
              <button
                aria-label="Start Scan"
                className={`relative group transition-transform duration-200 ${isScanning ? 'scale-90' : 'active:scale-90'}`}
                onClick={handleStartScan}
                type="button"
              >
                <div className="w-20 h-20 rounded-full border-[2.5px] border-[#F8F6F0]/35 flex items-center justify-center p-1 shadow-2xl transition-all duration-300 group-hover:border-[#F8F6F0]/70">
                  <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center shadow-inner group-hover:bg-white transition-colors">
                    <div className="w-[84%] h-[84%] rounded-full border border-stone-300/80 bg-gradient-to-tr from-stone-200 to-white flex items-center justify-center">
                      <svg className="w-5 h-5 text-stone-900 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              <span className="text-[11px] font-semibold text-[#F8F6F0]/90 uppercase tracking-[0.18em]">
                {capturedFiles.length > 0 ? 'Add Photo' : 'Start Scan'}
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

          {/* iOS Home Indicator */}
          <div className="w-32 h-1 bg-white/30 rounded-full mt-1" />
        </footer>
        {/* END: BottomInteractionBar */}
      </main>
    </div>
  );
}