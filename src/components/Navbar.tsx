"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ChevronRight, X, Menu, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    revenue: "Beginner (0-1 Lakh)",
    message: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          name: "",
          phone: "",
          website: "",
          revenue: "Beginner (0-1 Lakh)",
          message: "",
        });
        setIsModalOpen(false);
        router.push("/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="50" cy="50" r="46" stroke="#c5a059" strokeWidth="4" />
                <line x1="4" y1="50" x2="96" y2="50" stroke="#c5a059" strokeWidth="4" />
                <line x1="35" y1="17" x2="35" y2="83" stroke="#c5a059" strokeWidth="4" />
                <line x1="65" y1="17" x2="65" y2="83" stroke="#c5a059" strokeWidth="4" />
              </svg>
            </div>
            <span className="text-xl font-bold font-outfit tracking-wide text-white">
              Dviora
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-300">
            <Link href="#home" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#process" className="hover:text-white transition-colors">
              Process
            </Link>
            <Link href="#resources" className="hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="#careers" className="hover:text-white transition-colors relative">
              Careers
              <span className="absolute -top-3.5 -right-9 bg-[#1a4fff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(26,79,255,0.6)]">
                Hiring!
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* CTA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative hidden sm:flex items-center px-6 py-2.5 rounded-full text-sm font-medium overflow-hidden"
            >
              {/* Gradient Border Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-full animate-border-slide"></div>
              {/* Inner Black Button */}
              <div className="absolute inset-[1.5px] bg-[#020617] rounded-full group-hover:bg-[#0c1a3d] transition-colors duration-300"></div>

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2 text-white">
                Book a call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#020617]/98 backdrop-blur-2xl"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 p-2 text-white/60 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Menu Links */}
        <div className="relative h-full flex flex-col justify-center items-center px-6">
          <div className={`flex flex-col gap-8 text-center transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
            <Link
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Home
            </Link>
            <Link
              href="#process"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Process
            </Link>
            <Link
              href="#resources"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Resources
            </Link>
            <Link
              href="#careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit relative inline-block"
            >
              Careers
              <span className="absolute -top-4 -right-10 bg-[#1a4fff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Hiring!
              </span>
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="mt-8 group relative flex items-center px-10 py-4 rounded-full text-lg font-bold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-full"></div>
              <div className="absolute inset-[2px] bg-[#020617] rounded-full group-hover:bg-[#0c1a3d] transition-colors duration-300"></div>
              <span className="relative z-10 flex items-center gap-3 text-white">
                Book a call
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Social / Footer Links in Menu */}
          <div className={`absolute bottom-12 left-0 right-0 flex justify-center gap-6 transition-all duration-700 delay-300 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-white/40 text-sm">© 2026 Dviora Agency</span>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md lg:max-w-xl bg-[#0c1a3d] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold text-white mb-2 font-outfit">Get in Touch</h2>
            <p className="text-gray-400 text-[14px] mb-8">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all focus:bg-white/[0.08]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all focus:bg-white/[0.08]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Website Link <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all focus:bg-white/[0.08]"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Monthly Revenue <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <select
                    required
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer focus:bg-white/[0.08]"
                  >
                    <option className="bg-[#0c1a3d]" value="Beginner (0-1 Lakh)">Beginner (0-1 Lakh)</option>
                    <option className="bg-[#0c1a3d]" value="Intermediate (1 Lakh - 5 Lakh)">Intermediate (1 Lakh - 5 Lakh)</option>
                    <option className="bg-[#0c1a3d]" value="Growth (5 Lakh +)">Growth (5 Lakh +)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within:text-cyan-500 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                  Your Message <span className="text-gray-600 font-normal italic">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none focus:bg-white/[0.08]"
                  placeholder="Tell us about your goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold overflow-hidden transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                {/* Gradient Border Background (Matching Book a call) */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-xl animate-border-slide"></div>
                {/* Inner Background (Matching Book a call) */}
                <div className="absolute inset-[1.5px] bg-[#0c1a3d] rounded-[10px] group-hover:bg-[#162a5a] transition-colors duration-300"></div>

                <span className="relative z-10 flex items-center gap-3 text-white">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
