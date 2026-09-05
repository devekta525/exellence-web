"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminWhyWeStartedPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    titleLine1: "Why We",
    titleLine2: "Started",
    paragraph1: "We noticed a common pattern across growing D2C brands — companies spending ₹5L, ₹10L, or even more every month on Meta Ads were still struggling to scale profitably.",
    paragraph2: "Not because the product was weak.\nNot because the brand lacked potential.",
    paragraph3: "But because their ad accounts were being handled by under-skilled freelancers, generic agencies, or media buyers without deep performance expertise.",
    box1Title: "As a result, brands get stuck questioning:",
    box1ListItems: [
      "Why is ROAS unstable?",
      "Why is scaling breaking performance?",
      "Where is the ad spend leaking?",
      "Why are campaigns not converting despite high budgets?"
    ],
    box2Title: "That’s the gap we built Dviora to solve.",
    box2Subtitle: "We don’t operate like a traditional agency.",
    box2Highlight: "We work as an extension of your internal growth team — bringing strategic thinking, data-driven decision making, advanced media buying execution, and performance-focused scaling systems to your Meta Ads ecosystem.",
    box2Footer: "Our focus is simple: Build profitable, scalable, and sustainable growth through expert Meta Ads management."
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchContent();
    }
  }, [router]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/why-we-started');
      const data = await res.json();
      if (res.ok && data) {
        setFormData((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.warn("Error fetching content:", error);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    
    try {
      const res = await fetch('/api/content/why-we-started', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setMessage({ text: "Section updated successfully!", type: "success" });
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage({ text: err.message || "Failed to update content.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred while saving.", type: "error" });
    }
    setSaving(false);
  };

  const updateListItem = (index: number, value: string) => {
    const newList = [...formData.box1ListItems];
    newList[index] = value;
    setFormData({ ...formData, box1ListItems: newList });
  };

  const removeListItem = (index: number) => {
    const newList = formData.box1ListItems.filter((_, i) => i !== index);
    setFormData({ ...formData, box1ListItems: newList });
  };

  const addListItem = () => {
    setFormData({ ...formData, box1ListItems: [...formData.box1ListItems, ""] });
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white">Why We Started Section</h1>
        <p className="text-slate-400">Manage the content for the "Why We Started" page while perfectly preserving its complex design.</p>
      </div>

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            
            {message.text && (
              <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {message.text}
              </div>
            )}

            {/* Title */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Main Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title Line 1 (White)</label>
                  <input
                    type="text"
                    required
                    value={formData.titleLine1}
                    onChange={(e) => setFormData({...formData, titleLine1: e.target.value})}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    required
                    value={formData.titleLine2}
                    onChange={(e) => setFormData({...formData, titleLine2: e.target.value})}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Introduction Paragraphs */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Introduction Paragraphs</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Paragraph 1</label>
                <textarea
                  required
                  rows={2}
                  value={formData.paragraph1}
                  onChange={(e) => setFormData({...formData, paragraph1: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Paragraph 2 (Use Enter for line breaks)</label>
                <textarea
                  required
                  rows={2}
                  value={formData.paragraph2}
                  onChange={(e) => setFormData({...formData, paragraph2: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Paragraph 3</label>
                <textarea
                  required
                  rows={2}
                  value={formData.paragraph3}
                  onChange={(e) => setFormData({...formData, paragraph3: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>
            </div>

            {/* Box 1 (List) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Questions List Box</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Box Title</label>
                <input
                  type="text"
                  required
                  value={formData.box1Title}
                  onChange={(e) => setFormData({...formData, box1Title: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Questions (List Items)</label>
                {formData.box1ListItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-rose-500 font-bold mt-1 text-xl">×</span>
                    <input
                      type="text"
                      required
                      value={item}
                      onChange={(e) => updateListItem(index, e.target.value)}
                      className="flex-1 bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                    />
                    <button type="button" onClick={() => removeListItem(index)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addListItem} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mt-2">
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
            </div>

            {/* Box 2 (Gradient Highlights) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Bottom Highlight Box</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Large Headline</label>
                <input
                  type="text"
                  required
                  value={formData.box2Title}
                  onChange={(e) => setFormData({...formData, box2Title: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData.box2Subtitle}
                  onChange={(e) => setFormData({...formData, box2Subtitle: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Highlighted Blockquote</label>
                <textarea
                  required
                  rows={3}
                  value={formData.box2Highlight}
                  onChange={(e) => setFormData({...formData, box2Highlight: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Footer Text</label>
                <textarea
                  required
                  rows={2}
                  value={formData.box2Footer}
                  onChange={(e) => setFormData({...formData, box2Footer: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
