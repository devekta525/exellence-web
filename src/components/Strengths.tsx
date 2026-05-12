"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zap, Target, Layers, TrendingUp } from "lucide-react";

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

  return (
    <section id="strengths" ref={containerRef} className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-outfit tracking-tight">
          Our <span className="text-gradient">Strengths</span>
        </h2>
      </div>

      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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

