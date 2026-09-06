import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';

// UPDATE a lead
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    await connectToDatabase();
    
    const updatedLead = await Lead.findByIdAndUpdate(id, data, { new: true });
    
    if (!updatedLead) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ message: 'Error updating lead' }, { status: 500 });
  }
}

// DELETE a lead
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedLead = await Lead.findByIdAndDelete(id);
    
    if (!deletedLead) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Lead deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ message: 'Error deleting lead' }, { status: 500 });
  }
}
