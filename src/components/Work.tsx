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
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Triple the items for seamless native loop in both directions
  const displayStudies = [...caseStudies, ...caseStudies, ...caseStudies];

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

    // Initialize scroll position to the middle set
    setTimeout(() => {
      if (sliderRef.current) {
        const isMobile = window.innerWidth <= 768;
        const scrollAmount = isMobile ? (window.innerWidth * 0.85) + 16 : 504;
        sliderRef.current.scrollLeft = caseStudies.length * scrollAmount;
      }
    }, 100);

    return () => {
      ctx.revert();
    };
  }, []);


  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const isMobile = window.innerWidth <= 768;
      const scrollAmount = isMobile ? (window.innerWidth * 0.85) + 16 : 504;
      const slider = sliderRef.current;
      const totalWidth = (caseStudies.length * scrollAmount);

      // Handle boundaries for button clicks
      if (direction === 'left' && slider.scrollLeft <= 10) {
        slider.scrollLeft += totalWidth;
      }

      const targetScroll = slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      gsap.to(slider, {
        scrollLeft: targetScroll,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          if (slider.scrollLeft >= totalWidth * 2 - 10) {
            slider.scrollLeft -= totalWidth;
          } else if (slider.scrollLeft <= totalWidth - 10) {
            slider.scrollLeft += totalWidth;
          }
        }
      });
    }
  };

  const handleScroll = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Use debounce to prevent jumping during active momentum scroll
    scrollTimeout.current = setTimeout(() => {
      if (!sliderRef.current) return;
      const isMobile = window.innerWidth <= 768;
      const scrollAmount = isMobile ? (window.innerWidth * 0.85) + 16 : 504;
      const slider = sliderRef.current;
      const totalWidth = caseStudies.length * scrollAmount;

      // Silent jump for native scrolling
      if (slider.scrollLeft >= totalWidth * 2 - 10) {
        slider.scrollLeft -= totalWidth;
      } else if (slider.scrollLeft <= 10) {
        slider.scrollLeft += totalWidth;
      }
    }, 150);
  };


  return (
    <section id="work" ref={containerRef} className="pt-10 pb-8 md:py-16 px-6 md:px-12 overflow-hidden bg-slate-950/20">
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
        >
          {/* Mobile Overlay Arrows */}
          <div className="md:hidden absolute top-[30%] -translate-y-1/2 -left-2 -right-2 z-20 flex items-center justify-between pointer-events-none px-2">
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
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar cursor-pointer snap-x snap-mandatory px-[7.5vw] md:px-0"
            style={{
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayStudies.map((project, index) => (
              <Link
                key={`${project.id}-${index}`}
                href={`/case-studies/${project.slug}`}
                className="case-study-card flex-none w-[85vw] md:w-[480px] h-auto min-h-[550px] md:min-h-[600px] group/card relative overflow-hidden rounded-[40px] bg-slate-900/50 border border-white/5 transition-[box-shadow,transform,background-color,border-color] duration-500 md:hover:shadow-2xl md:hover:shadow-[var(--color-accent-start)]/20 snap-center flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 md:group-hover/card:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  {/* Subtle Gradient for image depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />

                  {/* Stats Tags (on top of image) */}
                  {project.stats && (
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                      {project.stats.slice(0, 1).map((stat, idx) => (
                        <span key={idx} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                          {stat.value} {stat.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section (Bottom 40%) */}
                <div className="flex-grow p-6 md:p-8 flex flex-col bg-slate-950/80 backdrop-blur-sm border-t border-white/5">
                  <div className="flex-grow">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-start)] mb-3">
                      {project.category}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-bold font-outfit leading-tight mb-3 text-white">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-6 font-light">
                      {project.body}
                    </p>
                  </div>

                  <div className="flex items-center justify-between group/link border-t border-white/5 pt-6">
                    <span className="text-xs uppercase tracking-widest font-semibold text-white/80">View Case Study</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[var(--color-accent-start)] transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white group-hover/link:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
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


