"use client";

import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

export default function ServiceDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContactModal } = useModal();
  
  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    if (!service) {
      router.push("/#services");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-fade-up", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [service, router]);

  if (!service) return null;

  const Icon = service.icon;

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${service.glowColorCode}, transparent 70%)`,
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-8 shadow-xl`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-8 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-10">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={openContactModal}
                  className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all"
                >
                  Book a Strategy Call
                </button>
              </div>
            </div>

            <div className="animate-fade-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-6 font-outfit">Core Capabilities</h3>
                  <div className="space-y-6">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-4">
                          <div className={`mt-1 p-2 rounded-lg bg-white/5 ${item.color}`}>
                            <ItemIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1">{item.text}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              Leveraging advanced tools and frameworks to deliver consistent results in {item.text.toLowerCase()}.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-8">Deep Dive</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6 text-xl">
                  {service.longDescription}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Our approach is built on years of experience managing high-budget campaigns and creative productions. We don't believe in one-size-fits-all solutions. Instead, we customize our {service.title.toLowerCase()} framework to align with your specific business goals, whether that's rapid customer acquisition or long-term brand equity building.
                </p>
              </div>
            </div>

            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold font-outfit mb-8">Key Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-200 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                <h4 className="text-xl font-bold mb-4 font-outfit">Ready to scale?</h4>
                <p className="text-gray-400 mb-6">Let's discuss how our {service.title} can transform your brand.</p>
                <button 
                  onClick={openContactModal}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
