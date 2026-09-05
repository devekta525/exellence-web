"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Plus, Trash2, Pencil, Image as ImageIcon, Calendar } from "lucide-react";

export default function AdminBlogsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const currentBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchBlogs();
    }
  }, [router]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.warn("Error fetching blogs", err);
    }
    setLoading(false);
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog.");
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="space-y-6 max-w-6xl pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Blogs Management</h1>
          <p className="text-slate-400 mt-1">Create, edit, and manage your website's blogs.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-colors"
        >
          <Plus className="w-5 h-5" /> Write New Blog
        </Link>
      </div>

      <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl min-h-[400px] relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-300 font-medium">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-20 text-slate-500"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-20 text-slate-500">No blogs found.</td></tr>
              ) : (
                currentBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-slate-800 shrink-0">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt="Cover" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-500 m-2.5" />
                          )}
                        </div>
                        <span className="font-medium text-white max-w-[200px] truncate block" title={blog.title}>{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{blog.author}</td>
                    <td className="px-6 py-4 text-slate-400">{new Date(blog.publishedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {blog.tags?.slice(0, 2).map((tag: string, i: number) => (
                          <span key={i} className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300 border border-white/10">{tag}</span>
                        ))}
                        {blog.tags?.length > 2 && <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-500">+{blog.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <Link href={`/admin/blogs/${blog._id}`} className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="Edit"><Pencil className="w-4 h-4" /></Link>
                      <button onClick={() => deleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {blogs.length > 0 && (
          <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Page {currentPage} of {Math.max(1, Math.ceil(blogs.length / itemsPerPage))}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                disabled={currentPage >= Math.ceil(blogs.length / itemsPerPage)}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
