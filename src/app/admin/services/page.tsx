"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, Pencil, ChevronLeft, ChevronRight } from "lucide-react";

const AVAILABLE_ICONS = [
  { value: "BarChart2", label: "📊 BarChart2 (Ads/Performance)" },
  { value: "Megaphone", label: "📢 Megaphone (Social Media)" },
  { value: "Globe", label: "🌐 Globe (Website)" },
  { value: "Zap", label: "⚡ Zap" },
  { value: "TrendingUp", label: "📈 TrendingUp" },
  { value: "Share2", label: "↗ Share2" },
  { value: "Palette", label: "🎨 Palette" },
  { value: "Layout", label: "🖥 Layout" },
  { value: "MessageSquare", label: "💬 MessageSquare" },
];

// Map old icon names to new ones
const ICON_MIGRATION: Record<string, string> = {
  Zap: "BarChart2",
  Share2: "Megaphone",
  Palette: "Globe",
};

// Map old color classes to correct new ones (keyed by service id)
const COLOR_MIGRATION: Record<string, string> = {
  performance: "from-cyan-500 to-blue-600",
  social:      "from-[#c20ee7] to-purple-900",
  website:     "from-orange-500 to-red-600",
};

export default function AdminServicesPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    title: "Our",
    titleGradient: "Services",
    subtitle: "Specialized solutions meticulously crafted to scale your brand to new heights.",
    items: [
      {
        id: "performance",
        title: "Meta Ads Management",
        description: "We work with brands that already have in-house creatives and content production. Our focus is purely on media buying, campaign scaling, funnel optimization, and maximizing ROAS through advanced Meta Ads execution.",
        iconName: "BarChart2",
        color: "from-cyan-500 to-blue-600",
        features: [
          "High-Spend Meta Ads Scaling",
          "Advanced Campaign Structure",
          "ROAS & MER Optimization",
          "Full Funnel Media Buying",
          "Retargeting & Customer Journey Optimization",
          "Conversion API & Pixel Tracking",
          "Budget Scaling Without Efficiency Drop",
          "Creative Strategy Direction",
          "Data-Driven Decision Making"
        ]
      },
      {
        id: "website",
        title: "Website Designing",
        description: "High-converting, cinematic websites that combine stunning aesthetics with seamless UX to turn your visitors into loyal customers.",
        iconName: "Globe",
        color: "from-orange-500 to-red-600",
        features: [
          "Conversion-Optimized UX",
          "Premium Brand Aesthetics",
          "Responsive Performance",
          "SEO-Friendly Architecture"
        ]
      }
    ]
  });
  
  const currentItems = formData.items ? formData.items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

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
      const res = await fetch('/api/content/services');
      const data = await res.json();
      if (res.ok && data) {
        // Auto-migrate old icon names and colors to new ones
        if (data.items) {
          data.items = data.items.map((item: any) => ({
            ...item,
            iconName: ICON_MIGRATION[item.iconName] ?? item.iconName,
            color: COLOR_MIGRATION[item.id] ?? item.color,
          }));
        }
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
      const res = await fetch('/api/content/services', {
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

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [key]: value };
    setFormData({ ...formData, items: newItems });
  };

  const updateFeature = (itemIndex: number, featureIndex: number, value: string) => {
    const newItems = [...formData.items];
    const newFeatures = [...newItems[itemIndex].features];
    newFeatures[featureIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], features: newFeatures };
    setFormData({ ...formData, items: newItems });
  };

  const addFeature = (itemIndex: number) => {
    const newItems = [...formData.items];
    newItems[itemIndex] = { ...newItems[itemIndex], features: [...newItems[itemIndex].features, ""] };
    setFormData({ ...formData, items: newItems });
  };

  const removeFeature = (itemIndex: number, featureIndex: number) => {
    const newItems = [...formData.items];
    newItems[itemIndex].features = newItems[itemIndex].features.filter((_, i) => i !== featureIndex);
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: `service-${Date.now()}`, title: "", description: "", iconName: "Zap", color: "from-cyan-500 to-blue-600", features: [""] }
      ]
    });
  };

  const removeItem = (index: number) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white">Services Section</h1>
        <p className="text-slate-400">Manage the services displayed on the homepage.</p>
      </div>

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {message.text && (
              <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Main Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (White)</label>
                  <input
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (Gradient)</label>
                  <input
                    type="text" required value={formData.titleGradient}
                    onChange={(e) => setFormData({...formData, titleGradient: e.target.value})}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Subtitle</label>
                <textarea
                  required rows={2} value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-white">Service Cards ({formData.items.length})</h3>
                <button type="button" onClick={addItem} className="flex items-center gap-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              {editingIndex === null ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-white/5 text-slate-300 font-medium border-b border-white/10">
                        <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Icon</th>
                          <th className="px-6 py-4">Features</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {currentItems.length === 0 ? (
                          <tr><td colSpan={4} className="text-center py-20 text-slate-500">No services found.</td></tr>
                        ) : (
                          currentItems.map((item, index) => {
                            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;
                            return (
                            <tr key={item.id || absoluteIndex} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{item.title || "Untitled"}</td>
                              <td className="px-6 py-4 text-slate-400">{item.iconName}</td>
                              <td className="px-6 py-4 text-slate-400">{item.features.length} Features</td>
                              <td className="px-6 py-4 flex justify-center gap-2">
                                <button type="button" onClick={() => setEditingIndex(absoluteIndex)} className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                                <button type="button" onClick={() => removeItem(absoluteIndex)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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
                </>
              ) : (
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 animate-in slide-in-from-right-4 fade-in">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-bold text-white">Edit Service</h4>
                    <button type="button" onClick={() => setEditingIndex(null)} className="px-4 py-2 bg-white text-black font-bold text-sm rounded-lg hover:bg-slate-200">
                      Done
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Card Title</label>
                      <input type="text" required value={formData.items[editingIndex].title} onChange={(e) => updateItem(editingIndex, 'title', e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Icon</label>
                      <select
                        value={formData.items[editingIndex].iconName}
                        onChange={(e) => updateItem(editingIndex, 'iconName', e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon.value} value={icon.value}>{icon.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">Description</label>
                    <textarea required rows={2} value={formData.items[editingIndex].description} onChange={(e) => updateItem(editingIndex, 'description', e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white resize-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">Features List</label>
                    {formData.items[editingIndex].features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex gap-2">
                        <input type="text" required value={feature} onChange={(e) => updateFeature(editingIndex, fIndex, e.target.value)} className="flex-1 bg-[#020617] border border-white/10 rounded-lg py-2 px-3 text-sm text-white" />
                        <button type="button" onClick={() => removeFeature(editingIndex, fIndex)} className="p-2 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addFeature(editingIndex)} className="text-xs text-cyan-400 mt-2 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Feature
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button onClick={handleSave} disabled={saving} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
