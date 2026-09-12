'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CapturedFile {
  id: string;
  url: string;
  label: string;
}

const REQUIRED_ANGLES = [
  { id: 'front', label: 'Front View' },
  { id: 'back', label: 'Back View' },
  { id: 'corners', label: 'Corners & Base' },
  { id: 'label', label: 'Label & Serial' },
];

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [capturedFiles, setCapturedFiles] = useState<CapturedFile[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  // Sync captured files to sessionStorage whenever they change
  const syncToStorage = (files: CapturedFile[]) => {
    const urls = files.map((f) => f.url);
    sessionStorage.setItem('captured_photos', JSON.stringify(urls));
  };

  // Initialize camera preview
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCameraAccess(true);
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable, fallback to file upload.', err);
        setHasCameraAccess(false);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle shutter button click (Camera Capture)
  const handleCaptureClick = () => {
    if (currentStep >= REQUIRED_ANGLES.length) return;

    setIsCapturing(true);

    let photoUrl = '';

    if (hasCameraAccess && videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        photoUrl = canvas.toDataURL('image/jpeg');
      }
    }

    // Fallback image if real camera isn't active
    if (!photoUrl) {
      photoUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
    }

    setTimeout(() => {
      const newFile: CapturedFile = {
        id: REQUIRED_ANGLES[currentStep].id,
        url: photoUrl,
        label: REQUIRED_ANGLES[currentStep].label,
      };

      const updated = [...capturedFiles, newFile];
      setCapturedFiles(updated);
      syncToStorage(updated);

      setIsCapturing(false);
      setCurrentStep((prev) => prev + 1);
    }, 200);
  };

  // Handle manual file upload fallback
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newCaptures: CapturedFile[] = Array.from(files).map((file, idx) => {
      const stepIdx = Math.min(currentStep + idx, REQUIRED_ANGLES.length - 1);
      return {
        id: `${REQUIRED_ANGLES[stepIdx].id}-${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        label: REQUIRED_ANGLES[stepIdx]?.label || `Angle ${stepIdx + 1}`,
      };
    });

    const updated = [...capturedFiles, ...newCaptures];
    setCapturedFiles(updated);
    syncToStorage(updated);
    setCurrentStep((prev) => Math.min(prev + newCaptures.length, REQUIRED_ANGLES.length));
  };

  const handleFinish = () => {
    router.push('/finish'); // Navigate to page_5
  };

  const isComplete = currentStep >= REQUIRED_ANGLES.length;

  return (
    <div className="bg-[#08080a] text-[#FAF6EF] font-sans antialiased min-h-screen flex justify-center selection:bg-[#D5BC8F]/20 selection:text-[#F2E8D5]">
      <div className="w-full max-w-[420px] min-h-screen bg-[#09090b] flex flex-col relative pb-10 shadow-2xl border-x border-[#1A1A1F]/40">
        
        {/* Header Bar */}
        <header className="px-5 py-4 flex items-center justify-between z-10 border-b border-[#1A1A1F]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-[#131316] border border-[#26262D] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium tracking-wide text-neutral-200">
            {isComplete ? 'All Angles Captured' : `Step ${currentStep + 1} of ${REQUIRED_ANGLES.length}`}
          </span>
          <div className="w-9" />
        </header>

        {/* Viewfinder Area */}
        <main className="flex-1 px-5 pt-4 flex flex-col gap-5">
          <div className="text-center">
            <h1 className="text-xl font-serif text-[#FAF6EF]">
              {isComplete ? 'Review Your Captures' : REQUIRED_ANGLES[currentStep]?.label}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {isComplete
                ? 'Tap continue to run AI appraisal & condition review'
                : 'Frame your item inside the guide below'}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0D0D0F] border border-[#26262D] shadow-inner flex items-center justify-center">
            {/* Real Camera Stream or Visual Placeholder */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${hasCameraAccess ? 'block' : 'hidden'}`}
            />

            {!hasCameraAccess && (
              <div className="text-center p-6 text-neutral-500">
                <svg className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <p className="text-xs">Camera preview active / Simulation mode</p>
              </div>
            )}

            {/* Viewfinder Target Framing */}
            <div className="absolute inset-6 border border-dashed border-[#D5BC8F]/40 rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-[10px] text-[#D5BC8F]/60 uppercase tracking-widest font-mono">
                {isComplete ? 'Complete' : REQUIRED_ANGLES[currentStep]?.label}
              </span>
            </div>

            {/* Flash Effect on Capture */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white animate-ping opacity-30 pointer-events-none" />
            )}
          </div>

          {/* Captured Thumbnails Strip */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Captured Photos</span>
            <div className="grid grid-cols-4 gap-2.5">
              {REQUIRED_ANGLES.map((angle, index) => {
                const captured = capturedFiles[index];
                return (
                  <div
                    key={angle.id}
                    className={`aspect-square rounded-xl overflow-hidden bg-[#131316] border relative flex flex-col items-center justify-center ${
                      captured
                        ? 'border-[#D5BC8F]'
                        : index === currentStep
                        ? 'border-neutral-500 ring-1 ring-neutral-500/50'
                        : 'border-[#26262D]'
                    }`}
                  >
                    {captured ? (
                      <img src={captured.url} alt={angle.label} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-neutral-500 text-center px-1 font-light">
                        {angle.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Controls Section */}
        <div className="px-5 pt-6 pb-4 flex flex-col gap-3">
          {!isComplete ? (
            <div className="flex items-center justify-between gap-4">
              {/* File Upload Hidden Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 rounded-xl bg-[#131316] border border-[#26262D] text-xs text-neutral-300 hover:text-white transition-colors"
              >
                Upload File
              </button>

              {/* Shutter Button */}
              <button
                type="button"
                onClick={handleCaptureClick}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E4D3B4] via-[#F2E8D5] to-[#E4D3B4] p-1 shadow-lg shadow-[#D5BC8F]/20 active:scale-95 transition-transform flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full border-2 border-[#09090b] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#09090b]/20" />
                </div>
              </button>

              <div className="w-20" />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#E4D3B4] via-[#F2E8D5] to-[#E4D3B4] text-[#0D0D0F] font-medium text-[15px] tracking-wide shadow-lg shadow-[#D5BC8F]/10 hover:shadow-[#D5BC8F]/20 active:scale-[0.985] transition-all"
            >
              Continue to Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}