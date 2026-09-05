import mongoose, { Document, Model } from 'mongoose';

export interface IContent extends Document {
  section: string;
  data: Record<string, any>;
  updatedAt: Date;
}

const ContentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, unique: true }, // e.g. 'hero'
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const Content: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
