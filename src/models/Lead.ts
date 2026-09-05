import mongoose, { Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  service: string;
  revenue: string;
  message?: string;
  status: string; // e.g., 'New', 'Contacted', 'Closed'
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    service: { type: String, required: true },
    revenue: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'New' },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from compiling the model multiple times in dev
export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
