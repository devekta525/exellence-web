"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const AVAILABLE_ICONS = [
  { value: "Map",        label: "Map (Understanding)" },
  { value: "FileText",   label: "FileText (Strategy)" },
  { value: "Camera",     label: "Camera (Content)" },
  { value: "Scissors",   label: "Scissors (Editing)" },
  { value: "Zap",        label: "Zap (Testing)" },
  { value: "TrendingUp", label: "TrendingUp (Learning)" },
];

const DEFAULT_STEPS = [
  { id: 1, title: "Understanding The Business", iconName: "Map",        desc: "", checks: [""] },
  { id: 2, title: "Crafting Your Strategy",     iconName: "FileText",   desc: "", checks: [""] },
  { id: 3, title: "Capturing The Content",      iconName: "Camera",     desc: "", checks: [""] },
  { id: 4, title: "Editing & Distribution",     iconName: "Scissors",   desc: "", checks: [""] },
  { id: 5, title: "Testing & Scaling",          iconName: "Zap",        desc: "", checks: [""] },
  { id: 6, title: "Learning & Evolving",        iconName: "TrendingUp", desc: "", checks: [""] },
];

export default function AdminProcessPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [message, setMessage]   = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    title:         "Our",
    titleGradient: "Process",
    subtitle:      "A performance-focused Meta Ads framework built to scale profitable growth systematically.",
    items:         DEFAULT_STEPS,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) { router.replace("/admin/login"); }
    else       { setIsAuthorized(true); fetchContent(); }
  }, [router]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/content/process");
      const data = await res.json();
      if (res.ok && data) {
        if (data.items) {
          data.items = data.items.map((item: any) => ({
            ...item,
            iconName: item.iconName ?? "Map",
            checks:   item.checks  ?? item.features ?? [""],
          }));
        }
        setFormData((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn("Error fetching process content:", err);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch("/api/content/process", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage({ text: "Process section updated successfully!", type: "success" });
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage({ text: err.message || "Failed to update.", type: "error" });
      }
    } catch {
      setMessage({ text: "An error occurred while saving.", type: "error" });
    }
    setSaving(false);
  };

  const updateStep = (i: number, key: string, val: any) => {
    const next = [...formData.items];
    next[i] = { ...next[i], [key]: val };
    setFormData({ ...formData, items: next });
  };

  const updateCheck = (si: number, ci: number, val: string) => {
    const next  = [...formData.items];
    const chks  = [...next[si].checks];
    chks[ci]    = val;
    next[si]    = { ...next[si], checks: chks };
    setFormData({ ...formData, items: next });
  };

  const addCheck  = (si: number) => {
    const next = [...formData.items];
    next[si] = { ...next[si], checks: [...next[si].checks, ""] };
    setFormData({ ...formData, items: next });
  };

  const removeCheck = (si: number, ci: number) => {
    const next = [...formData.items];
    next[si].checks = next[si].checks.filter((_: any, i: number) => i !== ci);
    setFormData({ ...formData, items: next });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), title: "", iconName: "Map", desc: "", checks: [""] }],
    });
  };

  const removeStep = (i: number) => {
    setFormData({ ...formData, items: formData.items.filter((_: any, idx: number) => idx !== i) });
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white">Process Section</h1>
        <p className="text-slate-400">Manage the step-by-step process displayed on the homepage.</p>
      </div>

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            {message.text && (
              <div className={`p-4 rounded-xl border ${message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Section Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (White)</label>
                  <input type="text" required value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (Gradient)</label>
                  <input type="text" required value={formData.titleGradient}
                    onChange={(e) => setFormData({ ...formData, titleGradient: e.target.value })}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Subtitle</label>
                <textarea required rows={2} value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-bold text-white">Process Steps</h3>
                <button type="button" onClick={addStep}
                  className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
                  <Plus className="w-4 h-4" /> Add Step
                </button>
              </div>

              {formData.items.map((step: any, si: number) => (
                <div key={si} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-bold text-white">Step {si + 1}</h4>
                    <button type="button" onClick={() => removeStep(si)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Step Title</label>
                      <input type="text" required value={step.title}
                        onChange={(e) => updateStep(si, "title", e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Icon</label>
                      <select value={step.iconName}
                        onChange={(e) => updateStep(si, "iconName", e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white">
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic.value} value={ic.value}>{ic.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">Description</label>
                    <textarea required rows={3} value={step.desc}
                      onChange={(e) => updateStep(si, "desc", e.target.value)}
                      className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white resize-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">Checklist Items</label>
                    {step.checks?.map((chk: string, ci: number) => (
                      <div key={ci} className="flex gap-2">
                        <input type="text" required value={chk}
                          onChange={(e) => updateCheck(si, ci, e.target.value)}
                          className="flex-1 bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white" />
                        <button type="button" onClick={() => removeCheck(si, ci)}
                          className="p-2 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addCheck(si)}
                      className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2">
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
