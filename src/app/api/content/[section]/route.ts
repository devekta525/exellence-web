import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Content } from '@/models/Content';

// GET content for a specific section
export async function GET(req: Request, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    const db = await connectToDatabase();
    
    let sectionContent = null;
    if (db) {
      sectionContent = await Content.findOne({ section });
    }
    
    if (!sectionContent) {
      return NextResponse.json(null, { status: 404 });
    }
    
    return NextResponse.json(sectionContent.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ message: 'Error fetching content' }, { status: 500 });
  }
}

// UPDATE content for a specific section
export async function PUT(req: Request, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    const data = await req.json();
    const db = await connectToDatabase();
    
    if (!db) {
      return NextResponse.json({ message: 'Database connection skipped or missing MONGODB_URI' }, { status: 503 });
    }

    // Find and update, or create if it doesn't exist (upsert)
    const updatedContent = await Content.findOneAndUpdate(
      { section },
      { $set: { data } },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(updatedContent.data, { status: 200 });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ message: 'Error updating content' }, { status: 500 });
  }
}
