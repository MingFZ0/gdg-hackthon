'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CapturedAngle {
  id: string;
  src: string;
  label: string;
  displayLabel: string;
}

const CAPTURED_ANGLES: CapturedAngle[] = [
  {
    id: 'front',
    label: 'Front',
    displayLabel: 'Front View',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBDWCo68ms4BowLIwTKhsTgmn7a5hjZJLRpPEWbmDVtVhQ6H6wYnBS5OFyBFfCGk4qvwQaXUvTohf9ElzK1UbyYCOk1BfVOtJCYaSOK8xS5wCwFSeniOtYzEwfpaIcyeCIqrupruls6KlXt0MJv7DBBqTM-C-aTSBdH2DAbEMtnNjoHHSANw4lGSajVTQVtxsLG2QlzL2e2wRJ6K9-GtJ8Iv0Ikl6BjkCbiIRYHKsgWefKI3VyazJA',
  },
  {
    id: 'back',
    label: 'Back',
    displayLabel: 'Back View',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wsqVt7c4Qsgr1MtTzZBQ81zQtUJ0x2KWoiWl1MIBsXKoF_IlJFASTUDlgubSUYrqFqPoInAYQfXUz6x0_h3iHgwXLE3MoLrtEj4g1K8d7HY412WUpxt1XScKANmsjqFh6fImPjEM57HxH8uIF6WRkVeWz3diaCT7sTNyHvqaI4Pl5mEP4_Eq8s-quemI83dwCeD4erW6d_vN9iy5GKlzcGeHzOuIKZCLU0rF_BhEvIUBRFMYaAPQ',
  },
  {
    id: 'corners',
    label: 'Corners',
    displayLabel: 'Corners & Base',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZz3EWyDNV25pQrKKxTm5Czpa4wbMmJVWFuSsaC6BikV68vJEHR10kPgjHtF3Yu6sB6fp37sNoXSStF2cGnSoruBJFNevp0r9Q72yfxRYtxb6jfi-QvaQBNioeDWjK1X8IH8-qHVhEulGCHOF6_Tfl27YndLt8w8wepl2o2ai02-ddaxFfVfZ1QU1WaOj5LQxyZ0Le_sRtuVnHVtmvR5tQjBM39yPNB1_HSTgCItrvWfVFHjzVh5xS',
  },
  {
    id: 'label',
    label: 'Label / detail',
    displayLabel: 'Label & Serial',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3KtB-iesmvTuhynDZ97AuC-tuxs-vYpWrwfFkNM9yZ6_RsNEkjPsFFCfu7AQ4jNhbyv52FRs7M02GPwYl_V4L3_jiiRaOXPGnpHYoQ1QH3Dy4-V5pEwstj6Ok206YhFMCPaFJWGfouGQarZgP-A09TCGRb4F-H2eths2-gQ4PEMMn0eLio1gDWK2ZomylqmAvvMn57FpacyZoKIxPoRtWKofKusTu2MNR-V_YC8MwZAP1T_T2Qec1',
  },
];

