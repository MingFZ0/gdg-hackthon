'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CapturedFile {
  id: string;
  url: string;
  name: string;
  size: number;
}

export default function ResaleScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [storedFiles, setStoredFiles] = useState<CapturedFile[]>([]);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize and switch camera video stream
  useEffect(() => {
    async function startCamera() {
      // Stop any active stream before initiating a new one
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraAccess(true);
      } catch (err) {
        console.error('Error accessing camera feed:', err);
        setHasCameraAccess(false);
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Flip between front and rear cameras
  const handleToggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture frame directly from live camera feed or fallback to file picker
  const handleCaptureClick = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);

      if (videoRef.current && hasCameraAccess) {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const capturedFile: CapturedFile = {
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                url: URL.createObjectURL(blob),
                name: `scan_${Date.now()}.jpg`,
                size: blob.size,
              };
              setStoredFiles((prev) => [...prev, capturedFile]);
            }
          }, 'image/jpeg');
          return;
        }
      }

      // Fallback if camera stream is unavailable
      fileInputRef.current?.click();
    }, 150);
  };

  // Store uploaded images from file selector
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: CapturedFile[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setStoredFiles((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  // Remove individual captured/imported item
  const handleRemoveFile = (idToRemove: string) => {
    setStoredFiles((prev) => {
      const fileToRemove = prev.find((item) => item.id === idToRemove);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((item) => item.id !== idToRemove);
    });
  };

  return (
    <div className="h-full w-full overflow-hidden text-[#F8F6F0] antialiased select-none flex justify-center items-center bg-stone-950 font-sans min-h-screen">
      {/* Hidden file input fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

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
      <main className="relative w-full max-w-[430px] h-screen sm:h-[92vh] sm:max-h-[890px] sm:rounded-[48px] overflow-hidden shadow-2xl flex flex-col justify-between bg-black border border-stone-800/60">
        
        {/* Live Video Feed Background */}
        <div className="absolute inset-0 z-0 overflow-hidden" data-purpose="camera-background">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              facingMode === 'user' ? 'scale-x-[-1]' : ''
            }`}
          />

          {/* Fallback state when permission is pending or denied */}
          {hasCameraAccess === false && (
            <div className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center p-6 text-center z-10">
              <svg className="w-10 h-10 text-stone-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-stone-300">Camera access disabled</p>
              <p className="text-xs text-stone-500 mt-1 mb-4">Tap shutter below to upload or import images directly.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs px-3.5 py-2 rounded-full bg-stone-800 border border-stone-700 text-stone-200"
              >
                Upload File
              </button>
            </div>
          )}

          {/* Vignette & gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Top Header & Controls */}
        <header className="relative z-20 pt-3 px-6 flex flex-col gap-3" data-purpose="top-navigation">
          <div className="w-full flex justify-between items-center text-[13px] font-medium tracking-tight text-white/80">
            <span>9:41</span>
            <div className="w-24 h-4 bg-black rounded-full mx-auto hidden sm:block opacity-60" />
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
              </svg>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
              </svg>
              <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-3.5 bg-white/90 rounded-[1px]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <button
              aria-label="Dismiss scan"
              className="w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform"
              type="button"
            >
              <svg className="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

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

          <div className="mt-4 px-1 text-center">
            <h1 className="font-serif text-3xl sm:text-[34px] tracking-tight leading-[1.15] font-normal text-[#F8F6F0] drop-shadow-md">
              Show me what you want to sell.
            </h1>
            <p className="text-[13px] font-light text-[#F8F6F0]/70 tracking-wide mt-1.5">
              Align item inside the frame • natural light works best
            </p>
          </div>
        </header>

        {/* Viewfinder Framing & Captured File Gallery Overlay */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 pointer-events-none">
          <div className="relative w-full aspect-[4/5] max-h-[380px] flex items-center justify-center animate-breathe">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-[#F8F6F0]/80 rounded-tl-sm shadow-sm" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[2px] border-r-[2px] border-[#F8F6F0]/80 rounded-tr-sm shadow-sm" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[2px] border-l-[2px] border-[#F8F6F0]/80 rounded-bl-sm shadow-sm" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-[#F8F6F0]/80 rounded-br-sm shadow-sm" />

            {/* Display stored items gallery overlay */}
            {storedFiles.length > 0 && (
              <div className="pointer-events-auto absolute inset-3 rounded-2xl overflow-hidden bg-black/70 backdrop-blur-md p-3 flex flex-col justify-between border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between text-xs text-white/80 pb-2 border-b border-white/10">
                  <span className="font-medium tracking-wide">Captured Items ({storedFiles.length})</span>
                  <button
                    onClick={() => setStoredFiles([])}
                    className="text-[11px] text-stone-400 hover:text-rose-300 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[260px] py-2 pr-1">
                  {storedFiles.map((file) => (
                    <div key={file.id} className="relative group aspect-square rounded-lg overflow-hidden border border-white/15 bg-stone-900">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white text-[10px] hover:bg-rose-600 transition-colors"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Interaction Controls */}
        <footer className="relative z-20 pb-8 pt-4 px-6 flex flex-col items-center gap-5 bg-gradient-to-t from-black via-black/80 to-transparent">
          <button
            className="group w-full py-3 px-4 rounded-2xl bg-stone-900/65 backdrop-blur-2xl border border-white/10 hover:border-white/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-between shadow-xl"
            type="button"
          >
            <div className="flex items-center gap-3">
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

            <div className="flex items-center gap-0.5 px-2 h-5">
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-1" />
              <span className="w-[2.5px] bg-stone-300 rounded-full wave-bar-2" />
              <span className="w-[2.5px] bg-stone-400 rounded-full wave-bar-3" />
            </div>
          </button>

          <div className="w-full flex items-center justify-between px-2 pt-1">
            {/* Gallery Thumbnail Preview */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Upload files manually"
            >
              {storedFiles.length > 0 ? (
                <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/30">
                  <img src={storedFiles[storedFiles.length - 1].url} alt="Latest capture" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 bg-stone-900/90 text-[9px] font-bold px-1 text-white">
                    {storedFiles.length}
                  </span>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-lg border border-dashed border-white/30 flex items-center justify-center text-white/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              )}
            </button>

            {/* Shutter Capture Button */}
            <div className="flex flex-col items-center gap-2">
              <button
                aria-label="Capture Photo"
                className={`relative group transition-transform duration-200 ${isScanning ? 'scale-90' : 'active:scale-90'}`}
                onClick={handleCaptureClick}
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
                {storedFiles.length > 0 ? 'Capture More' : 'Start Scan'}
              </span>
            </div>

            {/* Front/Rear Camera Toggle */}
            <button
              aria-label="Switch camera angle"
              onClick={handleToggleCamera}
              className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-xl border border-white/15 flex items-center justify-center text-[#F8F6F0]/85 active:scale-95 transition-all hover:bg-stone-800/80 shadow-md"
              type="button"
            >
              <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="w-32 h-1 bg-white/30 rounded-full mt-1" />
        </footer>
      </main>
    </div>
  );
}