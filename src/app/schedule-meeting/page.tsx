"use client";

import Script from 'next/script';
import { CalendarCheck } from 'lucide-react';

export default function ScheduleMeetingPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center pt-24 lg:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-start relative z-10">
        
        {/* Left Column: Thank You Message */}
        <div className="lg:col-span-2 text-center lg:text-left flex flex-col items-center lg:items-start lg:sticky lg:top-32">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 border border-white/10 rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(34,211,238,0.2)]">
            <CalendarCheck className="w-7 h-7 text-cyan-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Let's Talk Growth.
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base mb-5 leading-relaxed max-w-md">
            Select a convenient time for a quick 30-minute strategy call to discuss your goals.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
            <span className="text-cyan-400 text-xs md:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap">
              Select a slot on calendar <span className="text-base">👉</span>
            </span>
          </div>
        </div>

        {/* Right Column: Calendly Widget */}
        <div className="lg:col-span-3 w-full">
          <div className="relative w-full rounded-[28px] p-[1.5px] bg-gradient-to-b from-white/15 to-transparent shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 rounded-[28px] blur-xl opacity-50"></div>
            
            <div className="relative bg-white rounded-[26px] p-2 md:p-4 overflow-hidden flex items-center justify-center border border-white/5">
              {/* Calendly inline widget begin */}
              <div 
                className="calendly-inline-widget w-full rounded-xl overflow-hidden" 
                data-url="https://calendly.com/dvioralabs/30min" 
                style={{ minWidth: '280px', height: '700px' }}
              ></div>
              <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
              {/* Calendly inline widget end */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
