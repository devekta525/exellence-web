"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

const WORDS = ["Attention", "Recall", "Revenue"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [wordIndex, setWordIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Initial load animation for content
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleContainerRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.5 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Word cycling animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!wordRef.current) return;

        gsap.to(wordRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setWordIndex((prev) => (prev + 1) % WORDS.length);
            gsap.fromTo(
              wordRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      }, 2500);

      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden bg-[#020617]"
    >
      {/* Background Cinematic Slider */}
      <div className="absolute inset-0 z-0">
        {caseStudies.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Ken Burns effect when active */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out brightness-[0.4] grayscale-[0.2] ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${project.image})` }}
            />
          </div>
        ))}
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] z-[1]" />
        <div className="absolute inset-0 bg-black/60 z-[1]" />
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4 hidden md:flex">
        <div className="flex gap-2">
          {caseStudies.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentSlide ? "w-8 bg-[var(--color-accent-start)]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
        <span className="text-white/40 text-xs font-bold tracking-widest uppercase ml-4">
          0{currentSlide + 1} / 0{caseStudies.length}
        </span>
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center relative mt-12">
        <div className="h-[80px] md:h-[120px] lg:h-[180px] flex items-center justify-center mb-6">
          <h1
            ref={titleContainerRef}
            className="text-[3rem] md:text-[6rem] lg:text-[8rem] font-black italic tracking-tighter leading-none flex items-baseline select-none drop-shadow-2xl"
          >
            <span ref={wordRef} className="flex items-baseline pr-3">
              <span className="text-gradient inline-block">{WORDS[wordIndex]}</span>
              <span className="inline-block w-[0.15em] h-[0.15em] rounded-full bg-[var(--color-accent-start)] ml-[0.02em] shadow-[0_0_15px_var(--color-accent-start)]"></span>
            </span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-base md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-outfit drop-shadow-md"
        >
          Driving high-impact growth through authentic storytelling and performance marketing.{" "}
          <span className="text-white font-semibold">
            We don't just capture attention; we convert it into profitable revenue.
          </span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6">
          <button className="group relative flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-white text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl">
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="flex items-center gap-3 text-white hover:text-[var(--color-accent-start)] transition-all group px-5 py-2">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent-start)] group-hover:border-[var(--color-accent-start)] transition-all duration-500 backdrop-blur-md">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold tracking-widest uppercase text-xs">Watch Showreel</span>
          </button>
        </div>
      </div>

      {/* Featured Project Name Overlay */}
      <div className="absolute bottom-12 left-12 z-20 hidden lg:block animate-pulse">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-accent-start)] mb-2">
          Featured Project
        </p>
        <p className="text-lg font-bold font-outfit text-white/90">
          {caseStudies[currentSlide].title}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-30 animate-bounce hidden md:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent-start)] to-transparent rounded-full" />
      </div>
    </section>
  );
}





