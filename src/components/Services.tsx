"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { servicesData } from "@/data/services";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVertical, setActiveVertical] = useState(0);
  const [activeService, setActiveService] = useState(0);
  
  const detailsRef = useRef<HTMLDivElement>(null);

  // Reset active service when vertical changes
  useEffect(() => {
    setActiveService(0);
  }, [activeVertical]);

  useGSAP(() => {
    gsap.fromTo(
      ".service-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".services-container",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  // Animation for details change
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current, 
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeService, activeVertical]);

  const currentVertical = servicesData[activeVertical];
  const currentService = currentVertical.items[activeService];

  return (
    <section ref={containerRef} id="services" className="py-12 md:py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-start/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 service-header">
          <h2 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Strategic digital solutions meticulously crafted to elevate your brand's global presence.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="services-container grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
          
          {/* Column 1: VERTICALS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="hidden lg:block bg-accent-start/10 text-accent-start px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase mb-6 text-center">
              Verticals
            </div>
            
            {/* Mobile Verticals Tabs */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-3 pb-4 snap-x snap-mandatory">
              {servicesData.map((vertical, idx) => (
                <button
                  key={vertical.id}
                  onClick={() => setActiveVertical(idx)}
                  className={`flex-shrink-0 snap-start px-6 py-3 rounded-xl transition-all duration-300 border flex items-center gap-3 ${
                    activeVertical === idx 
                    ? "bg-accent-start text-white border-accent-start shadow-[0_0_20px_rgba(56,189,248,0.4)]" 
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <vertical.icon className={`w-5 h-5 ${activeVertical === idx ? "text-white" : "text-accent-start"}`} />
                  <span className="text-sm font-bold whitespace-nowrap">{vertical.title}</span>
                </button>
              ))}
            </div>

            {/* Desktop Verticals List */}
            <div className="hidden lg:block space-y-3">
              {servicesData.map((vertical, idx) => (
                <button
                  key={vertical.id}
                  onClick={() => setActiveVertical(idx)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border flex flex-col gap-3 group ${
                    activeVertical === idx 
                    ? "bg-accent-start text-white border-accent-start shadow-[0_0_30px_rgba(56,189,248,0.3)]" 
                    : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <vertical.icon className={`w-8 h-8 ${activeVertical === idx ? "text-white" : "text-accent-start opacity-70 group-hover:opacity-100"}`} />
                    {activeVertical === idx && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </div>
                  <span className="text-lg font-bold font-outfit">{vertical.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div className="lg:col-span-4 space-y-4">
            <div className="hidden lg:block bg-accent-end/10 text-accent-end px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase mb-6 text-center">
              Services
            </div>

            {/* Mobile Services Tabs */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 pb-2 snap-x snap-mandatory">
              {currentVertical.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  className={`flex-shrink-0 snap-start px-4 py-2 rounded-lg transition-all duration-300 border ${
                    activeService === idx 
                    ? "bg-accent-end text-white border-accent-end shadow-[0_0_15px_rgba(129,140,248,0.3)]" 
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium whitespace-nowrap">{item.text}</span>
                </button>
              ))}
            </div>

            {/* Desktop/Common Services Container */}
            <div className="hidden lg:block bg-white/5 border border-white/5 rounded-[24px] lg:rounded-[32px] p-2 lg:p-4">
              <div className="space-y-2">
                {currentVertical.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveService(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      activeService === idx 
                      ? "bg-white/10 text-white shadow-inner" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeService === idx ? "bg-accent-end text-white" : "bg-white/5 group-hover:bg-white/10"}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeService === idx ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: DETAILS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="hidden lg:block bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase mb-6 text-center">
              Details
            </div>
            <div className="bg-white/5 border border-white/5 rounded-[24px] lg:rounded-[32px] p-6 lg:p-12 h-full flex flex-col relative overflow-hidden group">
              {/* Background accent */}
              <div 
                className="absolute -top-24 -right-24 w-64 h-64 blur-[80px] rounded-full transition-opacity duration-1000"
                style={{ backgroundColor: `${currentVertical.glowColorCode.replace('0.15', '0.05')}` }}
              />

              <div ref={detailsRef} className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center ${currentVertical.iconBg} text-white shadow-2xl`}>
                    <currentService.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white font-outfit leading-tight">
                      {currentService.text}
                    </h3>
                    <p className="text-accent-start font-medium text-xs lg:text-sm mt-1">
                      {currentVertical.title} Specialist
                    </p>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6 flex-grow">
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-light">
                    {currentService.description || currentVertical.longDescription}
                  </p>
                  
                  <div className="pt-4 lg:pt-6 border-t border-white/5">
                    <h4 className="text-white font-bold mb-3 lg:mb-4 flex items-center gap-2 text-sm lg:text-base">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2 lg:space-y-3">
                      {currentVertical.benefits.slice(0, 3).map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-gray-400 text-xs lg:text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-start flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 lg:mt-12 flex flex-wrap gap-3 lg:gap-4">
                  <Link
                    href={`/services/${currentVertical.slug}`}
                    className="flex-1 lg:flex-none text-center bg-white text-black px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-accent-start hover:text-white transition-all duration-300 shadow-xl text-sm lg:text-base"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Link>
                  <button className="flex-1 lg:flex-none text-center px-6 lg:px-8 py-3 lg:py-4 rounded-full border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300 text-sm lg:text-base">
                    Quick Enquiry
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

