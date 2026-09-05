"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface HeroProps {
  initialData?: {
    heroTitleLine1?: string;
    heroTitleLine2?: string;
    heroDescription?: string;
  } | null;
}

export default function Hero({ initialData }: HeroProps) {
  const { 
    heroTitleLine1 = "WHO ARE", 
    heroTitleLine2 = "WE?", 
    heroDescription = "We specialize exclusively in Meta Ads management for high-spending brands. While you handle your own creatives, we bring laser-focused expertise on strategy, ad management, and scaling. <strong>Our strength is turning big budgets into big returns.</strong>"
  } = initialData || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { openContactModal } = useModal();

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

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[70vh] md:min-h-screen flex flex-col items-start justify-center px-6 md:px-24 pt-32 md:pt-48 pb-20 overflow-hidden bg-[#020617]"
    >
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-[#020617] z-[1]" />
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* Content */}
      <div className="max-w-7xl text-left z-10 flex flex-col items-start relative">
        <div className="flex items-center justify-start mb-6 py-4 overflow-visible">
          <h1
            ref={titleContainerRef}
            className="text-[clamp(3rem,13vw,4rem)] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black italic tracking-tight leading-[0.85] flex flex-col items-start select-none drop-shadow-2xl"
          >
            <span className="text-gradient inline-block pb-2 pr-6 md:pr-16 whitespace-nowrap">{heroTitleLine1}</span>
            <span ref={wordRef} className="flex items-baseline whitespace-nowrap">
              <span className="text-gradient inline-block pb-2 pr-6 md:pr-16">{heroTitleLine2}</span>
            </span>
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="text-base md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed font-outfit drop-shadow-md [&>strong]:text-white [&>strong]:font-semibold [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: heroDescription }}
        />

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-6">
          <button
            onClick={openContactModal}
            className="group relative flex items-center px-10 py-4 rounded-full text-lg font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            {/* Gradient Border Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-full animate-border-slide"></div>
            {/* Inner Black Button */}
            <div className="absolute inset-[2px] bg-[#020617] rounded-full group-hover:bg-[#0c1a3d] transition-colors duration-300"></div>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 text-white">
              Book a call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-30 animate-bounce hidden md:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent-start)] to-transparent rounded-full" />
      </div>
    </section>
  );
}





