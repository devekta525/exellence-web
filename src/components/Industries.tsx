"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShoppingCart,
  Martini,
  BookOpen,
  Utensils,
  Stethoscope,
  Building2,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 1,
    title: "D2C Brands",
    icon: ShoppingCart,
    badge: "Consultancy",
    color: "purple",
    hex: "#a855f7",
    challenge: "Connecting with Gen Z through content, distribution, and ad funnels.",
    solution: "End-to-end marketing strategy, sharp creatives, influencer/UGC integration, and performance campaigns.",
  },
  {
    id: 2,
    title: "Alcobev Brands",
    icon: Martini,
    badge: "Project-Based",
    color: "orange",
    hex: "#f97316",
    challenge: "Crowded markets where creating buzz and loyalty is difficult.",
    solution: "Creative campaigns, cultural activations, UGC integration, and performance marketing.",
  },
  {
    id: 3,
    title: "Authors & Thought Leaders",
    icon: BookOpen,
    badge: "Retainer",
    color: "blue",
    hex: "#3b82f6",
    challenge: "Building recall and credibility beyond a book launch.",
    solution: "Brand positioning, brand engines, content buckets, high-converting video content, and full-funnel campaigns.",
  },
  {
    id: 4,
    title: "Restaurants",
    icon: Utensils,
    badge: "Sprint",
    color: "green",
    hex: "#22c55e",
    challenge: "Generating awareness and repeat customers in competitive spaces.",
    solution: "Campaign-led storytelling, localized activations, video/photo content, and targeted awareness ads.",
  },
  {
    id: 5,
    title: "Doctors",
    icon: Stethoscope,
    badge: "Retainer",
    color: "teal",
    hex: "#14b8a6",
    challenge: "Turning medical expertise into trust and consistent patient acquisition.",
    solution: "Audience mapping, positioning frameworks, credibility-led content, ad funnels, and continuous optimization.",
  },
  {
    id: 6,
    title: "Legacy Brands",
    icon: Building2,
    badge: "Retainer",
    color: "red",
    hex: "#ef4444",
    challenge: "Shifting from distribution-led growth to relevance with younger audiences.",
    solution: "Refreshed communication strategy, recall-first campaigns, content distribution, and micro-campaigns.",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Optional: Keep a fade-in animation for the section itself
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="industries" className="bg-transparent relative overflow-hidden py-24 w-full">
      {/* Background glow for the section */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-white">
          Industries We Serve
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Tailored solutions for diverse industries, driving growth through innovative marketing strategies.
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12 pt-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.id}
                className="group relative flex flex-col"
              >
                {/* Outer Glow Background Effect */}
                <div
                  className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ backgroundColor: industry.hex }}
                />

                {/* Full Gradient Border on Hover */}
                <div
                  className="absolute -inset-[1px] rounded-[33px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, ${industry.hex}, ${industry.hex}60 50%, ${industry.hex})`,
                  }}
                />

                {/* Card Content */}
                <div className="relative h-full bg-[#0c1a3d]/40 rounded-[32px] p-6 md:p-8 border border-white/5 group-hover:border-transparent transition-all duration-500 flex flex-col overflow-hidden">

                  {/* Inner Full Background Glow on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, ${industry.hex}40 0%, ${industry.hex}05 50%, ${industry.hex}40 100%)`,
                    }}
                  />

                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: industry.hex }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div
                      className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-opacity-10"
                      style={{
                        borderColor: `${industry.hex}40`,
                        color: industry.hex,
                        backgroundColor: `${industry.hex}10`,
                      }}
                    >
                      {industry.badge}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-6 font-outfit relative z-10">
                    {industry.title}
                  </h3>

                  {/* Boxes Container to push them to bottom if needed */}
                  <div className="flex flex-col gap-4 mt-auto relative z-10">
                    {/* Challenge Box */}
                    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors overflow-hidden">
                      {/* Left Colored Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: industry.hex }} />

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: industry.hex }}>
                          Challenge
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {industry.challenge}
                      </p>
                    </div>

                    {/* Solution Box */}
                    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors overflow-hidden">
                      {/* Left Colored Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: industry.hex }} />

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: industry.hex }}>
                          Solution
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {industry.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
