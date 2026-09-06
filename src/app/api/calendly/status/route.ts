import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { CalendlyWebhookEvent } from '@/models/CalendlyWebhookEvent';

export async function GET(req: NextRequest) {
  try {
    const calendlyTokenSet = Boolean(process.env.CALENDLY_ACCESS_TOKEN);
    const linkedinTokenSet = Boolean(process.env.LINKEDIN_CAPI_TOKEN || process.env.LINKEDIN_ACCESS_TOKEN);
    const linkedinConversionIdSet = Boolean(process.env.LINKEDIN_CONVERSION_ID);
    const signingKeySet = Boolean(process.env.CALENDLY_WEBHOOK_SIGNING_KEY);

    let dbStatus = 'disconnected';
    let totalWebhookEvents = 0;
    let successfulConversions = 0;
    let failedConversions = 0;

    try {
      const db = await connectToDatabase();
      if (db) {
        dbStatus = 'connected';
        totalWebhookEvents = await CalendlyWebhookEvent.countDocuments();
        successfulConversions = await CalendlyWebhookEvent.countDocuments({ linkedinStatus: 'SUCCESS' });
        failedConversions = await CalendlyWebhookEvent.countDocuments({ linkedinStatus: 'FAILED' });
      }
    } catch (e: any) {
      dbStatus = `error: ${e?.message || String(e)}`;
    }

    return NextResponse.json(
      {
        calendly: calendlyTokenSet ? 'configured' : 'missing',
        linkedin: linkedinTokenSet && linkedinConversionIdSet ? 'configured' : 'missing',
        signingKey: signingKeySet ? 'configured' : 'not_configured',
        database: dbStatus,
        webhookEndpoint: '/api/calendly/webhook',
        stats: {
          totalEventsProcessed: totalWebhookEvents,
          successfulLinkedInConversions: successfulConversions,
          failedLinkedInConversions: failedConversions,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Status diagnostic error',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
