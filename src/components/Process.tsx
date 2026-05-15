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
  const step = processSteps[0]; // Decoding Your Audience
  const Icon = step.icon;

  return (
    <section id="process" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-bold font-outfit mb-6 text-white tracking-tight">
          Our <span className="text-gradient">Process</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          A strategic, data-led approach designed to decode your audience and drive growth.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Single Static Process Card */}
        <div 
          className={`relative p-8 md:p-12 rounded-[48px] overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl`}
        >
          {/* Subtle Texture/Grain */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Icon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white font-outfit leading-tight max-w-[250px] md:max-w-md">
                  {step.title}
                </h3>
              </div>
            </div>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 font-medium max-w-3xl">
              {step.desc}
            </p>

            {/* Checkmarks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-8 border-t border-white/20">
              {step.checks.map((check, idx) => (
                <div key={idx} className="flex items-center gap-4 group/item">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/20 group-hover/item:bg-white transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-white group-hover/item:text-black" />
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base opacity-90">
                    {check}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
