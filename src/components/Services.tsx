"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { 
  Zap, 
  Share2, 
  Palette, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2,
  TrendingUp,
  Layout,
  MessageSquare
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useModal } from "@/context/ModalContext";

const SERVICES = [
  {
    id: "performance",
    title: "Meta Ads Management",
    description: "We work with brands that already have in-house creatives and content production. Our focus is purely on media buying, campaign scaling, funnel optimization, and maximizing ROAS through advanced Meta Ads execution.",
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    features: [
      "High-Spend Meta Ads Scaling",
      "Advanced Campaign Structure",
      "ROAS & MER Optimization",
      "Full Funnel Media Buying",
      "Retargeting & Customer Journey Optimization",
      "Conversion API & Pixel Tracking",
      "Budget Scaling Without Efficiency Drop",
      "Creative Strategy Direction",
      "Data-Driven Decision Making"
    ]
  },
  {
    id: "social",
    title: "Social Media Management",
    description: "Building community and brand authority through consistent, high-quality content and strategic engagement across all major social platforms.",
    icon: Share2,
    color: "from-purple-500 to-fuchsia-600",
    glow: "shadow-purple-500/20",
    features: ["Content Calendar Strategy", "Community Engagement", "Influencer Partnerships", "Trend-Responsive Content"]
  },
  {
    id: "website",
    title: "Website Designing",
    description: "High-converting, cinematic websites that combine stunning aesthetics with seamless UX to turn your visitors into loyal customers.",
    icon: Palette,
    color: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/20",
    features: ["Conversion-Optimized UX", "Premium Brand Aesthetics", "Responsive Performance", "SEO-Friendly Architecture"]
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContactModal } = useModal();

  useGSAP(() => {
    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const activeServiceData = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <section ref={containerRef} id="services" className="pt-8 md:pt-12 pb-12 md:pb-16 px-6 bg-transparent relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Specialized solutions meticulously crafted to scale your brand to new heights.
          </p>
        </div>

        {/* Mobile View: Creative Dropdown Selector */}
        <div className="md:hidden flex justify-center mb-12 relative z-50">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeServiceData.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
                {activeServiceData.title}
              </div>
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 p-2 rounded-2xl bg-[#0c1a3d]/90 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center justify-between group ${
                      selectedService === service.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="font-bold">{service.title}</span>
                    {selectedService === service.id && <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile View: Single Service Card */}
        <div className="md:hidden flex justify-center">
          <div
            key={selectedService}
            className={`service-card w-full max-w-2xl relative p-8 rounded-[40px] border bg-white/10 border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500`}
            style={{ 
              boxShadow: `0 20px 50px -10px ${activeServiceData.id === 'performance' ? 'rgba(6,182,212,0.15)' : activeServiceData.id === 'social' ? 'rgba(168,85,247,0.15)' : 'rgba(249,115,22,0.15)'}` 
            }}
          >
            {/* Top Icon & Accent */}
            <div className="flex items-start justify-between mb-8">
              <div className={`w-16 h-16 rounded-[22px] bg-gradient-to-br ${activeServiceData.color} flex items-center justify-center text-white shadow-2xl`}>
                <activeServiceData.icon className="w-8 h-8" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-start">
                Live Solution
              </div>
            </div>

            <h3 className="text-3xl font-bold font-outfit mb-4 text-white leading-tight">
              {activeServiceData.title}
            </h3>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
              {activeServiceData.description}
            </p>

            <div className="space-y-3 mb-10">
              {activeServiceData.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-accent-start" />
                  <span className="text-sm font-semibold text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={openContactModal}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 transition-all duration-500 bg-gradient-to-r ${activeServiceData.color} text-white shadow-xl hover:scale-[1.02] active:scale-95`}
            >
              Book a Call
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop View: 3-Card Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group relative p-10 rounded-[48px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col h-full"
              style={{ 
                boxShadow: `0 20px 50px -10px rgba(0,0,0,0.3)` 
              }}
            >
              {/* Background Glow */}
              <div className={`absolute -inset-2 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl mb-10 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-bold font-outfit mb-6 text-white leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light flex-grow">
                  {service.description}
                </p>

                <div className="space-y-4 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      <span className="text-sm font-medium text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={openContactModal}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 transition-all duration-500 bg-white/5 border border-white/10 text-white hover:bg-gradient-to-r ${service.color} hover:border-transparent hover:shadow-xl hover:shadow-${service.id === 'performance' ? 'cyan-500/20' : service.id === 'social' ? 'purple-500/20' : 'orange-500/20'} mt-auto`}
                >
                  Book a Call
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

