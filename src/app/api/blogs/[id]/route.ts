import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

type Props = {
  params: { id: string };
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true }).lean();
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: any) {
    console.error("Failed to update blog:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
