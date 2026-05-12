import React from "react";
import { caseStudies } from "@/data/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CheckCircle2, Globe, TrendingUp, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar />
      
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
              <p className="text-[var(--color-accent-start)] font-bold uppercase tracking-[0.3em] mb-6">
                {study.category} Case Study
              </p>
              <h1 className="text-5xl md:text-7xl font-bold font-outfit leading-[1.1] mb-8 tracking-tight">
                {study.title}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-xl mb-10">
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

            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <img 
                src={study.image} 
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Placeholder Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
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

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-white/10 rounded-[32px] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full" />
                <h3 className="text-xl font-bold font-outfit mb-6">Want similar results?</h3>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Every business is unique. We build custom performance marketing strategies that actually work.
                </p>
                <Link 
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
                >
                  Book a Strategy Call
                  <ChevronRight className="w-5 h-5" />
                </Link>
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
      <section className="py-24 px-6 md:px-12">
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

      <Footer />
    </main>
  );
}
