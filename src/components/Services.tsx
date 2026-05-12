"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  PieChart,
  Clapperboard,
  LayoutTemplate,
  Globe2,
  Star,
  Activity,
  Users,
  Target,
  Lightbulb,
  PenTool,
  Camera,
  Heart,
  Scissors,
  LayoutGrid,
  Share2,
  Megaphone,
  RefreshCw,
  LineChart,
  MessageCircle,
  Wrench,
  Mic,
  Package,
  Map,
  ArrowRight
} from "lucide-react";
import { servicesData } from "@/data/services";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      ".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="py-24 px-6 md:px-12 bg-transparent relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 service-header">
          <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive digital solutions designed to accelerate your brand's growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 services-grid">
          {servicesData.map((service) => {
            const MainIcon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card group relative overflow-hidden bg-card-bg border border-white/5 rounded-[24px] p-6 transition-all duration-300 hover:border-white/20 cursor-default"
              >
                {/* Hover Glow Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${service.glowColorCode}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Service Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.iconBg} ${service.iconColor} shadow-lg`}
                    >
                      <MainIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Items List */}
                  <div className="space-y-3 mb-8">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg p-3"
                        >
                          <ItemIcon className={`w-4 h-4 ${item.color}`} />
                          <span className="text-sm font-medium text-gray-300">
                            {item.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Learn More Link */}
                  <Link 
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors cursor-pointer w-fit"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
