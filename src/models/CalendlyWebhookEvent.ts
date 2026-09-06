import mongoose, { Document, Model } from 'mongoose';

export interface ICalendlyWebhookEvent extends Document {
  calendlyEventId: string;
  eventType: string;
  inviteeUri: string;
  scheduledEventUri: string;
  inviteeName?: string;
  inviteeEmailHash?: string;
  meetingStartTime?: Date;
  meetingEndTime?: Date;
  linkedinConversionId?: string;
  linkedinStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'SKIPPED_DUPLICATE';
  processingStatus: 'PROCESSED' | 'FAILED' | 'IGNORED';
  retryCount: number;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CalendlyWebhookEventSchema = new mongoose.Schema(
  {
    calendlyEventId: { type: String, required: true, unique: true, index: true },
    eventType: { type: String, required: true },
    inviteeUri: { type: String, required: true },
    scheduledEventUri: { type: String, required: true },
    inviteeName: { type: String },
    inviteeEmailHash: { type: String },
    meetingStartTime: { type: Date },
    meetingEndTime: { type: Date },
    linkedinConversionId: { type: String },
    linkedinStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'SKIPPED_DUPLICATE'],
      default: 'PENDING',
    },
    processingStatus: {
      type: String,
      enum: ['PROCESSED', 'FAILED', 'IGNORED'],
      default: 'PROCESSED',
    },
    retryCount: { type: Number, default: 0 },
    lastError: { type: String },
  },
  {
    timestamps: true,
  }
);

export const CalendlyWebhookEvent: Model<ICalendlyWebhookEvent> =
  mongoose.models.CalendlyWebhookEvent ||
  mongoose.model<ICalendlyWebhookEvent>('CalendlyWebhookEvent', CalendlyWebhookEventSchema);
