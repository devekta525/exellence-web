import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ publishedAt: -1 }).lean();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Auto-generate slug if not provided or empty
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create blog:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
