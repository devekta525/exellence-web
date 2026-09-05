"use client";

import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft, CalendarCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScheduleMeetingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center pt-32 lg:pt-40 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-start relative z-10">
        
        {/* Left Column: Thank You Message */}
        <div className="lg:col-span-2 text-center lg:text-left flex flex-col items-center lg:items-start lg:sticky lg:top-40">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <CalendarCheck className="w-10 h-10 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Let's Talk Growth.
          </h1>
          
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            Pick a time from the calendar that works best for you. We'll hop on a quick 30-minute discovery call to discuss your goals and how Dviora can help scale your brand to new heights.
          </p>
          
          <div className="inline-block px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl mb-10">
            <p className="text-cyan-400 text-lg font-medium">
              Select a slot on the calendar 👉
            </p>
          </div>

          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-400/50">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Right Column: Calendly Widget in a glowing glassmorphism card */}
        <div className="lg:col-span-3 w-full">
          <div className="relative w-full rounded-[32px] p-[2px] bg-gradient-to-b from-white/15 to-transparent shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 rounded-[32px] blur-xl opacity-50"></div>
            
            <div className="relative bg-white rounded-[30px] p-2 md:p-6 overflow-hidden flex items-center justify-center border border-white/5">
              {/* Calendly inline widget begin */}
              <div 
                className="calendly-inline-widget w-full rounded-2xl overflow-hidden" 
                data-url="https://calendly.com/dvioralabs/30min" 
                style={{ minWidth: '320px', height: '750px' }}
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
