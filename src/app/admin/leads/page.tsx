"use client";

import { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  revenue: string;
  status: string;
  message: string;
  createdAt: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });

  // Modal States
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", revenue: "", status: "New", message: ""
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchLeads(1);
    }
  }, [router]);

  const fetchLeads = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?page=${page}&limit=${pagination.limit}`);
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads || []);
        setPagination(data.pagination);
      } else {
        console.warn("API Warning:", data.message);
        setLeads([]);
      }
    } catch (error) {
      console.warn("Error fetching leads", error);
      setLeads([]);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsAddOpen(false);
      fetchLeads(pagination.page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    try {
      await fetch(`/api/leads/${selectedLead._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsEditOpen(false);
      fetchLeads(pagination.page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedLead) return;
    try {
      await fetch(`/api/leads/${selectedLead._id}`, { method: 'DELETE' });
      setIsDeleteOpen(false);
      fetchLeads(pagination.page);
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setFormData(lead);
    setIsEditOpen(true);
  };

  const openView = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewOpen(true);
  };

  const openDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Leads Management</h1>
          <p className="text-slate-400">View and manage all contact form submissions.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: "", email: "", phone: "", service: "Meta Ads Management", revenue: "₹1 Lakh - ₹5 Lakh", status: "New", message: "" });
            setIsAddOpen(true);
          }}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Lead
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-300 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate-500">Loading leads...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate-500">No leads found.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-400">
                      {lead.email} <br /> {lead.phone && <span className="text-xs">{lead.phone}</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{lead.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button onClick={() => openView(lead)} className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(lead)} className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => openDelete(lead)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Page {pagination.page} of {Math.max(1, pagination.totalPages)}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={pagination.page <= 1}
              onClick={() => fetchLeads(pagination.page - 1)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchLeads(pagination.page + 1)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* View Modal */}
      {isViewOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-white mb-6">Lead Details</h3>
            <div className="space-y-4">
              <div><p className="text-xs text-slate-500 uppercase tracking-wider">Name</p><p className="text-white text-lg">{selectedLead.name}</p></div>
              <div><p className="text-xs text-slate-500 uppercase tracking-wider">Contact</p><p className="text-white">{selectedLead.email} / {selectedLead.phone}</p></div>
              <div><p className="text-xs text-slate-500 uppercase tracking-wider">Service & Revenue</p><p className="text-white">{selectedLead.service} | {selectedLead.revenue}</p></div>
              <div><p className="text-xs text-slate-500 uppercase tracking-wider">Message</p><p className="text-slate-300 p-3 bg-white/5 rounded-lg whitespace-pre-wrap">{selectedLead.message || "No message."}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-white mb-6">{isEditOpen ? "Edit Lead" : "Add New Lead"}</h3>
            <form onSubmit={isEditOpen ? handleEdit : handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400">Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
                <div><label className="text-xs text-slate-400">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white">
                    <option value="New">New</option><option value="Contacted">Contacted</option><option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400">Email</label><input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
                <div><label className="text-xs text-slate-400">Phone</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
              </div>
              <div><label className="text-xs text-slate-400">Service</label><input required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
              <div><label className="text-xs text-slate-400">Revenue</label><input required value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
              <div><label className="text-xs text-slate-400">Message</label><textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" /></div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 rounded-lg mt-4 transition-colors">
                {isEditOpen ? "Save Changes" : "Create Lead"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-8 h-8" /></div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Lead?</h3>
            <p className="text-slate-400 mb-6">Are you sure you want to delete <strong>{selectedLead.name}</strong>? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setIsDeleteOpen(false)} className="px-6 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10">Cancel</button>
              <button onClick={handleDelete} className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
