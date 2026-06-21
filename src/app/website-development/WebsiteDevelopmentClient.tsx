"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Gauge, 
  Search, 
  Smartphone, 
  Check, 
  ArrowRight, 
  Shield,
  HelpCircle,
  X,
  Send,
  Loader2,
  ChevronDown
} from "lucide-react";

export default function WebsiteDevelopmentClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    projectType: "Standard Website",
    budget: "₹10,000 - ₹25,000",
    message: ""
  });

  // 3D Parallax Tilt State
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  
  // Interactive Lead Simulator State
  const [traffic, setTraffic] = useState(25000);
  const [convRate, setConvRate] = useState(3.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max rotation in degrees
    const maxRotate = 8; 
    const rotateX = -(y / (box.height / 2)) * maxRotate;
    const rotateY = (x / (box.width / 2)) * maxRotate;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  // Open Modal Helper with pre-selected project type
  const handleOpenModal = (projectType?: string, budgetRange?: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: projectType || "Standard Website",
      budget: budgetRange || "₹10,000 - ₹25,000"
    }));
    setIsModalOpen(true);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.fromTo(".animate-hero-glow", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.35, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(".animate-hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=1.2"
    )
    .fromTo(".animate-hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(".animate-hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".animate-workspace-visual",
      { scale: 0.95, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      "-=0.6"
    );

    // Features Section Scroll Animation
    gsap.fromTo(".feature-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
        }
      }
    );

    // Pricing Section Scroll Animation
    gsap.fromTo(".pricing-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map form fields to backend expectations:
      // Full Name -> name
      // Phone Number -> phone
      // Email -> email
      // Business Name -> website (used as business identifier in the existing template)
      // Project Type -> service
      // Budget Range -> revenue
      // Message -> message
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        website: formData.businessName || "Not Specified",
        service: `Web Dev: ${formData.projectType}`,
        revenue: formData.budget,
        message: formData.message
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          businessName: "",
          projectType: "Standard Website",
          budget: "₹10,000 - ₹25,000",
          message: ""
        });
        setIsModalOpen(false);
        router.push("/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting consultation request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      title: "Responsive Design",
      description: "Flawless viewports across all devices. We design mobile-first layouts so your visitors enjoy a consistent, fluid screen experience.",
      icon: Smartphone,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Fast Loading Speed",
      description: "Blazing fast loading speeds targeting 95+ PageSpeed scores. Optimized code structures, dynamic image formats, and edge hosting frameworks.",
      icon: Gauge,
      gradient: "from-purple-500 to-fuchsia-500"
    },
    {
      title: "SEO Optimized",
      description: "Engineered from the ground up to rank. Dynamic metadata mapping, semantic tags, schema markups, and structured layouts built for search crawlers.",
      icon: Search,
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      title: "Secure Hosting",
      description: "Enterprise security frameworks. Edge CDN cache servers, custom SSL certificates, DDoS protection shields, and automated database backups.",
      icon: Shield,
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "Modern UI/UX",
      description: "Cinematic digital designs that align with high-end brands. Subtle animations, modern typography layouts, and fluid transitions.",
      icon: Sparkles,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Dedicated Support",
      description: "Reliable engineer support. Six months of structural code maintenance, domain configuration updates, and strategic consults included.",
      icon: HelpCircle,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#020617] to-[#020617]">
        {/* Glow Effects */}
        <div className="animate-hero-glow absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-purple-600/10 via-indigo-500/10 to-blue-500/10 blur-[120px] rounded-full pointer-events-none opacity-0" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left">
            <div className="animate-hero-title inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Professional Web Design & Development</span>
            </div>

            <h1 className="animate-hero-title text-4xl sm:text-5xl md:text-7xl font-bold font-outfit mb-8 leading-[1.05] tracking-tight text-white">
              Transform Your Brand with Custom <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">Website Development</span>
            </h1>

            <p className="animate-hero-sub text-lg md:text-xl text-gray-400 leading-relaxed mb-12 font-light max-w-2xl">
              Get SEO-optimized custom websites, eCommerce solutions, and high-performance React/Next.js web applications tailored for your business. We engineer for speed, conversion rate optimization, and search engine rankings.
            </p>

            <div className="animate-hero-cta grid grid-cols-2 gap-4 max-w-lg w-full">
              <button 
                onClick={() => handleOpenModal("Other", "₹10,000 - ₹25,000")}
                className="px-2 sm:px-6 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-sm sm:text-base md:text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/20 active:scale-95 text-center flex items-center justify-center"
              >
                Get Free Consultation
              </button>
              <a 
                href="#pricing"
                className="px-2 sm:px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm sm:text-base md:text-lg transition-all active:scale-95 text-center flex items-center justify-center"
              >
                View Pricing Plans
              </a>
            </div>
          </div>
            {/* Right Workspace Visual Illustration */}
          <div className="animate-workspace-visual lg:col-span-5 relative mt-16 lg:mt-0 select-none">
            {/* Ambient Background Glows */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
            
            {/* Outer Glow Outline on Hover */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 rounded-[36px] blur-xl opacity-20 animate-pulse pointer-events-none" />
            
            {/* Visual Glassmorphic Calculator Frame */}
            <div 
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-[32px] bg-slate-950/70 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl overflow-visible aspect-[4/3.4] flex flex-col transition-all duration-200 select-none cursor-pointer animate-in fade-in zoom-in-95 duration-500"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">Lead Flow Simulator</div>
                <div className="w-6" />
              </div>

              {/* Sliders Area */}
              <div className="space-y-5 flex-grow">
                {/* Traffic Input Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Monthly Web Traffic</span>
                    <span className="text-cyan-400 font-bold font-outfit">{traffic.toLocaleString('en-IN')} visitors</span>
                  </div>
                  <div className="relative group/slider flex items-center">
                    <input 
                      type="range" 
                      min="5000" 
                      max="100000" 
                      step="5000"
                      value={traffic}
                      onChange={(e) => setTraffic(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Conversion Rate Input Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Target Conversion Rate</span>
                    <span className="text-fuchsia-400 font-bold font-outfit">{convRate.toFixed(1)}%</span>
                  </div>
                  <div className="relative group/slider flex items-center">
                    <input 
                      type="range" 
                      min="1.0" 
                      max="8.0" 
                      step="0.1"
                      value={convRate}
                      onChange={(e) => setConvRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fuchsia-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Simulated Lead Results Section */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Estimated Leads</span>
                    <span className="text-3xl font-black text-white font-outfit animate-pulse">
                      {Math.round((traffic * convRate) / 100)} <span className="text-xs font-semibold text-gray-400">/mo</span>
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Est. Revenue Impact</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-outfit truncate">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(((traffic * convRate) / 100) * 0.10 * 15000))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Booster Circle Badge floating widget */}
              <div className="absolute -top-12 right-6 w-32 rounded-2xl bg-slate-950/95 border border-purple-500/30 p-3 shadow-2xl backdrop-blur-md flex flex-col items-center hover:scale-105 transition-transform duration-300 z-20">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 mb-2">
                  <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                </div>
                <span className="text-lg font-black text-white font-outfit">{(convRate / 1.0).toFixed(1)}x</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center mt-1">Conversion Boost</span>
              </div>

              {/* Graph / Action Bar overlay */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-4">
                {/* Dynamically scaling SVG Sparkline */}
                <div className="relative h-12 bg-white/[0.02] border border-white/5 rounded-2xl p-2.5 overflow-hidden flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Lead Growth Trend</span>
                    <span className="text-[10px] font-bold text-white mt-0.5">Scale: {Math.round(((traffic * convRate) / 100) * 1.2)} max</span>
                  </div>
                  <div className="w-32 h-full">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d={`M0 28 Q25 ${28 - (convRate/8)*22} 50 ${20 - (convRate/8)*18} T100 ${8 - (convRate/8)*6}`}
                        className="fill-none stroke-cyan-400"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M0 28 Q25 ${28 - (convRate/8)*22} 50 ${20 - (convRate/8)*18} T100 ${8 - (convRate/8)*6} L100 30 L0 30 Z`}
                        className="fill-gradient stroke-none opacity-20"
                        style={{ fill: "url(#lead-glow-gradient)" }}
                      />
                      <defs>
                        <linearGradient id="lead-glow-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Direct Action Link */}
                <button 
                  onClick={() => handleOpenModal(`Lead Funnel (${traffic.toLocaleString()} Traffic / ${convRate}% Conv)`, `${Math.round((traffic * convRate) / 100)} Estimated Leads`)}
                  className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20 text-center flex items-center justify-center gap-3 animate-pulse"
                >
                  Setup This Lead Funnel
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-16 px-6 md:px-12 bg-slate-950/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-white">
              Custom Web Engineering for <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Peak Conversion</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Our Next.js website design and custom React web development prioritize absolute loading speed, visual aesthetics, and solid SEO coding practices to convert visitors into clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div 
                  key={idx}
                  className="feature-card group relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                  style={{ boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)" }}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-outfit text-white group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="pricing-section py-16 px-6 md:px-12 relative bg-[#020617]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-white">
              Transparent, <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Flat-Rate Web Development Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Affordable packages with no hidden fees or complicated hourly contracts. Choose a web development plan that matches your budget and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Pricing Card 1 - Standard */}
            <div className="pricing-card rounded-[36px] bg-slate-900/30 border border-white/5 p-8 md:p-10 flex flex-col justify-between hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300 relative">
              <div>
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-2">Ideal for Small Businesses</span>
                <h3 className="text-3xl font-bold font-outfit text-white mb-6">Standard Website</h3>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-8">
                  <span className="text-5xl font-extrabold font-outfit text-white">₹10,000</span>
                  <span className="text-gray-500 text-sm">flat-rate fee</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Free Hosting Included",
                    "6 Months Free Maintenance",
                    "Responsive Design",
                    "Contact Forms",
                    "SEO Friendly Structure",
                    "Delivery within 5-7 Days"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleOpenModal("Standard Website", "₹10,000 - ₹25,000")}
                className="w-full py-4.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 text-white font-bold text-base transition-all active:scale-98"
              >
                Choose Standard Plan
              </button>
            </div>

            {/* Pricing Card 2 - eCommerce & Large Projects (Featured) */}
            <div className="pricing-card rounded-[36px] bg-gradient-to-b from-purple-950/20 to-slate-900/50 border border-purple-500/30 p-8 md:p-10 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 relative shadow-2xl shadow-purple-500/5">
              
              {/* Featured Badge */}
              <div className="absolute -top-3.5 right-8 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-400/20 text-white text-[10px] font-extrabold uppercase tracking-widest animate-pulse">
                Most Popular Plan
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-purple-400 uppercase block mb-2">Ideal for Scale & Sales</span>
                <h3 className="text-3xl font-bold font-outfit text-white mb-6">eCommerce & Large Projects</h3>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-8">
                  <span className="text-5xl font-extrabold font-outfit text-white">₹25,000</span>
                  <span className="text-purple-400 text-sm font-semibold">starting price</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "eCommerce Website",
                    "Custom Functionality",
                    "Admin Dashboard",
                    "Payment Gateway Integration",
                    "Server Deployment by Our Team",
                    "Server Provided by Client",
                    "Scalable Architecture",
                    "Priority Support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleOpenModal("eCommerce Store", "₹25,000 - ₹50,000")}
                className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-base transition-all active:scale-98 shadow-lg shadow-purple-500/15"
              >
                Start Your Project
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Lead Generation Section */}
      <section className="py-16 px-6 md:px-12 relative bg-slate-950/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          
          <div className="relative rounded-[48px] overflow-hidden p-8 md:p-16 border border-white/10 bg-gradient-to-br from-indigo-950/20 to-[#020617] text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 text-white leading-tight">
                Ready to Launch Your Custom Website?
              </h2>
              
              <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
                Request a free web strategy consultation today. Our professional website design and development team will review your specifications, plan user flows, and structure your custom Next.js application.
              </p>
              
              <button 
                onClick={() => handleOpenModal("Other", "₹10,000 - ₹25,000")}
                className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto hover:bg-gray-100 shadow-xl active:scale-95"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Center Form Container */}
          <div className="relative w-full max-w-lg bg-[#0c1a3d]/95 border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-2">
              Request Free Consultation
            </h3>
            <p className="text-gray-400 text-sm mb-8">
              Fill out the form below to receive a custom quote and strategy blueprint within 24 hours.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all focus:bg-white/[0.08]"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Contact Details (Phone & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    title="Please enter exactly 10 digits"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData(prev => ({ ...prev, phone: value }));
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all focus:bg-white/[0.08]"
                    placeholder="10-digit number"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all focus:bg-white/[0.08]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all focus:bg-white/[0.08]"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              {/* Dropdowns: Project Type & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Project Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer focus:bg-white/[0.08]"
                    >
                      <option className="bg-[#0c1a3d]" value="Standard Website">Standard Website</option>
                      <option className="bg-[#0c1a3d]" value="eCommerce Store">eCommerce Store</option>
                      <option className="bg-[#0c1a3d]" value="Custom Web Application">Custom Web Application</option>
                      <option className="bg-[#0c1a3d]" value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Budget Range <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer focus:bg-white/[0.08]"
                    >
                      <option className="bg-[#0c1a3d]" value="Under ₹10,000">Under ₹10,000</option>
                      <option className="bg-[#0c1a3d]" value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option className="bg-[#0c1a3d]" value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option className="bg-[#0c1a3d]" value="₹50,000+">₹50,000+</option>
                      <option className="bg-[#0c1a3d]" value="Not Sure">Not Sure</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Message <span className="text-gray-500 font-normal italic">(Optional)</span>
                </label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none focus:bg-white/[0.08]"
                  placeholder="Describe your design styling, integrations, or deadline requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold overflow-hidden transition-all active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl animate-border-slide"></div>
                <div className="absolute inset-[1.5px] bg-[#0c1a3d] rounded-[10px] group-hover:bg-[#162a5a] transition-colors duration-300"></div>

                <span className="relative z-10 flex items-center gap-3 text-white">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Requesting Consultation...
                    </>
                  ) : (
                    <>
                      Request Free Consultation
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
