'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-[#08080a] text-[#FAF6EF] font-sans antialiased min-h-screen flex justify-center selection:bg-[#D5BC8F]/20 selection:text-[#F2E8D5]">
      <div className="w-full max-w-[420px] min-h-screen bg-[#09090b] flex flex-col relative pb-28 shadow-2xl border-x border-[#1A1A1F]/40">
        
        {/* Top Status Bar */}
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

        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between z-10 border-b border-[#1A1A1F]/60">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D5BC8F]/80 font-medium">Vault Studio</span>
            <h1 className="font-serif text-xl tracking-wide text-[#FAF6EF]">Second Look</h1>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#131316] border border-[#26262D] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Profile settings"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </header>


        {/* Main Content */}
        <main className="flex-1 px-5 pt-5 space-y-6">
          
          {/* Primary Action Card: Capture & Authenticate */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-b from-[#131316] to-[#0D0D0F] border border-[#D5BC8F]/30 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-[#D5BC8F]/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D5BC8F]/15 border border-[#D5BC8F]/30 text-[#F2E8D5] text-[10px] font-medium tracking-wider uppercase mb-3">
              AI Inspection Mode
            </span>

            <h2 className="font-serif text-2xl font-normal text-[#FAF6EF] leading-snug">
              Appraise Your Next Item
            </h2>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-light">
              Capture 4 key angles. Get instant AI condition analysis and resale market pricing.
            </p>

            <button
              type="button"
              onClick={() => router.push('/camera')} // Adjust path if your camera page is at another route
              className="mt-5 w-full py-3.5 rounded-full bg-gradient-to-r from-[#E4D3B4] via-[#F2E8D5] to-[#E4D3B4] text-[#0D0D0F] font-medium text-sm tracking-wide shadow-lg shadow-[#D5BC8F]/10 hover:shadow-[#D5BC8F]/20 active:scale-[0.985] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <span>Start New Scan</span>
            </button>
          </div>

          {/* Quick Stats / Overview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0D0D0F] border border-[#26262D]/80 rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] text-neutral-400 font-light">Scanned Items</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-serif text-2xl text-[#FAF6EF]">12</span>
                <span className="text-[10px] text-emerald-400 font-medium">+2 this week</span>
              </div>
            </div>

            <div className="bg-[#0D0D0F] border border-[#26262D]/80 rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] text-neutral-400 font-light">Portfolio Est.</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-serif text-2xl text-[#D5BC8F]">$14,250</span>
              </div>
            </div>
          </div>

          {/* Recent Appraisals */}
          <div>
            <div className="flex items-center justify-between mb-3 px-0.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Recent Appraisals</span>
              <button 
                type="button" 
                onClick={() => router.push('/finish')} 
                className="text-[11px] text-[#D5BC8F]/90 font-light hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Leather Shoulder Bag', status: 'Very Good', price: '$2,850', date: 'Today' },
                { title: 'Classic Flap Medium', status: 'Excellent', price: '$6,100', date: '3 days ago' },
                { title: 'Monogram Canvas Tote', status: 'Good', price: '$1,400', date: '1 week ago' },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push('/finish')}
                  className="bg-[#0D0D0F] hover:bg-[#131316] border border-[#26262D]/70 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#18181C] border border-[#26262D] overflow-hidden flex items-center justify-center">
                      <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#FAF6EF]">{item.title}</p>
                      <p className="text-[10px] text-emerald-400 font-light mt-0.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        {item.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-serif text-[#D5BC8F]">{item.price}</p>
                    <p className="text-[10px] text-neutral-500 font-light mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-[#09090b]/95 backdrop-blur-md border-t border-[#1A1A1F] px-6 py-3 flex justify-around items-center z-30">
          <button type="button" className="flex flex-col items-center gap-1 text-[#D5BC8F]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/camera')}
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            <span className="text-[10px] font-light tracking-wide">Scan</span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/market')}
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[10px] font-light tracking-wide">Market</span>
          </button>
        </nav>

      </div>
    </div>
  );
}