export default function ItemReviewPage() {
  const router = useRouter();
  const [selectedAngle, setSelectedAngle] = useState<CapturedAngle>(CAPTURED_ANGLES[0]);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    'Crafted from supple quilted lambskin leather with signature polished gold-tone hardware. Features a convertible chain strap and structured silhouette. Overall in very good pre-owned condition with clean interior lining and minor, honest corner wear consistent with light gentle use. Serial stamping intact.'
  );

  const handleAngleSwitch = (angle: CapturedAngle) => {
    if (angle.id === selectedAngle.id) return;
    setIsFading(true);
    setTimeout(() => {
      setSelectedAngle(angle);
      setIsFading(false);
    }, 120);
  };

  const handleContinue = () => {
    const encodedDescription = encodeURIComponent(description);
    router.push(`/market?description=${encodedDescription}`);
  };

  return (
    <div className="bg-[#08080a] text-[#FAF6EF] font-sans antialiased min-h-screen flex justify-center selection:bg-[#D5BC8F]/20 selection:text-[#F2E8D5]">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full max-w-[420px] min-h-screen bg-[#09090b] flex flex-col relative pb-32 shadow-2xl border-x border-[#1A1A1F]/40">
        <div className="px-6 pt-3 pb-2 flex justify-between items-center text-xs tracking-widest text-neutral-400 z-20">
          <span className="font-semibold tracking-normal text-[13px] text-neutral-300">9:41</span>
          <div className="flex items-center gap-1.5 opacity-90 text-[11px]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
            </svg>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            <div className="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
              <div className="w-3 h-full bg-neutral-300 rounded-[1px]" />
            </div>
          </div>
        </div>

        <header className="px-5 py-3 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#131316]/80 border border-[#26262D]/60 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Back to inspection"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-emerald-400 text-[11px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Inspection complete
          </div>

          <div className="w-10" />
        </header>

        <main className="flex-1 px-5 pt-1 space-y-6">
          <div className="text-center pt-1 pb-1">
            <h1 className="font-serif text-[32px] sm:text-[34px] leading-tight font-normal tracking-wide text-[#FAF6EF]">
              Your item is ready
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-light tracking-wide">
              4 inspection angles captured &amp; appraised
            </p>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0D0D0F] border border-[#26262D]/60 shadow-lg shadow-black/60">
              <img
                src={selectedAngle.src}
                alt={selectedAngle.displayLabel}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.01] ${
                  isFading ? 'opacity-70' : 'opacity-100'
                }`}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-neutral-200 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D5BC8F]" />
                <span>{selectedAngle.displayLabel}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Captured Angles</span>
              <span className="text-[11px] text-[#D5BC8F]/80 font-light">Tap to preview</span>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 pt-0.5 px-0.5 scroll-smooth">
              {CAPTURED_ANGLES.map((angle) => {
                const isActive = angle.id === selectedAngle.id;
                return (
                  <button
                    key={angle.id}
                    type="button"
                    onClick={() => handleAngleSwitch(angle)}
                    className="flex-shrink-0 flex flex-col items-center gap-1.5 group focus:outline-none"
                    aria-label={`View ${angle.label}`}
                  >
                    <div
                      className={`w-[72px] h-[72px] rounded-xl overflow-hidden relative transition-transform active:scale-95 bg-[#131316] ${
                        isActive
                          ? 'border-2 border-[#D5BC8F] shadow-md'
                          : 'border border-[#26262D]/80'
                      }`}
                    >
                      <img src={angle.src} alt={angle.label} className="w-full h-full object-cover" />
                    </div>
                    <span
                      className={`text-[11px] font-medium ${
                        isActive ? 'text-[#F2E8D5]' : 'text-neutral-400'
                      }`}
                    >
                      {angle.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0D0D0F]/90 rounded-2xl p-4 border border-[#26262D]/70 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A1A1F]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5BC8F]" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                  AI Condition Assessment
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-[13.5px]">
              <div className="flex justify-between items-baseline">
                <span className="text-neutral-400 font-normal">Item</span>
                <span className="font-medium text-[#FAF6EF] text-right">Leather Shoulder Bag</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-neutral-400 font-normal">Condition</span>
                <span className="font-medium text-emerald-300 text-right flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Very Good
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-0.5">
                <span className="text-neutral-400 font-normal flex-shrink-0 mr-3">Observed wear</span>
                <span className="font-normal text-neutral-300 text-right">Light wear on bottom corners</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-0.5">
              <label htmlFor="listing-description" className="font-serif text-lg font-normal tracking-wide text-[#FAF6EF]">
                Listing Description
              </label>
              <span className="text-[11px] text-neutral-500 font-light">Editable</span>
            </div>

            <div className="relative group">
              <textarea
                id="listing-description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#131316]/80 hover:bg-[#131316] focus:bg-[#0D0D0F] text-neutral-200 text-[13px] leading-relaxed rounded-2xl p-4 border border-[#26262D]/80 focus:border-[#D5BC8F]/70 focus:ring-1 focus:ring-[#D5BC8F]/40 focus:outline-none transition-all duration-200 resize-none font-normal placeholder-neutral-500 selection:bg-[#D5BC8F]/20"
              />
            </div>
            <p className="text-[11px] text-neutral-400 px-1 font-light">Edit anything before continuing.</p>
          </div>
        </main>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] p-5 bg-gradient-to-t from-[#08080a] via-[#08080a]/95 to-transparent backdrop-blur-md border-t border-[#1A1A1F]/40 z-30">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#E4D3B4] via-[#F2E8D5] to-[#E4D3B4] text-[#0D0D0F] font-medium text-[15px] tracking-wide shadow-lg shadow-[#D5BC8F]/10 hover:shadow-[#D5BC8F]/20 active:scale-[0.985] transition-all duration-150 flex items-center justify-center gap-2 group"
          >
            <span>Continue</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}