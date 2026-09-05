"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminHeroPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    heroTitleLine1: "WHO ARE",
    heroTitleLine2: "WE?",
    heroDescription: "We specialize exclusively in Meta Ads management for high-spending brands. While you handle your own creatives, we bring laser-focused expertise on strategy, ad management, and scaling. <strong>Our strength is turning big budgets into big returns.</strong>"
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
      const res = await fetch('/api/content/hero');
      const data = await res.json();
      if (res.ok && data) {
        setFormData({
          heroTitleLine1: data.heroTitleLine1 || "WHO ARE",
          heroTitleLine2: data.heroTitleLine2 || "WE?",
          heroDescription: data.heroDescription || ""
        });
      }
    } catch (error) {
      console.warn("Error fetching hero content:", error);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    
    try {
      const res = await fetch('/api/content/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setMessage({ text: "Hero section updated successfully!", type: "success" });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMessage({ text: errorData.message || "Failed to update content.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred while saving.", type: "error" });
    }
    setSaving(false);
  };

  // Custom Quill Toolbar configuration (No colors, to enforce site theme)
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean'] // remove formatting button
    ]
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white">Hero Section</h1>
        <p className="text-slate-400">Manage the main banner content of your homepage.</p>
      </div>

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            
            {message.text && (
              <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Title Line 1</label>
                <input
                  type="text"
                  required
                  value={formData.heroTitleLine1}
                  onChange={(e) => setFormData({...formData, heroTitleLine1: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  placeholder="e.g. WHO ARE"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Title Line 2</label>
                <input
                  type="text"
                  required
                  value={formData.heroTitleLine2}
                  onChange={(e) => setFormData({...formData, heroTitleLine2: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  placeholder="e.g. WE?"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Description (Rich Text)</label>
              <div className="bg-[#020617] rounded-xl overflow-hidden border border-white/10 [&_.ql-toolbar]:bg-white/5 [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:border-white/10 [&_.ql-container]:rounded-b-xl [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-white [&_.ql-stroke]:stroke-slate-300 [&_.ql-fill]:fill-slate-300 [&_.ql-picker-label]:text-slate-300">
                <ReactQuill 
                  theme="snow" 
                  value={formData.heroDescription} 
                  onChange={(content) => setFormData({...formData, heroDescription: content})}
                  modules={modules}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Colors are disabled to ensure the text matches the website's dark aesthetic. Use bolding to highlight important keywords.
              </p>
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
