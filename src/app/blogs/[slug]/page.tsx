import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import BookCallButton from "@/components/BookCallButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  await connectToDatabase();
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: blog.seoTitle || `${blog.title} | Dviora Blog`,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: [{ url: blog.coverImage }],
      type: 'article',
      publishedTime: blog.publishedAt.toISOString(),
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  
  await connectToDatabase();
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    image: blog.coverImage,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dviora',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dviora.com/logo-2.png',
      },
    },
    datePublished: blog.publishedAt,
    description: blog.excerpt,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-10 md:pb-16 px-4 sm:px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-start)]/10 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fuchsia-500/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-accent-start)] transition-colors mb-6 md:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Back to Blogs</span>
          </Link>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-outfit leading-[1.15] mb-6 md:mb-8 tracking-tight break-words">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60 mb-8 md:mb-10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--color-accent-start)]" />
              {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-accent-start)]" />
              {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[var(--color-accent-start)]" />
                {blog.tags.join(', ')}
              </div>
            )}
          </div>
          
          {blog.coverImage && (
            <div className="relative aspect-video rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 mb-8 md:mb-16 w-full bg-slate-900">
              <img 
                src={blog.coverImage} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 shrink-0 relative">
            <div className="sticky top-32 space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">About the Author</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-sm">{blog.author}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Meta Ads strategist at Dviora helping D2C brands scale profitably.</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-fuchsia-500/10 to-transparent border border-fuchsia-500/20 rounded-2xl backdrop-blur-md">
                <h4 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mb-3">Share this article</h4>
                <div className="flex gap-3">
                   <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-fuchsia-500 hover:border-fuchsia-400 transition-all text-white"><span className="font-bold text-xs">in</span></button>
                   <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-400 transition-all text-white"><span className="font-bold text-xs">X</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="flex-1 min-w-0 w-full">
            {/* Mobile Author & Share Banner */}
            <div className="lg:hidden mb-8 p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">{blog.author}</span>
                  <span className="text-xs text-slate-400">Meta Ads Strategist</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mr-1">Share:</span>
                <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:bg-fuchsia-500">in</button>
                <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:bg-cyan-500">X</button>
              </div>
            </div>

            {/* Prose content container */}
            <div className="relative w-full overflow-hidden">
              {/* Decorative elements behind text */}
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute top-2/4 -right-20 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div 
                className="prose prose-invert prose-base sm:prose-lg max-w-none break-words overflow-hidden
                prose-headings:font-outfit prose-headings:font-bold prose-headings:tracking-tight prose-headings:break-words
                prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:text-fuchsia-400 prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-5 prose-p:break-words
                prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:underline-offset-4 prose-a:break-all
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-8 prose-img:max-w-full prose-img:h-auto
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-white prose-blockquote:font-medium prose-blockquote:italic
                prose-ul:list-disc prose-ul:pl-5 prose-li:text-slate-300 prose-li:mb-2 prose-ol:list-decimal prose-ol:pl-5
                prose-strong:text-white prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* CTA Bottom */}
            <div className="mt-16 md:mt-24 p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-cyan-500/20 backdrop-blur-md rounded-3xl md:rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit mb-4">Ready to scale your Meta Ads?</h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  Stop guessing and start scaling profitably. Let our team of experts handle your high-budget ad campaigns.
                </p>
                <BookCallButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
