import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { CalendlyWebhookEvent } from '@/models/CalendlyWebhookEvent';
import { Lead } from '@/models/Lead';
import { verifyCalendlySignature } from '@/lib/calendly';
import { sendLinkedInConversion, hashEmail } from '@/lib/linkedinCapi';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get('calendly-webhook-signature');
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

    // Verify webhook signature if signing key is configured
    if (signingKey) {
      const verification = verifyCalendlySignature({
        rawBody,
        signatureHeader,
        signingKey,
      });

      if (!verification.isValid) {
        console.warn(`[Calendly Webhook] Invalid signature: ${verification.reason}`);
        return NextResponse.json(
          { error: 'Unauthorized: Invalid webhook signature', reason: verification.reason },
          { status: 401 }
        );
      }
    }

    // Parse JSON body
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const eventType = body.event;
    const payload = body.payload || {};

    console.log(`[Calendly Webhook] Received event type: ${eventType}`);

    // Handle invitee.canceled or unsupported events gracefully
    if (eventType !== 'invitee.created') {
      console.log(`[Calendly Webhook] Non-creation event (${eventType}) received. Acknowledging.`);
      return NextResponse.json(
        { message: `Event '${eventType}' acknowledged and ignored` },
        { status: 200 }
      );
    }

    // Extract event identifiers
    const inviteeUri = payload.invitee || payload.uri || '';
    const scheduledEventUri = payload.event || '';
    const calendlyEventId = inviteeUri || scheduledEventUri || `event_${Date.now()}`;
    const inviteeName = payload.name || '';
    const inviteeEmail = payload.email || '';
    const meetingStartTime = payload.start_time;
    const meetingEndTime = payload.end_time;
    const bookingTimestamp = payload.created_at
      ? new Date(payload.created_at).getTime()
      : Date.now();

    // Connect to database
    await connectToDatabase();

    // Idempotency check
    const existingRecord = await CalendlyWebhookEvent.findOne({ calendlyEventId });
    if (existingRecord && existingRecord.linkedinStatus === 'SUCCESS') {
      console.log(`[Calendly Webhook] Duplicate event detected for ${calendlyEventId}. Skipping LinkedIn CAPI.`);
      return NextResponse.json(
        { message: 'Duplicate webhook event already processed', status: 'SKIPPED_DUPLICATE' },
        { status: 200 }
      );
    }

    // Send LinkedIn Conversions API event
    console.log(`[Calendly Webhook] Sending LinkedIn CAPI conversion for ${inviteeName || 'invitee'}...`);
    const linkedinResult = await sendLinkedInConversion({
      email: inviteeEmail,
      name: inviteeName,
      timestamp: bookingTimestamp,
    });

    // Save webhook event record in MongoDB
    await CalendlyWebhookEvent.findOneAndUpdate(
      { calendlyEventId },
      {
        $set: {
          eventType,
          inviteeUri,
          scheduledEventUri,
          inviteeName,
          inviteeEmailHash: inviteeEmail ? hashEmail(inviteeEmail) : undefined,
          meetingStartTime: meetingStartTime ? new Date(meetingStartTime) : undefined,
          meetingEndTime: meetingEndTime ? new Date(meetingEndTime) : undefined,
          linkedinConversionId: process.env.LINKEDIN_CONVERSION_ID,
          linkedinStatus: linkedinResult.success ? 'SUCCESS' : 'FAILED',
          processingStatus: 'PROCESSED',
          lastError: linkedinResult.success ? undefined : linkedinResult.errorDetails || linkedinResult.message,
        },
        $inc: { retryCount: 1 },
      },
      { upsert: true, new: true }
    );

    // Save lead record in MongoDB Lead collection for Admin Lead view
    try {
      await Lead.create({
        name: inviteeName || 'Calendly Invitee',
        email: inviteeEmail || '',
        phone: '',
        website: 'Calendly Schedule',
        service: '30-Min Strategy Call (Calendly)',
        revenue: 'Calendly Meeting',
        message: `Meeting scheduled for ${meetingStartTime ? new Date(meetingStartTime).toLocaleString() : 'requested time'}.`,
        status: 'New',
      });
    } catch (leadErr) {
      console.error('[Calendly Webhook] Error creating Lead entry:', leadErr);
    }

    console.log(`[Calendly Webhook] Event processed successfully. LinkedIn Status: ${linkedinResult.success ? 'SUCCESS' : 'FAILED'}`);

    return NextResponse.json(
      {
        message: 'Calendly webhook processed successfully',
        calendlyEventId,
        linkedinStatus: linkedinResult.success ? 'SUCCESS' : 'FAILED',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Calendly Webhook] Error processing webhook:', error);
    return NextResponse.json(
      {
        error: 'Internal server error processing webhook',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
