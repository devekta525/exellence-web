import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Share2, Send, Globe, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-full border border-[var(--color-accent-start)] flex items-center justify-center text-[var(--color-accent-start)] font-bold">
                E
              </div>
              <span className="text-2xl font-bold font-outfit">
                Excellence
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-medium mb-4">
              Digital Marketing Excellence
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
                <p className="font-semibold">New Delhi, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-semibold">hi@excellence.agency</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00cc66]/20 text-[#00cc66] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="font-semibold">+91-90972 90982</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="lg:text-right">
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <div className="flex items-center lg:justify-end gap-3">
              <Link href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Star className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 <strong className="text-white">Excellence</strong>. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <p>
            Made with <span className="text-red-500">♥</span> by Excellence Team
          </p>
        </div>
      </div>
    </footer>
  );
}
