"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Code, ShieldCheck, Tag, BarChart2, Radio } from "lucide-react";

export default function AdminScriptsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    enabled: true,
    gtmId: "",
    gaMeasurementId: "",
    metaPixelId: "",
    linkedinPartnerId: "",
    customHeadScripts: "",
    customBodyScripts: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchScripts();
    }
  }, [router]);

  const fetchScripts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content/scripts");
      if (res.ok) {
        const data = await res.json();
        setFormData({
          enabled: data.enabled ?? true,
          gtmId: data.gtmId || "",
          gaMeasurementId: data.gaMeasurementId || "",
          metaPixelId: data.metaPixelId || "",
          linkedinPartnerId: data.linkedinPartnerId || "",
          customHeadScripts: data.customHeadScripts || "",
          customBodyScripts: data.customBodyScripts || "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to load script settings.", type: "error" });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/content/scripts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ text: "Tracking scripts updated successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to update scripts.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error saving script settings.", type: "error" });
    }

    setSaving(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-5xl pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-cyan-400" /> SEO & Marketing Tracking Scripts
          </h1>
          <p className="text-slate-400 mt-1">
            Manage Google Tag Manager, GA4, Meta Pixel, and custom tracking codes dynamically.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save All Scripts
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-xl border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          {/* Global Toggle */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Enable Global Script Tracking</h3>
                <p className="text-xs text-slate-400">
                  Master switch to inject all GTM, GA4, Meta Pixel, and custom scripts on the public website.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Core Tracking IDs */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-cyan-400" /> Standard Marketing & Analytics IDs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GTM */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyan-400" /> Google Tag Manager Container ID
                </label>
                <input
                  type="text"
                  value={formData.gtmId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gtmId: e.target.value.trim() }))}
                  placeholder="GTM-XXXXXXX"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500">Auto-injects official GTM script in &lt;head&gt; and &lt;noscript&gt; in &lt;body&gt;.</p>
              </div>

              {/* GA4 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-emerald-400" /> Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={formData.gaMeasurementId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gaMeasurementId: e.target.value.trim() }))}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500">Auto-injects Google gtag.js for GA4 tracking.</p>
              </div>

              {/* Meta Pixel */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Radio className="w-4 h-4 text-blue-400" /> Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  value={formData.metaPixelId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, metaPixelId: e.target.value.trim() }))}
                  placeholder="967268962583650"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500">Auto-injects Meta Pixel tracking script and PageView event.</p>
              </div>

              {/* LinkedIn Partner ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-400" /> LinkedIn Insight Tag Partner ID
                </label>
                <input
                  type="text"
                  value={formData.linkedinPartnerId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, linkedinPartnerId: e.target.value.trim() }))}
                  placeholder="9941372"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500">Auto-injects LinkedIn Insight Tag snippet.</p>
              </div>
            </div>
          </div>

          {/* Custom Head Scripts */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-fuchsia-400" /> Custom Head Scripts (&lt;head&gt;)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Paste any custom HTML, &lt;script&gt;, &lt;meta&gt;, or Schema markup JSON-LD tags to inject into the &lt;head&gt; of every page.
              </p>
            </div>
            <textarea
              rows={6}
              value={formData.customHeadScripts}
              onChange={(e) => setFormData((prev) => ({ ...prev, customHeadScripts: e.target.value }))}
              placeholder={`<!-- Example: Hotjar, Clarity, or Custom Meta Tags -->\n<script>\n  console.log('Custom head script active');\n</script>`}
              className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white font-mono text-xs placeholder:text-slate-700 focus:border-fuchsia-500/50 outline-none transition-colors leading-relaxed"
            ></textarea>
          </div>

          {/* Custom Body Scripts */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" /> Custom Body / Footer Scripts (&lt;body&gt;)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Paste any custom &lt;noscript&gt; fallback tags, live chat widgets (WhatsApp / Intercom), or conversion scripts to inject inside &lt;body&gt;.
              </p>
            </div>
            <textarea
              rows={6}
              value={formData.customBodyScripts}
              onChange={(e) => setFormData((prev) => ({ ...prev, customBodyScripts: e.target.value }))}
              placeholder={`<!-- Example: Chat Widget or Fallback Pixels -->\n<script>\n  // Custom body script\n</script>`}
              className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white font-mono text-xs placeholder:text-slate-700 focus:border-amber-500/50 outline-none transition-colors leading-relaxed"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
