import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Share2, Send, Globe, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 pt-12 md:pt-16 pb-10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-10 md:mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <img src="/dviora-logo.png" alt="Dviora Logo" className="w-20 h-20 object-contain group-hover:scale-105 transition-transform" />
              <span className="text-2xl font-bold font-outfit">
                Dviora
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-medium mb-4">
              Digital Marketing Dviora
            </p>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Driving growth through innovative marketing strategies and cutting-edge digital solutions for modern businesses.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#cc33ff]/20 text-[#cc33ff] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="font-semibold">Pune, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-semibold">dvioralabs@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 <strong className="text-white">Dviora</strong>. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p>
            Made with <span className="text-red-500">♥</span> by Dviora Team
          </p>
        </div>
      </div>
    </footer>
  );
}
