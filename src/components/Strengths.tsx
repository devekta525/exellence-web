"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zap, Target, Layers, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const STRENGTHS = [
  {
    title: "Proven Campaign Systems",
    body: "Structured Meta ad frameworks built for stable scaling, better learning, and stronger ROAS consistency.",
    icon: Zap,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Performance-Driven Creative Strategy",
    body: "Ad creatives designed to capture attention, improve CTR, and drive conversions at scale.",
    icon: Target,
    color: "from-purple-500 to-pink-400"
  },
  {
    title: "Full-Funnel Optimization",
    body: "Optimized customer journeys across TOFU, MOFU, and BOFU for higher conversion efficiency.",
    icon: Layers,
    color: "from-orange-500 to-amber-400"
  },
  {
    title: "Profitable Scaling Approach",
    body: "Scale ad spend confidently without losing efficiency, lead quality, or profitability.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-400"
  }
];

export default function Strengths() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Auto-running marquee effect removed as per user request
    const ctx = gsap.context(() => {
      // Logic for auto-sliding has been disabled
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    // if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    // if (tweenRef.current && window.innerWidth > 768) tweenRef.current.play();
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const isMobile = window.innerWidth <= 768;
      const scrollAmount = isMobile ? (window.innerWidth * 0.85) + 24 : 424;
      const slider = sliderRef.current;
      const totalWidth = (STRENGTHS.length * scrollAmount);

      // Handle left boundary jump
      if (direction === 'left' && slider.scrollLeft <= 10) {
        slider.scrollLeft = totalWidth;
      }

      const targetScroll = slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      gsap.to(slider, {
        scrollLeft: targetScroll,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          // If we've scrolled into the second half, jump back to the first half silently
          if (slider.scrollLeft >= totalWidth + 10) {
            slider.scrollLeft -= totalWidth;
          }
        }
      });
    }
  };

  return (
    <section id="strengths" ref={containerRef} className="pt-8 md:pt-20 pb-4 md:pb-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 flex flex-row justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-bold font-outfit tracking-tight">
          Our <span className="text-gradient">Strengths</span>
        </h2>
        
        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollSlider('left')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-white group cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-white group cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={() => {}}
      >
        {/* Mobile Navigation Arrows */}
        <div className="md:hidden absolute inset-y-0 -left-4 -right-4 z-20 flex items-center justify-between pointer-events-none px-4">
          <button
            onClick={() => scrollSlider('left')}
            className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform shadow-2xl cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform shadow-2xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar cursor-pointer snap-x snap-mandatory px-[7.5vw] md:px-6"
        >
          {/* Double the array for seamless loop */}
          {[...STRENGTHS, ...STRENGTHS].map((strength, i) => {
            const Icon = strength.icon;
            return (
              <div
                key={i}
                className="flex-none w-[85vw] md:w-[400px] p-8 rounded-[2rem] bg-slate-900/20 border border-white/5 backdrop-blur-sm group/card hover:bg-slate-900/60 hover:border-white/20 transition-all duration-500 relative overflow-hidden snap-center"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${strength.color} opacity-0 group-hover/card:opacity-5 blur-2xl transition-opacity duration-500`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${strength.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover/card:scale-110 group-hover/card:shadow-[var(--color-accent-start)]/20 transition-all duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold font-outfit text-white mb-4 group-hover/card:text-white transition-all duration-500 relative z-10">
                  {strength.title}
                </h3>
                <p className="text-white/60 leading-relaxed group-hover/card:text-white/80 transition-all duration-500 relative z-10">
                  {strength.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fading Edges (Desktop Only) */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

