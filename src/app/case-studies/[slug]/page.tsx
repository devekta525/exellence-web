import React from "react";
import { caseStudies } from "@/data/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import { ArrowLeft, ChevronRight, CheckCircle2, Globe, TrendingUp, Target } from "lucide-react";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-start)]/10 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fuchsia-500/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/#work" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-accent-start)] transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--color-accent-start)] font-bold uppercase tracking-[0.2em] mb-6">
                {study.category} Case Study
              </p>
              <h1 className="text-5xl md:text-6xl font-bold font-outfit leading-[1.1] mb-8 tracking-tight">
                {study.title}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
                {study.body}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {study.stats?.map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[160px]">
                    <p className="text-3xl font-bold font-outfit text-white mb-1">{stat.value}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 group">
              <img 
                src={study.image} 
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Placeholder Section */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {study.slug === "shoe-brand-scale" ? (
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <Target className="text-[var(--color-accent-start)] w-8 h-8" />
                    The Challenge
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    The client — a D2C barefoot footwear brand — had no prior advertising history. No pixel data, no audiences, no creative learnings. They needed a partner to build everything from the ground up and drive online sales profitably.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <TrendingUp className="text-[var(--color-accent-start)] w-8 h-8" />
                    Our Approach — Full Funnel Strategy
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-cyan-400 font-bold mb-3 tracking-widest text-sm uppercase">1. Awareness</h3>
                      <p className="text-white/70">Launched broad audience campaigns focusing on education—highlighting the health benefits of barefoot shoes through dynamic video creatives.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-fuchsia-400 font-bold mb-3 tracking-widest text-sm uppercase">2. Consideration</h3>
                      <p className="text-white/70">Retargeted video viewers with carousel ads showcasing different styles, use cases (running, gym, casual), and customer testimonials.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-emerald-400 font-bold mb-3 tracking-widest text-sm uppercase">3. Conversion</h3>
                      <p className="text-white/70">Implemented high-intent Advantage+ Shopping Campaigns (ASC) with aggressive offer-led creatives to capture bottom-funnel demand.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-amber-400 font-bold mb-3 tracking-widest text-sm uppercase">4. Retention</h3>
                      <p className="text-white/70">Set up dynamic catalog sales (DPA) to cross-sell accessories and new arrivals to past purchasers, increasing LTV.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Month-Over-Month Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Month 1 */}
                    <div className="bg-[#0c1a3d]/30 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-[var(--color-accent-start)] mb-6 border-b border-white/10 pb-3">Month 1 (October)</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Ad Spend</span><span className="font-semibold">₹1,50,000</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Revenue</span><span className="font-semibold">₹6,00,000</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">ROAS</span><span className="font-semibold text-[var(--color-accent-start)]">4.0x</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Purchases</span><span className="font-semibold">92</span></div>
                      </div>
                    </div>
                    {/* Month 2 */}
                    <div className="bg-[#0c1a3d]/50 border border-[var(--color-accent-start)]/30 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-start)]/10 blur-3xl rounded-full" />
                      <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 relative z-10">Month 2 (November)</h3>
                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Ad Spend</span><span className="font-bold text-white text-xl">₹5,50,000</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Revenue</span><span className="font-bold text-white text-xl">₹25,25,000</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">ROAS</span><span className="font-bold text-[var(--color-accent-start)] text-2xl">4.59x</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Total Purchases</span><span className="font-bold text-white text-xl">300</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Key Results At A Glance</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total revenue</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">₹31.25L</p>
                      <p className="text-xs text-white/40">across 2 months</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Peak ROAS</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">5.65×</p>
                      <p className="text-xs text-white/40">in launch month</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total purchases</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">392</p>
                      <p className="text-xs text-white/40">from scratch</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Spend scaled</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">5.3×</p>
                      <p className="text-xs text-white/40">in 30 days</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-4">The Takeaway</h2>
                  <div className="border-l-4 border-[var(--color-accent-start)] pl-6 py-2 bg-white/5 rounded-r-2xl p-6">
                    <p className="text-lg text-white/80 leading-relaxed italic">
                      "Starting with zero data is a challenge — but also an opportunity to build the right foundation. By structuring the funnel from awareness to conversion, we collected meaningful pixel signals early and used them to scale confidently. A slight ROAS dip during aggressive scaling is expected and healthy — what matters is absolute revenue and purchase volume, both of which grew 4x month-over-month."
                    </p>
                  </div>
                </div>
              </div>
            ) : study.slug === "sportswear-roas-optimization" ? (
              <div className="lg:col-span-2 space-y-12">
                <div className="mb-14 border-b border-white/10 pb-10">
                  <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 leading-tight">
                    Turning around a struggling sportswear brand — from 2x ROAS to 4x+ and 2,683 purchases in a month
                  </h2>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <Target className="text-[var(--color-accent-start)] w-8 h-8" />
                    The Situation
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    The client — a D2C sportswear brand — had been running Meta Ads independently for months, but results were deteriorating. ROAS had fallen below 2x, CPMs were high, and monthly purchases were declining. They needed a strategic overhaul, not just optimisation.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <TrendingUp className="text-[var(--color-accent-start)] w-8 h-8" />
                    Account Journey
                  </h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {/* Oct 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-rose-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-rose-400">Oct 2025</div>
                          <div className="text-xs text-white/40 font-bold">ROAS 2.56</div>
                        </div>
                        <div className="text-white/80 font-semibold mb-2">Struggling account</div>
                        <div className="text-sm text-white/60">654 purchases • CPM ₹67.83 • ₹2.52L spend</div>
                      </div>
                    </div>
                    
                    {/* Nov 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-rose-600 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-rose-500">Nov 2025</div>
                          <div className="text-xs text-white/40 font-bold">ROAS 1.84</div>
                        </div>
                        <div className="text-white/80 font-semibold mb-2">ROAS drops further</div>
                        <div className="text-sm text-white/60">632 purchases • CPM ₹52.02 • ₹2.83L spend</div>
                      </div>
                    </div>

                    {/* Dec 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-orange-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-orange-400">Dec 2025</div>
                          <div className="text-xs text-white/40 font-bold">ROAS 2.02</div>
                        </div>
                        <div className="text-white/80 font-semibold mb-2">Slight recovery but still weak</div>
                        <div className="text-sm text-white/60">539 purchases • CPM ₹48.48 • ₹2.21L spend</div>
                      </div>
                    </div>

                    {/* Mar 2026 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-yellow-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-yellow-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-yellow-400">Mar 2026</div>
                          <div className="text-xs text-white/40 font-bold text-yellow-300">ROAS 4.44</div>
                        </div>
                        <div className="text-white font-bold mb-2">We onboard — immediate turnaround</div>
                        <div className="text-sm text-white/60">752 purchases • CPM ₹46.70 • ₹1.51L spend</div>
                      </div>
                    </div>

                    {/* Apr 2026 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-green-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-green-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-green-400">Apr 2026</div>
                          <div className="text-xs text-white/40 font-bold text-green-300">ROAS 3.68</div>
                        </div>
                        <div className="text-white font-bold mb-2">Scaled — record 2,683 purchases</div>
                        <div className="text-sm text-white/60">CPM ₹23.81 • ₹6.40L spend • 2.35L+ impressions</div>
                      </div>
                    </div>

                    {/* May 2026 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-green-400 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-green-900/20 to-[#020617] border border-green-500/30 p-4 rounded-xl shadow-lg border-l-4 border-l-green-400">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-green-400">May 2026*</div>
                          <div className="text-xs text-white/40 font-bold text-green-300">ROAS 4.13</div>
                        </div>
                        <div className="text-white font-bold mb-2">On track for best month yet</div>
                        <div className="text-sm text-white/60">1,719 purchases in 17 days • CPM ₹22.81 — lowest ever</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mt-4 italic">*May 2026 data as of May 17 — partial month</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Before Vs After — Our First Full Month</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Before */}
                    <div className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-rose-400/80 mb-6 border-b border-rose-900/30 pb-3 uppercase tracking-widest">BEFORE (DEC 2025 AVG)</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-white/60">ROAS</span><span className="font-semibold text-rose-300 text-xl">2.02</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Purchases/mo</span><span className="font-semibold text-rose-300 text-xl">539</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">CPM</span><span className="font-semibold text-rose-300 text-xl">₹48.48</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">CPC</span><span className="font-semibold text-rose-300 text-xl">₹2.22</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Landing pg views</span><span className="font-semibold text-rose-300 text-xl">59,862</span></div>
                      </div>
                    </div>
                    {/* After */}
                    <div className="bg-green-950/20 border border-green-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full" />
                      <h3 className="text-sm font-bold text-green-400 mb-6 border-b border-green-500/30 pb-3 uppercase tracking-widest">AFTER (APR 2026)</h3>
                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center"><span className="text-white/60">ROAS</span><span className="font-bold text-white text-2xl flex items-center">3.68 <span className="text-sm font-semibold bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">↑82%</span></span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Purchases/mo</span><span className="font-bold text-white text-2xl flex items-center">2,683 <span className="text-sm font-semibold bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">↑4.97x</span></span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">CPM</span><span className="font-bold text-white text-2xl flex items-center">₹23.81 <span className="text-sm font-semibold bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">↓51%</span></span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">CPC</span><span className="font-bold text-white text-2xl">₹2.72</span></div>
                        <div className="flex justify-between items-center"><span className="text-white/60">Landing pg views</span><span className="font-bold text-white text-2xl flex items-center">1,73,171 <span className="text-sm font-semibold bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">↑2.9x</span></span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Overall Account Performance (Under Our Management)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total ad spend managed</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">₹19.26L</p>
                      <p className="text-xs text-white/40">across all periods</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total purchases driven</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">6,979</p>
                      <p className="text-xs text-white/40">lifetime on account</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Average ROAS (our tenure)</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">4.19×</p>
                      <p className="text-xs text-white/40">Mar–May 2026</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">CPM improvement</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">↓51%</p>
                      <p className="text-xs text-white/40">₹48 → ₹23</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-4">The Takeaway</h2>
                  <div className="border-l-4 border-[var(--color-accent-start)] pl-6 py-2 bg-white/5 rounded-r-2xl p-6">
                    <p className="text-lg text-white/80 leading-relaxed italic">
                      "A declining Meta account isn't necessarily a demand problem — it's often a strategy problem. By restructuring campaigns, improving creative efficiency, and reducing CPM through better audience targeting, we reversed months of decline and delivered the brand's best-ever month within 60 days of onboarding."
                    </p>
                  </div>
                </div>
              </div>
            ) : study.slug === "air-purifier-revenue" ? (
              <div className="lg:col-span-2 space-y-12">
                <div className="mb-14 border-b border-white/10 pb-10">
                  <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 leading-tight">
                    11.58x ROAS and ₹1.56 Crore in one month — capitalising on India's pollution season for a wearable air purifier
                  </h2>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <Target className="text-[var(--color-accent-start)] w-8 h-8" />
                    The Opportunity
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Wearable air purifiers are a seasonal product with a highly predictable demand spike — India's post-monsoon pollution season (October–November) when AQI levels in major cities hit hazardous levels. The key was being ready before the spike hit: campaigns warmed up, creatives tested, audiences built. We onboarded in September with exactly this in mind.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <TrendingUp className="text-[var(--color-accent-start)] w-8 h-8" />
                    Month-By-Month Journey
                  </h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {/* Aug 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-rose-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-rose-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-rose-400">Aug 2025</div>
                          <div className="text-xs text-white/40 font-bold">ROAS 1.63</div>
                        </div>
                        <div className="text-white/80 font-semibold mb-2">Before us — low efficiency</div>
                        <div className="text-sm text-white/60">157 purchases • CPM ₹46.89 • Revenue ₹5.50L</div>
                      </div>
                    </div>
                    
                    {/* Sep 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-amber-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-amber-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-amber-400">Sep 2025</div>
                          <div className="text-xs text-white/40 font-bold">ROAS 1.31</div>
                        </div>
                        <div className="text-white/80 font-semibold mb-2">We onboard — rebuilding phase</div>
                        <div className="text-sm text-white/60">91 purchases • Restructuring campaigns & creatives • Revenue ₹3.15L</div>
                      </div>
                    </div>

                    {/* Oct 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-blue-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-blue-400">Oct 2025</div>
                          <div className="text-xs text-white/40 font-bold text-blue-300">ROAS 2.59x</div>
                        </div>
                        <div className="text-white font-bold mb-2">Foundation pays off</div>
                        <div className="text-sm text-white/60">766 purchases • Reach grows to 35K • Revenue ₹26.60L • CPM drops to ₹27</div>
                      </div>
                    </div>

                    {/* Nov 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-emerald-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-emerald-900/30 to-[#020617] border border-emerald-500/50 p-4 rounded-xl shadow-lg border-l-4 border-l-emerald-500">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-emerald-400">Nov 2025</div>
                          <div className="text-xs text-white/40 font-bold text-emerald-300">ROAS 11.58x</div>
                        </div>
                        <div className="text-white font-bold mb-2">Pollution season</div>
                        <div className="text-sm text-white/60">3,903 purchases • Reach 76K • CPM ₹17.62 — lowest ever • Revenue ₹1,56,30,277</div>
                      </div>
                    </div>

                    {/* Dec 2025 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-green-400 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow border-l-4 border-l-green-400">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-green-400">Dec 2025</div>
                          <div className="text-xs text-white/40 font-bold text-green-300">ROAS 2.97x</div>
                        </div>
                        <div className="text-white font-bold mb-2">Post-season — still strong</div>
                        <div className="text-sm text-white/60">1,707 purchases • Revenue ₹57.70L • Maintained healthy ROAS post-spike</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">ROAS Progression</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-sm text-white/60">Aug (before)</div>
                      <div className="h-8 bg-rose-500/80 rounded-r flex items-center px-3 text-white text-sm font-bold" style={{ width: '15%' }}>1.63x</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-sm text-white/60">Sep (onboard)</div>
                      <div className="h-8 bg-amber-500/80 rounded-r flex items-center px-3 text-white text-sm font-bold" style={{ width: '12%' }}>1.31x</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-sm text-white/60">Oct</div>
                      <div className="h-8 bg-blue-500/80 rounded-r flex items-center px-3 text-white text-sm font-bold" style={{ width: '25%' }}>2.59x</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-sm text-white/60 font-bold text-emerald-400">Nov 🏆</div>
                      <div className="h-8 bg-emerald-500 rounded-r flex items-center px-3 text-white text-sm font-bold" style={{ width: '100%' }}>11.58x — peak pollution season</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-sm text-white/60">Dec</div>
                      <div className="h-8 bg-green-400/80 rounded-r flex items-center px-3 text-white text-sm font-bold" style={{ width: '30%' }}>2.97x</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">November Spotlight — The Peak Month</h2>
                  <div className="bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
                    <h3 className="text-sm font-bold text-blue-400 mb-8 border-b border-blue-500/30 pb-3 uppercase tracking-widest">November 2025 — India pollution season</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">11.58×</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">ROAS</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">₹1.56Cr</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">Revenue</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">3,903</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">Purchases</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">₹17.62</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">CPM (lowest ever)</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">76,508</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">Reach</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">₹139.92</p>
                        <p className="text-xs text-blue-300/70 uppercase tracking-widest">Cost per purchase</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Key Results Across The Engagement</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 border-l-4 border-l-blue-500">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Peak ROAS achieved</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">11.58×</p>
                      <p className="text-xs text-white/40">November 2025</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Revenue in peak month</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">₹1.56Cr</p>
                      <p className="text-xs text-white/40">from ₹13.5L spend</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Purchases growth</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">25×</p>
                      <p className="text-xs text-white/40">157 → 3,903</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">CPM reduction</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">↓62%</p>
                      <p className="text-xs text-white/40">₹46 → ₹17.62</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-4">The Takeaway</h2>
                  <div className="border-l-4 border-[var(--color-accent-start)] pl-6 py-2 bg-white/5 rounded-r-2xl p-6">
                    <p className="text-lg text-white/80 leading-relaxed italic">
                      "Great Meta Ads results aren't just about campaign setup — they're about timing, preparation, and positioning. By onboarding two months before India's pollution season and using that time to build audiences, test creatives, and let the pixel learn, we were ready to capitalise when demand peaked. The result: ₹1.56 Crore in a single month at an 11.58x ROAS that most brands only dream of."
                    </p>
                  </div>
                </div>
              </div>
            ) : study.slug === "sneaker-brand-growth" ? (
              <div className="lg:col-span-2 space-y-12">
                <div className="mb-14 border-b border-white/10 pb-10">
                  <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 leading-tight">
                    ₹9.47 Crore in revenue across 7 countries — scaling a shoe brand globally over 9 months
                  </h2>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <Target className="text-[var(--color-accent-start)] w-8 h-8" />
                    The Scope
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    This wasn't a single-market campaign — it was a fully coordinated multi-country Meta Ads operation. Each market had different CPMs, buying behaviour, and price sensitivity. Our job was to find profitable audiences in each country, allocate budget efficiently, and scale what worked — all from a single account spanning 32.65 Crore impressions over 9 months.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Overall Results — 9 Months (May 2025 - Jan 2026)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#c5a059]/20 to-transparent border border-[#c5a059]/30 rounded-xl p-5 border-l-4 border-l-[#c5a059]">
                      <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mb-2 font-bold">Total revenue generated</p>
                      <p className="text-xl sm:text-2xl font-bold text-[#e2c792] mb-1">₹9.47Cr</p>
                      <p className="text-xs text-[#c5a059]/80">across all markets</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total purchases</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">15,299</p>
                      <p className="text-xs text-white/40">7 countries</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Total impressions</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">32.65Cr</p>
                      <p className="text-xs text-white/40">across all markets</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mb-2">Avg cost per purchase</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">₹2,055</p>
                      <p className="text-xs text-white/40">all countries blended</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6">Revenue By Country</h2>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 bg-white/[0.02] text-xs font-bold text-white/50 uppercase tracking-wider">
                      <div>Market</div>
                      <div className="text-right">Purchases</div>
                      <div>Revenue</div>
                      <div className="text-right">Cost / Purchase</div>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                      {/* IN */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">IN <span className="text-white/50 font-normal hidden sm:inline">India</span></div>
                        <div className="text-right font-medium">12,734</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-orange-500 rounded-full hidden sm:block" style={{ width: '80%' }}></div>
                          <span className="font-medium">₹7.18Cr</span>
                        </div>
                        <div className="text-right font-medium">₹1,783</div>
                      </div>
                      
                      {/* US */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">US <span className="text-white/50 font-normal hidden sm:inline">United States</span></div>
                        <div className="text-right font-medium">1,089</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-blue-500 rounded-full hidden sm:block" style={{ width: '20%' }}></div>
                          <span className="font-medium">₹1.05Cr</span>
                        </div>
                        <div className="text-right font-medium">₹3,516</div>
                      </div>

                      {/* AE */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">AE <span className="text-white/50 font-normal hidden sm:inline">UAE</span></div>
                        <div className="text-right font-medium">505</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-teal-500 rounded-full hidden sm:block" style={{ width: '8%' }}></div>
                          <span className="font-medium">₹41.64L</span>
                        </div>
                        <div className="text-right font-medium">₹3,062</div>
                      </div>

                      {/* GB */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">GB <span className="text-white/50 font-normal hidden sm:inline">United Kingdom</span></div>
                        <div className="text-right font-medium">510</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-rose-500 rounded-full hidden sm:block" style={{ width: '8%' }}></div>
                          <span className="font-medium">₹43.03L</span>
                        </div>
                        <div className="text-right font-medium">₹3,416</div>
                      </div>

                      {/* AU */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">AU <span className="text-white/50 font-normal hidden sm:inline">Australia</span></div>
                        <div className="text-right font-medium">310</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-amber-500 rounded-full hidden sm:block" style={{ width: '5%' }}></div>
                          <span className="font-medium">₹27.12L</span>
                        </div>
                        <div className="text-right font-medium">₹3,720</div>
                      </div>

                      {/* CA */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">CA <span className="text-white/50 font-normal hidden sm:inline">Canada</span></div>
                        <div className="text-right font-medium">86</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-cyan-500 rounded-full hidden sm:block" style={{ width: '2%' }}></div>
                          <span className="font-medium">₹7.00L</span>
                        </div>
                        <div className="text-right font-medium">₹3,561</div>
                      </div>

                      {/* SG */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="font-bold text-white">SG <span className="text-white/50 font-normal hidden sm:inline">Singapore</span></div>
                        <div className="text-right font-medium">58</div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 bg-fuchsia-500 rounded-full hidden sm:block" style={{ width: '1%' }}></div>
                          <span className="font-medium">₹4.72L</span>
                        </div>
                        <div className="text-right font-medium">₹2,727</div>
                      </div>

                      {/* Total */}
                      <div className="grid grid-cols-4 gap-4 p-4 items-center bg-white/[0.03] border-t border-white/10 font-bold">
                        <div className="text-white">Total <span className="text-white/60 font-normal hidden sm:inline">— all markets</span></div>
                        <div className="text-right">15,299</div>
                        <div>₹9.47Cr</div>
                        <div className="text-right">₹2,055</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 uppercase tracking-wider text-sm text-white/50">India — The Core Market</h2>
                  <div className="bg-gradient-to-br from-[#c5a059]/20 to-[#020617] border border-[#c5a059]/30 rounded-2xl p-8">
                    <p className="text-[#e2c792] font-bold mb-6 flex items-center gap-2">
                      <span className="bg-[#c5a059] text-[#020617] text-[10px] px-2 py-0.5 rounded font-black uppercase">IN</span> 
                      India drove 83% of total purchases and 75% of all revenue
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-b border-[#c5a059]/20 pb-8 mb-8">
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">12,734</p>
                        <p className="text-xs text-[#c5a059]/80 uppercase tracking-widest">Purchases</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">₹7.18Cr</p>
                        <p className="text-xs text-[#c5a059]/80 uppercase tracking-widest">Revenue</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white mb-2">₹1,783</p>
                        <p className="text-xs text-[#c5a059]/80 uppercase tracking-widest">Cost / purchase</p>
                      </div>
                    </div>
                    <p className="text-lg text-white/70 leading-relaxed">
                      India was the highest-volume market by far — with the lowest cost per purchase at ₹1,783, it also offered the best efficiency. We scaled this market aggressively while using international markets to diversify revenue and build brand presence globally.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-4 uppercase tracking-wider text-sm text-white/50">What Made This Work</h2>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Managing Meta Ads across 7 markets simultaneously requires more than just duplicating campaigns. Each country had a different CPM floor (₹72 in India vs ₹972 in the US), different buyer intent, and different creative expectations. We localised strategy by market, allocated budget dynamically based on performance signals, and maintained a blended cost per purchase of just ₹2,055 — even across premium English-speaking markets where CPMs run 10x higher.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-4">The Takeaway</h2>
                  <div className="border-l-4 border-[var(--color-accent-start)] pl-6 py-2 bg-white/5 rounded-r-2xl p-6">
                    <p className="text-lg text-white/80 leading-relaxed italic">
                      "Scaling a brand globally on Meta isn't just a budget game — it's a data game. Over 9 months, 32.65 Crore impressions, and 15,299 purchases, we proved that a footwear brand with the right funnel and market-specific strategy can generate ₹9.47 Crore in revenue without a single wasted market. Every country in this account was profitable."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <Target className="text-[var(--color-accent-start)] w-8 h-8" />
                    The Challenge
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Before partnering with Dviora, the brand faced stagnant growth and inconsistent performance. Their Meta ad accounts were plagued by high acquisition costs and a lack of structured funneling, preventing them from scaling effectively despite having a great product.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
                    <TrendingUp className="text-[var(--color-accent-start)] w-8 h-8" />
                    Our Solution
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Structured Meta Funnel Optimization (TOFU, MOFU, BOFU)",
                      "Data-driven Creative Strategy & A/B Testing",
                      "Advanced Pixel & Conversion API Integration",
                      "Scaling through aggressive horizontal and vertical testing",
                      "Retention focused remarketing campaigns"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-white/70">
                        <CheckCircle2 className="text-cyan-400 w-6 h-6 flex-none" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-white/10 rounded-[32px] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full" />
                <h3 className="text-xl font-bold font-outfit mb-6">Want similar results?</h3>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Every business is unique. We build custom performance marketing strategies that actually work.
                </p>
                <BookCallButton />
              </div>

              <div className="bg-white/5 border border-white/5 rounded-[32px] p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Industries Served</p>
                <div className="flex flex-wrap gap-2">
                  {["E-commerce", "D2C", "SaaS", "Real Estate", "Ed-Tech"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Case Studies Slider / Link */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-outfit mb-4">More Success Stories</h2>
          <p className="text-white/50 mb-12">Explore how we've helped other brands dominate their market.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.filter(cs => cs.slug !== slug).slice(0, 3).map((item) => (
              <Link 
                key={item.id} 
                href={`/case-studies/${item.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                  <h4 className="font-bold text-lg group-hover:text-[var(--color-accent-start)] transition-colors">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
