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
    const ctx = gsap.context(() => {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth / 2;

      // Auto-running marquee effect
      tweenRef.current = gsap.to(slider, {
        x: -totalWidth,
        duration: 30, // Slightly slower for better readability
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(slider, { x: 0 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current && tweenRef.current) {
      tweenRef.current.pause();
      
      const cardWidth = window.innerWidth > 768 ? 400 + 24 : 350 + 24;
      const currentX = gsap.getProperty(sliderRef.current, "x") as number;
      const targetX = currentX + (direction === 'left' ? cardWidth : -cardWidth);
      
      gsap.to(sliderRef.current, {
        x: targetX,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          // Reset to loop if we go too far
          const totalWidth = sliderRef.current!.scrollWidth / 2;
          if (Math.abs(targetX) >= totalWidth) {
             gsap.set(sliderRef.current, { x: 0 });
          } else if (targetX > 0) {
             gsap.set(sliderRef.current, { x: -totalWidth });
          }
          
          setTimeout(() => {
            if (tweenRef.current) tweenRef.current.play();
          }, 3000);
        }
      });
    }
  };

  return (
    <section id="strengths" ref={containerRef} className="py-12 md:py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-outfit tracking-tight">
          Our <span className="text-gradient">Strengths</span>
        </h2>
      </div>

      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={() => {
          setTimeout(() => {
            if (tweenRef.current) tweenRef.current.play();
          }, 3000);
        }}
      >
        {/* Mobile Navigation Arrows */}
        <div className="md:hidden absolute inset-y-0 -left-4 -right-4 z-20 flex items-center justify-between pointer-events-none px-6">
          <button 
            onClick={() => scrollSlider('left')}
            className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollSlider('right')}
            className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-6 w-max px-6 cursor-pointer"
        >
          {/* Double the array for seamless loop */}
          {[...STRENGTHS, ...STRENGTHS].map((strength, i) => {
            const Icon = strength.icon;
            return (
              <div 
                key={i}
                className="w-[350px] md:w-[400px] p-8 rounded-[2rem] bg-slate-900/20 border border-white/5 backdrop-blur-sm group/card hover:bg-slate-900/60 hover:border-white/20 transition-all duration-500 relative overflow-hidden"
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
        
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

