import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';

// GET all leads (with optional pagination)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    await connectToDatabase();
    
    const total = await Lead.countDocuments();
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      
    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ message: 'Error fetching leads' }, { status: 500 });
  }
}

// POST a new lead (manual entry from admin)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();
    
    const newLead = await Lead.create(data);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ message: 'Error creating lead' }, { status: 500 });
  }
}
