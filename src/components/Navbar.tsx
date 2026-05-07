"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ChevronRight, X, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              Excellence
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
            <span className="text-white/40 text-sm">© 2026 Excellence Agency</span>
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
          <div className="relative w-full max-w-md bg-[#0c1a3d] border border-white/10 rounded-[20px] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-gray-400 text-[15px] mb-8">
              Choose your preferred way to contact us
            </p>

            <div className="space-y-4">
              {/* Email Button */}
              <a
                href="mailto:hello@excellence.agency"
                className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-[#9327e9] to-[#eb1675] hover:opacity-90 transition-opacity text-white font-medium shadow-lg shadow-fuchsia-500/20"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg">Email Us</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-80" />
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-4 rounded-xl bg-[#0ab363] hover:bg-[#09a058] transition-colors text-white font-medium shadow-lg shadow-emerald-500/20"
              >
                <div className="flex items-center gap-3">
                  {/* WhatsApp SVG Icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span className="text-lg">WhatsApp</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
