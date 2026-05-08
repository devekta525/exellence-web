"use client";

import React, { useState } from "react";
import {
  Map,
  FileText,
  Camera,
  Scissors,
  Zap,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Decoding Your Audience",
    icon: Map,
    color: "cyan",
    hex: "#06b6d4",
    desc: "We begin by studying, not guessing. Through focus group discussions, audits of client data, competitor research, and social listening across platforms like Reddit, Quora, and X, we decode what your audience truly cares about, laughs at, feels inspired by, and is willing to act on. We supplement this with direct community engagement and feedback loops to capture qualitative insights and validate assumptions.",
    checks: [
      "Map audience segments, behaviors, and preferences",
      "Analyze competitors to uncover gaps and opportunities",
      "Audit existing campaigns, content, and KPIs",
      "Engage directly with communities to understand motivations",
    ],
  },
  {
    id: 2,
    title: "Crafting Your Strategy",
    icon: FileText,
    color: "pink",
    hex: "#d946ef",
    desc: "Once we understand the audience intimately, the insights we gather help turn data into a clear growth blueprint. We build content buckets, messaging frameworks, and audience personas that guide all campaigns. Micro-campaigns and long-term initiatives are planned with defined timelines, KPIs, and channel strategies. We also identify opportunities for digital IP and scalable brand products that can add lasting value.",
    checks: [
      "Build content buckets and communication frameworks",
      "Plan micro-campaigns and long-term roadmap with KPIs",
      "Prioritize channels, tones, and formats for maximum impact",
      "Identify scalable digital IP and product opportunities",
    ],
  },
  {
    id: 3,
    title: "Capturing The Content",
    icon: Camera,
    color: "green",
    hex: "#22c55e",
    desc: "With strategy defined, we focus on creative storytelling and capturing content that resonates. Production is planned around two focused shoots spanning seven days, supported by in-house videographers, UGC creators, influencers, and professional models. We cover a spectrum of polished studio setups, lifestyle shots, and multi-format assets aligned with audience insights and campaign objectives.",
    checks: [
      "Storyboard, script, and produce content for multiple formats",
      "Capture studio-quality and authentic lifestyle content",
      "Set tone of voice and creative style for brand consistency",
      "Collaborate with creators to amplify authenticity",
    ],
  },
  {
    id: 4,
    title: "Editing & Distribution",
    icon: Scissors,
    color: "orange",
    hex: "#f97316",
    desc: "Raw content is refined, formatted, and optimized for every platform. Our editors convert footage into Reels, Shorts, Carousels, and other formats while our distribution strategy maximizes reach and engagement. Content is scheduled and seeded across brand pages, hyperlocal handles, and collaborator channels, ensuring each asset travels strategically and delivers measurable impact.",
    checks: [
      "Edit and optimize content for all relevant platforms",
      "Package content for Reels, Shorts, Carousels, and other formats",
      "Schedule and seed content for maximum visibility and recall",
      "Distribute strategically across multiple channels",
    ],
  },
  {
    id: 5,
    title: "Testing & Scaling",
    icon: Zap,
    color: "red",
    hex: "#f43f5e",
    desc: "Campaigns are launched with a focus on learning and iteration. We run A/B tests across awareness, engagement, retargeting, and conversion funnels to identify what resonates best. Successful campaigns are scaled efficiently to improve ROI, reduce CAC, and drive higher engagement while underperforming creatives are reworked or paused for optimization.",
    checks: [
      "Test creatives, hooks, and formats systematically",
      "Scale high-performing campaigns to maximize impact",
      "Optimize spend to reduce CAC and improve ROAS",
      "Iterate content strategy based on real-time insights",
    ],
  },
  {
    id: 6,
    title: "Learning & Evolving",
    icon: TrendingUp,
    color: "yellow",
    hex: "#eab308",
    desc: "Data closes the loop and informs continuous improvement. Beyond CPM, CTR, and engagement metrics, we track conversions, ROI, hook performance, and brand equity metrics. We distill these data points into actionable recommendations, refining target audience mapping and updating content buckets based on real performance data for ongoing success.",
    checks: [
      "Track conversions, ROI, hook performance, and brand equity",
      "Distill data into actionable recommendations",
      "Refine target audience mapping based on performance data",
      "Continuous feedback loop with the client team",
    ],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="process" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-white">
          Our Process
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          From audience insights to optimized results, we follow a structured path to guarantee your success.
        </p>
        
        {/* Gradient Separator Line */}
        <div className="h-1 w-full max-w-md mx-auto bg-white/10 rounded-full overflow-hidden flex">
          <div className="w-1/3 bg-gradient-to-r from-blue-600 to-pink-500 h-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Mobile Tabs Navigation */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar -mx-6 px-6 mb-8">
          <div className="flex gap-3 min-w-max pb-4">
            {processSteps.map((step) => {
              const isActive = activeStep === step.id;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 border whitespace-nowrap ${
                    isActive
                      ? "bg-[#0c1a3d] border-white/20 shadow-lg scale-105"
                      : "border-white/5 bg-white/[0.02] text-gray-500"
                  }`}
                  style={{
                    borderColor: isActive ? `${step.hex}60` : undefined,
                    boxShadow: isActive ? `0 0 15px ${step.hex}20` : "none",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? step.hex : "inherit" }}
                  />
                  <span
                    className={`text-sm font-bold tracking-wide ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left Sticky Sidebar (Desktop only) */}
        <div className="hidden lg:block w-[350px] shrink-0 relative">
          <div className="sticky top-32 space-y-3">
            {processSteps.map((step) => {
              const isActive = activeStep === step.id;
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-[16px] cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-[#0c1a3d]/40 border-white/20 shadow-xl scale-105"
                      : "border-transparent hover:bg-white/[0.02]"
                  }`}
                  style={{
                    borderColor: isActive ? `${step.hex}40` : "transparent",
                    boxShadow: isActive ? `0 0 20px ${step.hex}10` : "none",
                  }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? "" : "text-gray-600"
                    }`}
                    style={{ color: isActive ? step.hex : undefined }}
                  />
                  <span
                    className={`font-semibold text-[15px] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content Cards (Tabs Implementation) */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-1 grid-rows-1">
            {processSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <div
                  key={step.id}
                  className={`col-start-1 row-start-1 group relative flex flex-col w-full transition-all duration-700 ease-out ${
                    isActive 
                      ? "opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto" 
                      : "opacity-0 translate-y-12 scale-[0.97] z-0 pointer-events-none"
                  }`}
                >
                  {/* Outer Glow Background */}
                  <div
                    className="absolute inset-0 rounded-[32px] opacity-20 pointer-events-none blur-3xl transition-opacity duration-500"
                    style={{ backgroundColor: step.hex }}
                  />
                  
                  {/* Gradient Border Outline */}
                  <div
                    className="absolute -inset-[1px] rounded-[33px] pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(180deg, ${step.hex}, ${step.hex}40 50%, ${step.hex})`,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />
                  
                  {/* Inner Card */}
                  <div className="relative h-full bg-[#0c1a3d]/40 rounded-[32px] p-8 md:p-12 border border-white/5 overflow-hidden">
                    
                    {/* Inner Gradient Background */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(180deg, ${step.hex}25 0%, ${step.hex}05 50%, transparent 100%)`,
                        opacity: isActive ? 1 : 0.5,
                      }}
                    />
                    
                    <div className="relative z-10">
                      {/* Header: Icon, Title, and Step Number */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <Icon className="w-8 h-8" style={{ color: step.hex }} />
                          <h3
                            className="text-2xl md:text-3xl font-bold text-white relative inline-block pb-1 font-outfit"
                          >
                            {step.title}
                            {/* Colored underline */}
                            <div
                              className="absolute bottom-0 left-0 h-0.5 w-full rounded-full"
                              style={{ backgroundColor: step.hex }}
                            />
                          </h3>
                        </div>
                        
                        {/* Step Number Circle */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg shrink-0 ml-4"
                          style={{ backgroundColor: step.hex }}
                        >
                          {step.id}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                        {step.desc}
                      </p>

                      {/* Checkmarks List */}
                      <div className="space-y-4">
                        {step.checks.map((check, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2
                              className="w-5 h-5 shrink-0 mt-0.5"
                              style={{ color: step.hex }}
                            />
                            <span className="text-gray-300 text-sm md:text-base">
                              {check}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
