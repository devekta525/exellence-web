import mongoose from 'mongoose';

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
}

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: false },
    author: { type: String, required: true, default: "Dviora Team" },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
