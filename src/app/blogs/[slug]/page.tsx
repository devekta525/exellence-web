import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Blog, IBlog } from "@/models/Blog";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import BookCallButton from "@/components/BookCallButton";

type Props = {
  params: { slug: string };
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
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-start)]/10 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fuchsia-500/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-accent-start)] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Blogs</span>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit leading-[1.1] mb-8 tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-wider text-white/60 mb-10">
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
          
          <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 mb-16">
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar - Optional Sticky elements */}
          <div className="hidden lg:block w-64 shrink-0 relative">
            <div className="sticky top-32 space-y-8">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-4">About the Author</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white">{blog.author}</span>
                </div>
                <p className="text-sm text-slate-400">Meta Ads strategist at Dviora helping D2C brands scale profitably.</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-fuchsia-500/10 to-transparent border border-fuchsia-500/20 rounded-2xl backdrop-blur-md">
                <h4 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mb-4">Share this article</h4>
                <div className="flex gap-4">
                   <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-fuchsia-500 hover:border-fuchsia-400 transition-all text-white"><span className="font-bold">in</span></button>
                   <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-400 transition-all text-white"><span className="font-bold">X</span></button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* Prose content container */}
            <div className="relative">
              {/* Decorative elements behind text */}
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute top-2/4 -right-20 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div 
                className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-outfit prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16 prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                prose-h3:text-2xl prose-h3:text-fuchsia-400
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:underline-offset-4
                prose-img:rounded-[32px] prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-white prose-blockquote:font-medium prose-blockquote:italic
                prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-300 prose-li:mb-2
                prose-strong:text-white prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* CTA Bottom */}
            <div className="mt-24 p-12 bg-gradient-to-br from-[#0c1a3d] to-[#020617] border border-cyan-500/20 backdrop-blur-md rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <h3 className="text-4xl font-bold font-outfit mb-4">Ready to scale your Meta Ads?</h3>
                <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
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
