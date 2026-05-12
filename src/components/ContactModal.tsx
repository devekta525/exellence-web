"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Loader2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useModal();
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
        closeContactModal();
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
    if (isContactModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isContactModalOpen]);

  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeContactModal}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md lg:max-w-xl bg-[#0c1a3d] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
        <button
          onClick={closeContactModal}
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
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-xl animate-border-slide"></div>
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
  );
}
