"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const WORDS = ["Attention", "Recall", "Revenue"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleContainerRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }
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
    // Wait for the initial animation to finish before starting the loop
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!wordRef.current) return;

        // Animate out current word
        gsap.to(wordRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            // Update word
            setWordIndex((prev) => (prev + 1) % WORDS.length);

            // Animate in new word
            gsap.fromTo(
              wordRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      }, 1800);

      return () => clearInterval(interval);
    }, 1500); // start cycling 1.5 seconds after load

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Background Marquees */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden flex justify-between px-[5%]">
        {/* Left Marquee - Downward */}
        <div className="w-32 md:w-48 hidden lg:block relative">
          <div className="flex flex-col gap-6 animate-marquee-down py-6">
            {[
              "/images/marquee/agency_work_1_1778251712085.png",
              "/images/marquee/agency_work_2_1778251734186.png",
              "/images/marquee/agency_work_3_1778251754945.png",
              "/images/marquee/agency_work_4_1778251776053.png",
              "/images/marquee/agency_work_1_1778251712085.png",
              "/images/marquee/agency_work_2_1778251734186.png",
              "/images/marquee/agency_work_3_1778251754945.png",
              "/images/marquee/agency_work_4_1778251776053.png",
            ].map((src, i) => (
              <div key={`left-${i}`} className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10">
                <img src={src} alt="Work" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Marquee - Upward */}
        <div className="w-32 md:w-48 hidden lg:block relative">
          <div className="flex flex-col gap-6 animate-marquee-up py-6">
            {[
              "/images/marquee/agency_work_4_1778251776053.png",
              "/images/marquee/agency_work_3_1778251754945.png",
              "/images/marquee/agency_work_2_1778251734186.png",
              "/images/marquee/agency_work_1_1778251712085.png",
              "/images/marquee/agency_work_4_1778251776053.png",
              "/images/marquee/agency_work_3_1778251754945.png",
              "/images/marquee/agency_work_2_1778251734186.png",
              "/images/marquee/agency_work_1_1778251712085.png",
            ].map((src, i) => (
              <div key={`right-${i}`} className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10">
                <img src={src} alt="Work" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(56,189,248,0.1)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center mt-12">
        {/* Fixed height to prevent layout shift during animation */}
        <div className="h-[120px] md:h-[180px] lg:h-[250px] flex items-center justify-center mb-6">
          <h1
            ref={titleContainerRef}
            className="text-[5rem] md:text-[9rem] lg:text-[13rem] font-black italic tracking-tighter leading-none flex items-baseline"
          >
            <span ref={wordRef} className="flex items-baseline pr-4">
              <span className="text-gradient inline-block">{WORDS[wordIndex]}</span>
              <span className="inline-block w-[0.2em] h-[0.2em] rounded-full bg-[#38bdf8] ml-[0.02em]"></span>
            </span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We drive results across the funnel, capturing attention, boosting recall, and converting revenue.{" "}
          <strong className="text-white font-medium">
            We blend high-impact design with authentic storytelling to deliver strong ROAS, loyalty, and long-term growth.
          </strong>
        </p>

        <div ref={ctaRef} className="flex justify-center">
          <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-base font-medium">
            Talk with us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </section>
  );
}
