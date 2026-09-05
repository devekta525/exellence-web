"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WhyWeStartedProps {
  initialData?: any;
}

export default function WhyWeStarted({ initialData }: WhyWeStartedProps) {
  const {
    titleLine1 = "Why We",
    titleLine2 = "Started",
    paragraph1 = "We noticed a common pattern across growing D2C brands — companies spending ₹5L, ₹10L, or even more every month on Meta Ads were still struggling to scale profitably.",
    paragraph2 = "Not because the product was weak.\nNot because the brand lacked potential.",
    paragraph3 = "But because their ad accounts were being handled by under-skilled freelancers, generic agencies, or media buyers without deep performance expertise.",
    box1Title = "As a result, brands get stuck questioning:",
    box1ListItems = [
      "Why is ROAS unstable?",
      "Why is scaling breaking performance?",
      "Where is the ad spend leaking?",
      "Why are campaigns not converting despite high budgets?"
    ],
    box2Title = "That’s the gap we built Dviora to solve.",
    box2Subtitle = "We don’t operate like a traditional agency.",
    box2Highlight = "We work as an extension of your internal growth team — bringing strategic thinking, data-driven decision making, advanced media buying execution, and performance-focused scaling systems to your Meta Ads ecosystem.",
    box2Footer = "Our focus is simple: Build profitable, scalable, and sustainable growth through expert Meta Ads management."
  } = initialData || {};

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".reveal-text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="why-we-started" ref={containerRef} className="py-12 md:py-16 px-6 bg-transparent relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(56,189,248,0.05)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 reveal-text">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight text-white">
            {titleLine1} <span className="text-gradient">{titleLine2}</span>
          </h2>
        </div>

        <div className="space-y-6 md:space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed font-light">
          <p className="reveal-text">{paragraph1}</p>
          
          <p className="reveal-text whitespace-pre-line">{paragraph2}</p>
          
          <p className="reveal-text">{paragraph3}</p>
          
          <div className="reveal-text bg-white/5 p-8 rounded-3xl border border-white/10 my-10">
            <p className="text-white font-semibold mb-6 text-xl">{box1Title}</p>
            <ul className="space-y-4 list-none text-gray-300">
              {box1ListItems.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-rose-500 font-bold mt-1">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-text p-8 md:p-10 rounded-[40px] bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-white/10 shadow-2xl relative overflow-hidden mt-12">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400" />
            
            <h3 className="text-2xl md:text-3xl font-outfit text-white mb-6 font-bold">
              {box2Title}
            </h3>
            
            <p className="mb-4">{box2Subtitle}</p>
            
            <div className="pl-6 border-l-2 border-[var(--color-accent-start)] py-2 my-8">
              <p className="text-white font-medium text-lg md:text-xl leading-relaxed">
                {box2Highlight}
              </p>
            </div>
            
            <p className="font-semibold text-white text-xl border-t border-white/10 pt-8 mt-4 whitespace-pre-line">
              {box2Footer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
