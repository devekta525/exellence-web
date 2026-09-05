import React from "react";
import { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Dviora",
  description: "Read the latest insights, strategies, and case studies on scaling D2C brands with Meta Ads from the Dviora team.",
  openGraph: {
    title: "Blog | Dviora",
    description: "Read the latest insights, strategies, and case studies on scaling D2C brands with Meta Ads from the Dviora team.",
    url: "https://dviora.com/blogs",
    type: "website",
  },
};

const ITEMS_PER_PAGE = 6;

async function getBlogs(page: number) {
  try {
    await connectToDatabase();
    const skip = (page - 1) * ITEMS_PER_PAGE;
    
    const [blogs, total] = await Promise.all([
      Blog.find().sort({ publishedAt: -1 }).skip(skip).limit(ITEMS_PER_PAGE).lean(),
      Blog.countDocuments()
    ]);

    return { 
      blogs: JSON.parse(JSON.stringify(blogs)), 
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
      currentPage: page 
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { blogs: [], totalPages: 0, currentPage: 1 };
  }
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt((params.page as string) || "1", 10);
  const { blogs, totalPages, currentPage } = await getBlogs(page);

  return (
    <main className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-start)]/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fuchsia-500/10 blur-[100px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-[var(--color-accent-start)] font-bold uppercase tracking-[0.2em] mb-4">
            Our Insights
          </p>
          <h1 className="text-5xl md:text-6xl font-bold font-outfit leading-[1.1] mb-6 tracking-tight">
            Latest Blogs
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Deep dives, strategies, and industry secrets on how to scale your brand efficiently.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-white/50 py-20">
            No blogs found. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link 
                href={`/blogs/${blog.slug}`} 
                key={blog._id}
                className="group flex flex-col bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={blog.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-start)] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold font-outfit mb-3 line-clamp-2 group-hover:text-[var(--color-accent-start)] transition-colors">
                    {blog.title}
                  </h2>
                  
                  <p className="text-white/60 line-clamp-3 mb-6 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors mt-auto">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            {currentPage > 1 ? (
              <Link 
                href={`/blogs?page=${currentPage - 1}`}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </div>
            )}
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`/blogs?page=${pageNum}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-outfit transition-colors ${
                      currentPage === pageNum 
                        ? "bg-[var(--color-accent-start)] text-[#020617]" 
                        : "border border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages ? (
              <Link 
                href={`/blogs?page=${currentPage + 1}`}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
