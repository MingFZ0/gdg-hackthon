'use client';

import React, { useState } from 'react';

interface ComparableItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  conditionType: 'good' | 'very-good' | 'fair';
  imageSrc: string;
}

const COMPARABLE_ITEMS: ComparableItem[] = [
  {
    id: '1',
    title: 'Quilted Chain Flap Bag',
    price: 45,
    condition: 'Good',
    conditionType: 'good',
    imageSrc:
      'https://lh3.googleusercontent.com/aida/AEtjO1UmfLI6ivunXRYHujU0aF2lnCN7uxvNYMtHUgc5uX_j4r-e7U0i-uwDv_EG1UVIF5ADgyysxzJAVB-Sj72ZQc-CImQHtcAgGsDoaXqBa4unIGXhnO7hTmoyp12SGyARWl2RBx0fT_0dXtSEfoCvQEHD3hOvhsQqqpoibw-bAbbeMcqH0Aibc85tI1BmC-8S4nVhnzwDmx1Wa_ltVokEDANWGYMAdGC_x-wsuk6hnmLtmoisG6dxXRe4374',
  },
  {
    id: '2',
    title: 'Vintage Lambskin Shoulder',
    price: 52,
    condition: 'Very Good',
    conditionType: 'very-good',
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6QQVgy18Apq8tXNF02ZDTHWE0eOok7yFdPDJFo0FjJy-aF9riGaar3eFv2kwc_SUIl7e8sMPi_58kdD_Ph1V7x9ib9liCOKschgiCvmxZ4T9CDrPcw-x2jxFnnnxR9WzTOBpNrKzsNPcHuEYy9DOu-jEkLSyPLiRzStwT9Y-dnPb-17kRBz-FUu0VzSyUhUPnVCGuPVB5FqOnw8zNrO3hQ49Agc3micpd1KuJXZ2MCI_eKnE9e5zS',
  },
  {
    id: '3',
    title: 'Structured Calfskin Crossbody',
    price: 49,
    condition: 'Very Good',
    conditionType: 'very-good',
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVnKW840g1RSt7Bjyn0UdYDtOLrWi4DPMmE-6I5FolF24Vq_7E3Tf2s-YMNYweQj552quW4jMB9wpCLZg0JuWvaoGrakWBbxzpR3XwLkVFwulRHQpnKIHdz1d1r4EVyzX-ScWMnBJr9IMqT8aZxvzz6UCNeikh_HUARn8S4IOicyCdGqfFoLSYZVAz23EZZnq-nfn60ryVcqooanA64nXpO4jlA3LqabI_7M7h1HwU9NAy14ekgwoh',
  },
  {
    id: '4',
    title: 'Classic Leather Flap Handbag',
    price: 40,
    condition: 'Fair',
    conditionType: 'fair',
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfldCswILYnkGAMai9zyeGsSWSctp-QzhEnAfsMaOJJi-EFktZl_uPzyVlTfVxkxts28vJtFZIJDlxAwR4l3xfyNkL5-0KZI5zCHNW6Rn-uftX0ePCUQMkCk1dSHuWYkpF0EHTj9BCKmdcYsDs3ioNaITPEsjdpVXkkqLk_MxHARKr2EOvkp3X7dPTL6ND4Und2JrxK1JttshPo6ypVn4R5L7f-r8qb-WOzSkRE72AnbT6wa07ga27',
  },
];

const AI_RECOMMENDED_PRICE = 48;

