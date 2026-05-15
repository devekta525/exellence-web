"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  // Display base items for manual sliding
  const displayStudies = caseStudies;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Auto-running slider logic removed as per user request

        // Initialize cards entrance
        const cards = gsap.utils.toArray(".case-study-card");
        gsap.fromTo(
          cards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sliderRef.current,
              start: "top 75%",
            },
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    // if (scrollTween.current) scrollTween.current.pause();
  };

  const handleMouseLeave = () => {
    // if (scrollTween.current && window.innerWidth > 768) scrollTween.current.play();
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const isMobile = window.innerWidth <= 768;
      // 85vw + 16px gap on mobile, 480px + 24px gap on desktop
      const scrollAmount = isMobile 
        ? (window.innerWidth * 0.85) + 16 
        : 504; 
      
      const targetScroll = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      gsap.to(sliderRef.current, {
        scrollLeft: targetScroll,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="work" ref={containerRef} className="py-12 md:py-24 px-6 md:px-12 overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <p className="text-[var(--color-accent-start)] font-semibold uppercase tracking-widest mb-4">
              Our Success Stories
            </p>
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-bold font-outfit tracking-tight leading-[0.85]"
            >
              Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-start)] to-[var(--color-accent-end)]">Studies</span>
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-white/60 text-lg max-w-sm text-center md:text-right">
              Proven results across industries. We don't just run ads; we scale businesses profitably.
            </p>
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex items-center gap-4">
               <button 
                onClick={() => scrollSlider('left')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-white group cursor-pointer"
               >
                 <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
               </button>
               <button 
                onClick={() => scrollSlider('right')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-white group cursor-pointer"
               >
                 <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* Custom Horizontal Scroll Container */}
        <div 
          className="relative group/slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={() => {}}
        >
          {/* Mobile Overlay Arrows */}
          <div className="md:hidden absolute inset-y-0 -left-4 -right-4 z-20 flex items-center justify-between pointer-events-none px-2">
            <button 
              onClick={() => scrollSlider('left')}
              className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto shadow-2xl active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollSlider('right')}
              className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto shadow-2xl active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar cursor-pointer snap-x snap-mandatory px-[7.5vw] md:px-0"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayStudies.map((project, index) => (
              <Link
                key={`${project.id}-${index}`}
                href={`/case-studies/${project.slug}`}
                className="case-study-card flex-none w-[85vw] md:w-[480px] aspect-[4/5.2] group/card relative overflow-hidden rounded-[32px] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--color-accent-start)]/20 snap-center"
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/card:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover/card:opacity-95 transition-opacity duration-500" />
                
                {/* Content Box with Glassmorphism */}
                <div className="absolute inset-x-4 bottom-4 p-6 md:p-8 flex flex-col justify-end bg-black/40 backdrop-blur-md border border-white/10 rounded-[24px] transition-all duration-500 group-hover/card:bg-black/60 group-hover/card:border-white/20">
                  <div className="transition-transform duration-500">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent-start)] mb-3">
                      {project.category}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-bold font-outfit leading-[1.1] mb-3 text-white">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-6 transition-opacity duration-500">
                      {project.body}
                    </p>
                    
                    <div className="flex items-center gap-3 text-white font-semibold group/link">
                      <span className="text-xs md:text-sm uppercase tracking-widest">View Case Study</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/link:bg-[var(--color-accent-start)] transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Tags */}
                {project.stats && (
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.stats.slice(0, 1).map((stat, idx) => (
                      <span key={idx} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                        {stat.value} {stat.label}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}


