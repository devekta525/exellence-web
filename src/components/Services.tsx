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
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    title: "Marketing Strategy",
    icon: PieChart,
    iconColor: "text-white",
    iconBg: "bg-blue-600",
    glowColorCode: "rgba(37, 99, 235, 0.15)", // Blue
    items: [
      { text: "Audience Mapping & Market Research", icon: Users, color: "text-purple-400" },
      { text: "Brand Positioning & Strategy", icon: Target, color: "text-red-400" },
      { text: "MicroCampaign Development", icon: Lightbulb, color: "text-yellow-400" },
    ],
  },
  {
    id: 2,
    title: "Content Creation",
    icon: Clapperboard,
    iconColor: "text-white",
    iconBg: "bg-green-500",
    glowColorCode: "rgba(34, 197, 94, 0.15)", // Green
    items: [
      { text: "Content Writing & Ideation", icon: PenTool, color: "text-orange-400" },
      { text: "Videography & Photography", icon: Camera, color: "text-purple-400" },
      { text: "UGC & Influencer Collaboration", icon: Heart, color: "text-yellow-400" },
    ],
  },
  {
    id: 3,
    title: "Editing & Distribution",
    icon: LayoutTemplate,
    iconColor: "text-white",
    iconBg: "bg-purple-600",
    glowColorCode: "rgba(147, 51, 234, 0.15)", // Purple
    items: [
      { text: "Video Editing (SFX + VFX)", icon: Scissors, color: "text-red-400" },
      { text: "Platform-Specific Formatting", icon: LayoutGrid, color: "text-blue-400" },
      { text: "Cross-Platform Publishing", icon: Share2, color: "text-cyan-400" },
    ],
  },
  {
    id: 4,
    title: "Performance Marketing",
    icon: Globe2,
    iconColor: "text-white",
    iconBg: "bg-red-500",
    glowColorCode: "rgba(239, 68, 68, 0.2)", // Red/Orange
    items: [
      { text: "Paid Media Planning & Execution", icon: Megaphone, color: "text-pink-400" },
      { text: "Retargeting & Engagement Optimization", icon: RefreshCw, color: "text-blue-400" },
      { text: "Performance Tracking & Optimization", icon: LineChart, color: "text-gray-300" },
    ],
  },
  {
    id: 5,
    title: "Community Building",
    icon: Star,
    iconColor: "text-white",
    iconBg: "bg-pink-500",
    glowColorCode: "rgba(236, 72, 153, 0.15)", // Pink
    items: [
      { text: "Social Community Engagement", icon: MessageCircle, color: "text-gray-300" },
      { text: "Customer Advocacy Programs", icon: Users, color: "text-yellow-500" },
      { text: "Engagement Workshop Management", icon: Wrench, color: "text-gray-400" },
    ],
  },
  {
    id: 6,
    title: "Digital Brand IP Creation",
    icon: Activity,
    iconColor: "text-white",
    iconBg: "bg-cyan-500",
    glowColorCode: "rgba(6, 182, 212, 0.15)", // Cyan
    items: [
      { text: "Branded Podcasts & Web Series", icon: Mic, color: "text-gray-400" },
      { text: "Scalable Content Products", icon: Package, color: "text-orange-400" },
      { text: "IP Strategy & Long-Term Planning", icon: Map, color: "text-red-400" },
    ],
  },
];

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
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
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
                  <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
