"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  BarChart2,
  Globe,
  Megaphone
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useModal } from "@/context/ModalContext";

// Hardcoded per-service visual styles - colors ALWAYS correct regardless of DB
const SERVICE_STYLES: Record<string, {
  Icon: React.ElementType;
  gradient: string;
  dotColor: string;
  hoverBg: string;
  hoverBorder: string;
  hoverShadow: string;
  mobileShadow: string;
}> = {
  performance: {
    Icon: BarChart2,
    gradient: "linear-gradient(135deg,#06b6d4,#2563eb)",
    dotColor: "#06b6d4",
    hoverBg: "rgba(6,182,212,0.08)",
    hoverBorder: "rgba(6,182,212,0.35)",
    hoverShadow: "0 25px 60px -10px rgba(6,182,212,0.2)",
    mobileShadow: "rgba(6,182,212,0.15)",
  },
  social: {
    Icon: Megaphone,
    gradient: "linear-gradient(135deg,#c20ee7,#581c87)",
    dotColor: "#c20ee7",
    hoverBg: "rgba(194,14,231,0.08)",
    hoverBorder: "rgba(194,14,231,0.35)",
    hoverShadow: "0 25px 60px -10px rgba(194,14,231,0.2)",
    mobileShadow: "rgba(194,14,231,0.15)",
  },
  website: {
    Icon: Globe,
    gradient: "linear-gradient(135deg,#f97316,#dc2626)",
    dotColor: "#f97316",
    hoverBg: "rgba(249,115,22,0.08)",
    hoverBorder: "rgba(249,115,22,0.35)",
    hoverShadow: "0 25px 60px -10px rgba(249,115,22,0.2)",
    mobileShadow: "rgba(249,115,22,0.15)",
  },
};

function getStyle(id: string, index: number = 0) {
  if (SERVICE_STYLES[id]) return SERVICE_STYLES[id];
  // Fallback by position: 0=cyan, 1=purple, 2=orange
  const keys = Object.keys(SERVICE_STYLES);
  return SERVICE_STYLES[keys[index % keys.length]];
}

const DEFAULT_SERVICES = [
  {
    id: "performance",
    title: "Meta Ads Management",
    description: "We work with brands that already have in-house creatives and content production. Our focus is purely on media buying, campaign scaling, funnel optimization, and maximizing ROAS through advanced Meta Ads execution.",
    features: [
      "High-Spend Meta Ads Scaling",
      "Advanced Campaign Structure",
      "ROAS & MER Optimization",
      "Full Funnel Media Buying",
      "Retargeting & Customer Journey Optimization",
      "Conversion API & Pixel Tracking",
      "Budget Scaling Without Efficiency Drop",
      "Creative Strategy Direction",
      "Data-Driven Decision Making",
    ],
  },
  {
    id: "social",
    title: "Social Media Management",
    description: "Building community and brand authority through consistent, high-quality content and strategic engagement across all major social platforms.",
    features: ["Content Calendar Strategy", "Community Engagement", "Influencer Partnerships", "Trend-Responsive Content"],
  },
  {
    id: "website",
    title: "Website Designing",
    description: "High-converting, cinematic websites that combine stunning aesthetics with seamless UX to turn your visitors into loyal customers.",
    features: ["Conversion-Optimized UX", "Premium Brand Aesthetics", "Responsive Performance", "SEO-Friendly Architecture"],
  },
];

interface ServicesProps {
  initialData?: any;
}

export default function Services({ initialData }: ServicesProps) {
  const {
    title = "Our",
    titleGradient = "Services",
    subtitle = "Specialized solutions meticulously crafted to scale your brand to new heights.",
    items = DEFAULT_SERVICES,
  } = initialData || {};

  const [selectedService, setSelectedService] = useState(items[0]?.id || "performance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContactModal } = useModal();

  useGSAP(() => {
    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  const activeIdx = items.findIndex((s: any) => s.id === selectedService);
  const activeServiceData = items[activeIdx >= 0 ? activeIdx : 0] || items[0];
  const activeStyle = getStyle(activeServiceData?.id, activeIdx >= 0 ? activeIdx : 0);
  const ActiveIcon = activeStyle.Icon;

  return (
    <section ref={containerRef} id="services" className="pt-8 md:pt-12 pb-12 md:pb-16 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-7xl font-bold font-outfit mb-6 tracking-tight text-white">
            {title} <span className="text-gradient">{titleGradient}</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">{subtitle}</p>
        </div>

        {/* Mobile: Dropdown */}
        <div className="md:hidden flex justify-center mb-12 relative z-50">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: activeStyle.dotColor }} />
                {activeServiceData.title}
              </div>
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 p-2 rounded-2xl bg-[#0c1a3d]/90 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {items.map((service: any, idx: number) => {
                  const s = getStyle(service.id, idx);
                  return (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service.id); setIsDropdownOpen(false); }}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center justify-between ${selectedService === service.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                    >
                      <span className="font-bold">{service.title}</span>
                      {selectedService === service.id && <div className="w-2 h-2 rounded-full" style={{ background: s.dotColor }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Single Card */}
        <div className="md:hidden flex justify-center">
          <div
            key={selectedService}
            className="service-card w-full max-w-2xl relative p-8 rounded-[40px] border bg-white/10 border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ boxShadow: `0 20px 50px -10px ${activeStyle.mobileShadow}` }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 rounded-[22px] flex items-center justify-center text-white shadow-2xl" style={{ background: activeStyle.gradient }}>
                <ActiveIcon className="w-8 h-8" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-start">Live Solution</div>
            </div>
            <h3 className="text-3xl font-bold font-outfit mb-4 text-white leading-tight">{activeServiceData.title}</h3>
            <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">{activeServiceData.description}</p>
            <div className="space-y-3 mb-10">
              {activeServiceData.features.map((feature: string, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-accent-start" />
                  <span className="text-sm font-semibold text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={openContactModal}
              className="w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-500"
              style={{ background: activeStyle.gradient }}
            >
              Book a Call <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop: 3-Card Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {items.map((service: any, idx: number) => {
            const s = getStyle(service.id, idx);
            const SIcon = s.Icon;
            return (
              <div
                key={service.id}
                className="service-card group relative p-10 rounded-[48px] border hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 20px 50px -10px rgba(0,0,0,0.3)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = s.hoverBg;
                  el.style.borderColor = s.hoverBorder;
                  el.style.boxShadow = s.hoverShadow;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.boxShadow = "0 20px 50px -10px rgba(0,0,0,0.3)";
                }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-2xl mb-10 group-hover:scale-110 transition-transform duration-500" style={{ background: s.gradient }}>
                    <SIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-outfit mb-6 text-white leading-tight">{service.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light flex-grow">{service.description}</p>
                  <div className="space-y-4 mb-12">
                    {service.features.map((feature: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dotColor }} />
                        <span className="text-sm font-medium text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={openContactModal}
                    className="w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 border border-white/10 text-white transition-all duration-500 mt-auto"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = s.gradient; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                  >
                    Book a Call
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
