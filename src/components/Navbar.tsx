"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ChevronRight, X, Menu, Send, Loader2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openContactModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 group-hover:scale-105 transition-transform">
              <img src="/dviora-logo.png" alt="Dviora Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold font-outfit tracking-wide text-white">
              Dviora
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[14px] font-medium text-gray-300">
            <Link href="/#work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="/#why-we-started" className="hover:text-white transition-colors">
              Why We Started
            </Link>
            <Link href="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            {/* <Link href="/#industries" className="hover:text-white transition-colors">
              Industries
            </Link> */}
            <Link href="/#process" className="hover:text-white transition-colors">
              Process
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* CTA */}
            <button
              onClick={openContactModal}
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
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
              href="/#work"
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Work
            </Link>
            <Link
              href="/#why-we-started"
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Why We Started
            </Link>
            <Link
              href="/#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Services
            </Link>
            {/* <Link
              href="/#industries"
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Industries
            </Link> */}
            <Link
              href="/#process"
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#c5a059] transition-colors font-outfit"
            >
              Process
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                openContactModal();
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
    </>
  );
}
