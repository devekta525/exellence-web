"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, Pencil, ArrowLeft, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminWorkPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [message, setMessage]   = useState({ text: "", type: "" });
  const [formData, setFormData] = useState<any>({ items: [] });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate currently visible items based on pagination
  const currentItems = formData.items ? formData.items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) { router.replace("/admin/login"); }
    else       { setIsAuthorized(true); fetchContent(); }
  }, [router]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/content/work");
      const data = await res.json();
      if (res.ok && data?.items) {
        setFormData(data);
      }
    } catch (err) { console.warn(err); }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true); setMessage({ text: "", type: "" });
    try {
      const res = await fetch("/api/content/work", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setMessage({ text: "Case studies updated successfully!", type: "success" });
      else setMessage({ text: "Failed to save.", type: "error" });
    } catch { setMessage({ text: "Error saving.", type: "error" }); }
    setSaving(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const updateItem = (key: string, val: any) => {
    if (editingIndex === null) return;
    const next = [...formData.items];
    next[editingIndex] = { ...next[editingIndex], [key]: val };
    setFormData({ ...formData, items: next });
  };

  const updateDetail = (key: string, val: any) => {
    if (editingIndex === null) return;
    const next = [...formData.items];
    const details = { ...(next[editingIndex].details || {}) };
    details[key] = val;
    next[editingIndex] = { ...next[editingIndex], details };
    setFormData({ ...formData, items: next });
  };

  const updateStat = (si: number, key: string, val: string) => {
    if (editingIndex === null) return;
    const next = [...formData.items];
    const stats = [...(next[editingIndex].stats || [])];
    stats[si] = { ...stats[si], [key]: val };
    next[editingIndex] = { ...next[editingIndex], stats };
    setFormData({ ...formData, items: next });
  };

  const addStat = () => {
    if (editingIndex === null) return;
    const n = [...formData.items];
    n[editingIndex] = { ...n[editingIndex], stats: [...(n[editingIndex].stats||[]), { label: "", value: "" }] };
    setFormData({ ...formData, items: n });
  };
  const removeStat = (si: number) => {
    if (editingIndex === null) return;
    const n = [...formData.items];
    n[editingIndex].stats = n[editingIndex].stats.filter((_: any, i: number) => i !== si);
    setFormData({ ...formData, items: n });
  };
  const addItem = () => {
    const newItem = { id: String(Date.now()), slug: "new-case-study", title: "", body: "", category: "", image: "", stats: [{ label: "", value: "" }], details: {} };
    setFormData({ ...formData, items: [...formData.items, newItem] });
    setEditingIndex(formData.items.length);
  };
  const removeItem = (i: number) => setFormData({ ...formData, items: formData.items.filter((_: any, idx: number) => idx !== i) });

  if (!isAuthorized) return null;

  const currentItem = editingIndex !== null ? formData.items[editingIndex] : null;
  const d = currentItem?.details || {};
  const isShoe = currentItem?.slug === "shoe-brand-scale";
  const isSport = currentItem?.slug === "sportswear-roas-optimization";
  const isAir = currentItem?.slug === "air-purifier-revenue";
  const isSneaker = currentItem?.slug === "sneaker-brand-growth";

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Case Studies Section</h1>
          <p className="text-slate-400 mt-1">Manage the case study cards and their detailed inner pages.</p>
        </div>
        {editingIndex === null && (
          <button onClick={handleSave} disabled={saving} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save All Changes
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl border ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : editingIndex === null ? (
          // LIST VIEW
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">All Case Studies ({formData.items.length})</h3>
              <button onClick={addItem} className="flex items-center gap-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Add Case Study
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 text-slate-300 font-medium border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentItems.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-20 text-slate-500">No case studies found.</td></tr>
                  ) : (
                    currentItems.map((item: any, i: number) => {
                      // Calculate the absolute index for editing the correct item
                      const absoluteIndex = (currentPage - 1) * itemsPerPage + i;
                      return (
                      <tr key={item.id || absoluteIndex} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-slate-800 shrink-0">
                              {item.image ? <img src={item.image} alt="Cover" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-500 m-2.5" />}
                            </div>
                            <div>
                              <span className="font-medium text-white max-w-[200px] truncate block" title={item.title || "Untitled"}>{item.title || "Untitled"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{item.category || "-"}</td>
                        <td className="px-6 py-4 text-slate-400">{item.slug}</td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button onClick={() => setEditingIndex(absoluteIndex)} className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => removeItem(absoluteIndex)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    )})
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {formData.items && formData.items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
                <p className="text-slate-400 text-sm">
                  Page {currentPage} of {Math.max(1, Math.ceil(formData.items.length / itemsPerPage))}
                </p>
                <div className="flex gap-2">
                  <button 
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    disabled={currentPage >= Math.ceil(formData.items.length / itemsPerPage)}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // EDIT VIEW
          <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button onClick={() => setEditingIndex(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to List
              </button>
              <h3 className="text-lg font-bold text-white">Edit Case Study</h3>
            </div>

            {/* Basic Info */}
            <div className="space-y-6 border border-white/10 p-6 rounded-2xl bg-white/[0.02]">
              <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm border-b border-white/10 pb-2">1. Card Basics (Homepage)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400 uppercase">Title</label>
                  <input type="text" value={currentItem.title} onChange={(e) => updateItem("title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" /></div>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400 uppercase">Category</label>
                  <input type="text" value={currentItem.category} onChange={(e) => updateItem("category", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" /></div>
              </div>
              <div className="space-y-2"><label className="text-xs font-medium text-slate-400 uppercase">Description (Card)</label>
                <textarea rows={3} value={currentItem.body} onChange={(e) => updateItem("body", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white resize-none" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400 uppercase">Image URL</label>
                  <input type="text" value={currentItem.image} onChange={(e) => updateItem("image", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" /></div>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400 uppercase">URL Slug (Must match website layout)</label>
                  <input type="text" value={currentItem.slug} onChange={(e) => updateItem("slug", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" /></div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-400 uppercase">Stats (Badges)</label>
                  <button type="button" onClick={addStat} className="text-xs bg-white/5 border border-white/10 text-cyan-400 px-3 py-1.5 rounded-lg">Add Stat</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentItem.stats?.map((stat: any, si: number) => (
                    <div key={si} className="flex gap-2 p-3 bg-[#020617] border border-white/10 rounded-xl">
                      <input placeholder="Value" value={stat.value} onChange={(e) => updateStat(si, "value", e.target.value)} className="w-1/3 bg-transparent border-b border-white/10 text-sm text-white" />
                      <input placeholder="Label" value={stat.label} onChange={(e) => updateStat(si, "label", e.target.value)} className="w-full bg-transparent border-b border-white/10 text-xs text-slate-400" />
                      <button type="button" onClick={() => removeStat(si)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inner Page Details (Specific to each layout) */}
            <div className="space-y-6 border border-fuchsia-500/20 p-6 rounded-2xl bg-fuchsia-500/[0.02]">
              <div className="border-b border-fuchsia-500/20 pb-2 mb-4">
                <h4 className="text-fuchsia-400 font-bold uppercase tracking-wider text-sm">2. Inner Page Details</h4>
                <p className="text-xs text-slate-400 mt-1">These fields control the specific custom UI blocks for this case study page.</p>
              </div>

              {/* SHARED FIELDS */}
              {(!isShoe && !isSport && !isAir && !isSneaker) && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-fuchsia-400 uppercase">Notice</label>
                  <p className="text-sm text-slate-300">You are creating a new case study. It will use the default layout.</p>
                </div>
              )}
              
              {isSport && (
                <div className="space-y-2"><label className="text-xs font-bold text-fuchsia-400 uppercase">Main Large Heading</label>
                  <textarea rows={2} value={d.main_heading || ""} onChange={(e) => updateDetail("main_heading", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" placeholder="Turning around a struggling sportswear brand..." /></div>
              )}
              
              {isAir && (
                <div className="space-y-2"><label className="text-xs font-bold text-fuchsia-400 uppercase">Main Large Heading</label>
                  <textarea rows={2} value={d.main_heading || ""} onChange={(e) => updateDetail("main_heading", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" placeholder="11.58x ROAS and ₹1.56 Crore..." /></div>
              )}
              
              {isSneaker && (
                <div className="space-y-2"><label className="text-xs font-bold text-fuchsia-400 uppercase">Main Large Heading</label>
                  <textarea rows={2} value={d.main_heading || ""} onChange={(e) => updateDetail("main_heading", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-sm text-white" placeholder="₹9.47 Crore in revenue..." /></div>
              )}

              <div className="space-y-4">
                <h5 className="font-bold text-white border-b border-white/5 pb-1">Section 1: The Challenge / Situation</h5>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400">Title</label>
                  <input type="text" value={d.s1_title || ""} onChange={(e) => updateDetail("s1_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-4 text-sm text-white" placeholder="The Challenge" /></div>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400">Text Content</label>
                  <textarea rows={3} value={d.s1_text || ""} onChange={(e) => updateDetail("s1_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-4 text-sm text-white" /></div>
              </div>

              {/* SPECIFIC FIELDS */}
              {isShoe && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h5 className="font-bold text-white border-b border-white/5 pb-1">Section 2: The Approach (4 Boxes)</h5>
                  <div className="space-y-2"><label className="text-xs font-medium text-slate-400">Section Title</label>
                    <input type="text" value={d.sec2_title || ""} onChange={(e) => updateDetail("sec2_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-4 text-sm text-white" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input type="text" value={d.sec2_b1_title || ""} onChange={(e) => updateDetail("sec2_b1_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-t-lg py-1 px-3 text-xs text-white" placeholder="Box 1 Title" />
                      <textarea value={d.sec2_b1_text || ""} onChange={(e) => updateDetail("sec2_b1_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 border-t-0 rounded-b-lg py-1 px-3 text-xs text-white" rows={2} />
                    </div>
                    <div>
                      <input type="text" value={d.sec2_b2_title || ""} onChange={(e) => updateDetail("sec2_b2_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-t-lg py-1 px-3 text-xs text-white" placeholder="Box 2 Title" />
                      <textarea value={d.sec2_b2_text || ""} onChange={(e) => updateDetail("sec2_b2_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 border-t-0 rounded-b-lg py-1 px-3 text-xs text-white" rows={2} />
                    </div>
                    <div>
                      <input type="text" value={d.sec2_b3_title || ""} onChange={(e) => updateDetail("sec2_b3_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-t-lg py-1 px-3 text-xs text-white" placeholder="Box 3 Title" />
                      <textarea value={d.sec2_b3_text || ""} onChange={(e) => updateDetail("sec2_b3_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 border-t-0 rounded-b-lg py-1 px-3 text-xs text-white" rows={2} />
                    </div>
                    <div>
                      <input type="text" value={d.sec2_b4_title || ""} onChange={(e) => updateDetail("sec2_b4_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-t-lg py-1 px-3 text-xs text-white" placeholder="Box 4 Title" />
                      <textarea value={d.sec2_b4_text || ""} onChange={(e) => updateDetail("sec2_b4_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 border-t-0 rounded-b-lg py-1 px-3 text-xs text-white" rows={2} />
                    </div>
                  </div>
                </div>
              )}

              {isSport && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h5 className="font-bold text-white border-b border-white/5 pb-1">Section 2: Account Journey Timeline</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {[1,2,3,4,5,6].map(m => (
                      <div key={m} className="p-3 border border-white/10 rounded-lg bg-black/20 space-y-2">
                        <div className="flex gap-2">
                          <input type="text" value={d[`j_m${m}_date`] || ""} onChange={(e) => updateDetail(`j_m${m}_date`, e.target.value)} className="w-1/2 bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Month Date" />
                          <input type="text" value={d[`j_m${m}_roas`] || ""} onChange={(e) => updateDetail(`j_m${m}_roas`, e.target.value)} className="w-1/2 bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="ROAS value" />
                        </div>
                        <input type="text" value={d[`j_m${m}_title`] || ""} onChange={(e) => updateDetail(`j_m${m}_title`, e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Timeline title" />
                        <input type="text" value={d[`j_m${m}_desc`] || ""} onChange={(e) => updateDetail(`j_m${m}_desc`, e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Stats string" />
                      </div>
                    ))}
                  </div>
                  
                  <h5 className="font-bold text-white border-b border-white/5 pb-1 pt-4">Before Vs After</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-rose-400 font-bold">BEFORE</p>
                      <input type="text" value={d.ba_before_title || ""} onChange={(e) => updateDetail("ba_before_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Before Title" />
                      <input type="text" value={d.ba_b_roas || ""} onChange={(e) => updateDetail("ba_b_roas", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="ROAS" />
                      <input type="text" value={d.ba_b_pur || ""} onChange={(e) => updateDetail("ba_b_pur", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Purchases" />
                      <input type="text" value={d.ba_b_cpm || ""} onChange={(e) => updateDetail("ba_b_cpm", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="CPM" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-green-400 font-bold">AFTER</p>
                      <input type="text" value={d.ba_after_title || ""} onChange={(e) => updateDetail("ba_after_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="After Title" />
                      <input type="text" value={d.ba_a_roas || ""} onChange={(e) => updateDetail("ba_a_roas", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="ROAS" />
                      <input type="text" value={d.ba_a_pur || ""} onChange={(e) => updateDetail("ba_a_pur", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Purchases" />
                      <input type="text" value={d.ba_a_cpm || ""} onChange={(e) => updateDetail("ba_a_cpm", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="CPM" />
                    </div>
                  </div>
                </div>
              )}

              {isAir && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h5 className="font-bold text-white border-b border-white/5 pb-1">Section 3: ROAS Progression (Progress Bars)</h5>
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(m => (
                      <div key={m} className="flex gap-2">
                        <input type="text" value={d[`rp_m${m}_l`] || ""} onChange={(e) => updateDetail(`rp_m${m}_l`, e.target.value)} className="w-1/3 bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Month Name" />
                        <input type="text" value={d[`rp_m${m}_w`] || ""} onChange={(e) => updateDetail(`rp_m${m}_w`, e.target.value)} className="w-1/4 bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Width (e.g. 50%)" />
                        <input type="text" value={d[`rp_m${m}_v`] || ""} onChange={(e) => updateDetail(`rp_m${m}_v`, e.target.value)} className="w-1/3 bg-[#020617] border border-white/10 rounded px-2 py-1 text-xs text-white" placeholder="Value (e.g. 5x)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h5 className="font-bold text-white border-b border-white/5 pb-1">Final Section: The Takeaway</h5>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400">Title</label>
                  <input type="text" value={d.s5_title || ""} onChange={(e) => updateDetail("s5_title", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-4 text-sm text-white" placeholder="The Takeaway" /></div>
                <div className="space-y-2"><label className="text-xs font-medium text-slate-400">Quote / Takeaway Text</label>
                  <textarea rows={3} value={d.s5_text || ""} onChange={(e) => updateDetail("s5_text", e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-4 text-sm text-white" /></div>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setEditingIndex(null)} className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors shadow-xl">
                Done & Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