export default function MarketPricingPage() {
  const [userPrice, setUserPrice] = useState<string>(AI_RECOMMENDED_PRICE.toString());

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrice(e.target.value);
  };

  const handleResetPrice = () => {
    setUserPrice(AI_RECOMMENDED_PRICE.toString());
  };

  const displayPrice = userPrice.trim() === '' ? '0' : userPrice;

  return (
    <div className="bg-[#09090B] text-[#F4F4F5] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#E5D3B3] selection:text-black">
      {/* Hide scrollbar utility */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Status Bar / Mobile Header */}
      <header className="pt-3 px-6 pb-2 shrink-0">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-medium tracking-wide">
          <span>9:41</span>
          <div className="flex items-center space-x-2">
            <svg className="w-3.5 h-3.5 text-neutral-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
            </svg>
            <svg className="w-3.5 h-3.5 text-neutral-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            <div className="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-neutral-300 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#18181D] border border-[#23232A] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181D] border border-[#23232A] text-xs font-medium text-neutral-300 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Market valuation</span>
          </div>

          <div className="w-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-2 pb-6 max-w-md mx-auto w-full space-y-6">
        
        {/* Title */}
        <div className="text-center pt-1 pb-1">
          <h1 className="font-serif text-[28px] sm:text-[30px] font-normal tracking-tight text-white leading-tight">
            See what the market says
          </h1>
          <p className="text-xs text-neutral-400 mt-1.5 font-light">
            Realized resale benchmarks matching your bag
          </p>
        </div>

        {/* Similar items section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-neutral-400">
              Similar items we found
            </h2>
            <span className="text-[11px] text-neutral-500 font-light">
              {COMPARABLE_ITEMS.length} comparables
            </span>
          </div>

          {/* Carousel Cards */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 scroll-smooth">
            {COMPARABLE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="min-w-[152px] max-w-[152px] shrink-0 bg-[#121215] border border-[#23232A] rounded-2xl p-2.5 flex flex-col justify-between transition-transform duration-200 hover:border-neutral-700"
              >
                <div>
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-black mb-2.5 relative">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-200 line-clamp-1 leading-snug">
                    {item.title}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#23232A]/60 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    ${item.price}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${
                      item.conditionType === 'very-good'
                        ? 'text-[#34D399] bg-emerald-950/40'
                        : 'text-neutral-400 bg-[#1A1A22]'
                    }`}
                  >
                    {item.condition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Range Summary Card */}
        <div className="bg-[#121215] border border-[#23232A] rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#18181D] border border-[#23232A] flex items-center justify-center text-neutral-400">
              <svg className="w-3.5 h-3.5 text-[#E5D3B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <span className="text-xs text-neutral-300 font-medium">Market range</span>
          </div>
          <div className="text-sm font-semibold text-white tracking-tight">
            $40–$55
          </div>
        </div>

        {/* AI Recommendation Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#191714] to-[#121216] border border-[#E5D3B3]/30 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E5D3B3]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E5D3B3] shadow-[0_0_8px_rgba(229,211,179,0.8)]" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E5D3B3]">
                  AI Suggested Asking Price
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 bg-black/40 border border-[#23232A] px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-serif text-4xl sm:text-[42px] font-medium tracking-tight text-[#E5D3B3]">
                ${AI_RECOMMENDED_PRICE}
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                estimated optimal listing
              </span>
            </div>

            <p className="text-xs text-neutral-300/90 leading-relaxed font-light pt-1 border-t border-[#23232A]/60">
              Based on similar items and the condition identified during your inspection.
            </p>
          </div>
        </div>

        {/* Editable Price Control */}
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="price-input" className="text-sm font-medium text-white tracking-wide">
              Your Price
            </label>
            <span className="text-[11px] text-neutral-400 font-light flex items-center gap-1">
              <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Tap to edit
            </span>
          </div>

          <div className="relative bg-[#121215] border border-[#30303A] focus-within:border-[#E5D3B3] rounded-2xl transition-all duration-200 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium text-neutral-400 font-serif">$</span>
              <input
                id="price-input"
                type="number"
                inputMode="numeric"
                value={userPrice}
                onChange={handlePriceChange}
                min="1"
                className="bg-transparent text-2xl font-serif font-medium text-white focus:outline-none w-28 tracking-tight"
                aria-label="Your custom listing price"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetPrice}
                className="text-[11px] text-[#E5D3B3] hover:text-white px-2.5 py-1 rounded-lg bg-[#1D1B17] border border-[#E5D3B3]/30 transition-colors font-medium"
              >
                Match AI (${AI_RECOMMENDED_PRICE})
              </button>
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 px-1 font-light">
            You keep 100% control over your final price.
          </p>
        </section>

      </main>

      {/* Sticky Bottom CTA */}
      <footer className="p-5 pt-3 bg-gradient-to-t from-[#09090B] via-[#09090B]/95 to-transparent shrink-0">
        <div className="max-w-md mx-auto w-full">
          <button
            type="button"
            className="w-full py-4 px-6 rounded-full bg-[#E5D3B3] text-[#0F0F12] font-semibold text-base tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-[#F3EADB] active:scale-[0.99] shadow-[0_8px_24px_rgba(229,211,179,0.15)]"
          >
            <span>List at ${displayPrice}</span>
            <svg className="w-4 h-4 text-[#0F0F12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}