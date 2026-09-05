"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Save, Loader2, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function NewBlogPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Dviora Team",
    tags: "",
    seoTitle: "",
    seoDescription: ""
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) router.replace("/admin/login");
    else setIsAuthorized(true);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, coverImage: data.url }));
        setMessage({ text: "Image uploaded successfully!", type: "success" });
      } else {
        setMessage({ text: data.error || "Upload failed.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error uploading image.", type: "error" });
    }
    setUploading(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      setMessage({ text: "Title and Content are required.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Blog created successfully!", type: "success" });
        setTimeout(() => router.push("/admin/blogs"), 1500);
      } else {
        setMessage({ text: data.error || "Failed to create blog.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error saving blog.", type: "error" });
    }
    setSaving(false);
  };

  if (!isAuthorized) return null;

  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Link href="/admin/blogs" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
          <h1 className="text-3xl font-bold font-outfit text-white">Write New Blog</h1>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Publish
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl border ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Content</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Blog Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="How to Scale Meta Ads in 2026"
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-lg font-bold placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Excerpt (Short Summary)</label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleChange} 
                rows={3}
                placeholder="A brief summary that appears on the blog cards..."
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 resize-none focus:border-cyan-500/50 outline-none transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase mb-2 block">Blog Content (Rich Text)</label>
              <div className="bg-[#020617] border border-white/10 rounded-xl overflow-hidden [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:text-white [&_.ql-editor]:text-base [&_.ql-stroke]:stroke-slate-300 [&_.ql-fill]:fill-slate-300 [&_.ql-picker]:text-slate-300">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={handleContentChange} 
                  modules={modules}
                  placeholder="Start writing your amazing blog here..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Cover Image</h3>
            
            <div className="space-y-4">
              {formData.coverImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Change Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className={`relative aspect-video rounded-xl border-2 border-dashed ${uploading ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'} flex flex-col items-center justify-center cursor-pointer transition-colors`}>
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                  )}
                  <span className="text-sm font-medium text-slate-400">{uploading ? 'Uploading...' : 'Click to upload Cover Image'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
          </div>

          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Settings & SEO</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Author</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:border-cyan-500/50 outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Tags (comma separated)</label>
              <input 
                type="text" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="Meta Ads, Scaling, D2C"
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:border-cyan-500/50 outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Custom URL Slug (Optional)</label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="leave-blank-to-auto-generate"
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:border-cyan-500/50 outline-none" 
              />
            </div>
            
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-fuchsia-400 uppercase">SEO Title</label>
                <input 
                  type="text" 
                  name="seoTitle" 
                  value={formData.seoTitle} 
                  onChange={handleChange} 
                  placeholder="Defaults to Blog Title"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:border-fuchsia-500/50 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-fuchsia-400 uppercase">SEO Description</label>
                <textarea 
                  name="seoDescription" 
                  value={formData.seoDescription} 
                  onChange={handleChange} 
                  rows={2}
                  placeholder="Defaults to Excerpt"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 px-4 text-white text-sm resize-none focus:border-fuchsia-500/50 outline-none" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
