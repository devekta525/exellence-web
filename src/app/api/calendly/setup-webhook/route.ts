import { NextRequest, NextResponse } from 'next/server';
import { getCalendlyCurrentUser } from '@/lib/calendly';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const searchParams = req.nextUrl.searchParams;
    const secretParam = searchParams.get('secret');
    const adminSecret = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || 'admin123';

    // Verify admin secret for protected setup operation
    const isAuthorized =
      secretParam === adminSecret ||
      authHeader === `Bearer ${adminSecret}` ||
      authHeader === `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide valid admin secret via ?secret= or Authorization header.' },
        { status: 401 }
      );
    }

    const token = process.env.CALENDLY_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'CALENDLY_ACCESS_TOKEN is missing in environment variables.' },
        { status: 400 }
      );
    }

    // Parse target domain / host from request or env
    const body = await req.json().catch(() => ({}));
    const siteUrl =
      body.url ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      `https://${req.headers.get('host')}`;
    
    const webhookUrl = `${siteUrl.replace(/\/$/, '')}/api/calendly/webhook`;

    console.log(`[Calendly Setup] Fetching current Calendly user...`);
    const userResource = await getCalendlyCurrentUser(token);

    const userUri = userResource.uri;
    const organizationUri = userResource.current_organization;

    console.log(`[Calendly Setup] Registering webhook for user: ${userUri}, org: ${organizationUri}`);
    console.log(`[Calendly Setup] Target Webhook URL: ${webhookUrl}`);

    const subscribeResponse = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ['invitee.created', 'invitee.canceled'],
        organization: organizationUri,
        user: userUri,
        scope: 'user',
      }),
    });

    const resData = await subscribeResponse.json();

    if (!subscribeResponse.ok) {
      console.error('[Calendly Setup] Webhook registration failed:', resData);
      return NextResponse.json(
        {
          error: 'Failed to register webhook subscription with Calendly',
          status: subscribeResponse.status,
          details: resData,
        },
        { status: subscribeResponse.status }
      );
    }

    const resource = resData.resource || {};
    return NextResponse.json(
      {
        message: 'Calendly Webhook Subscription created successfully!',
        webhookUrl,
        subscriptionUri: resource.uri,
        userUri,
        organizationUri,
        signingKeyNote: resource.signing_key
          ? 'Save the signing_key in CALENDLY_WEBHOOK_SIGNING_KEY in your .env.local and Vercel.'
          : 'Check Calendly Webhook settings for signing key.',
        signingKey: resource.signing_key ? '***_PROVIDED_***' : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Calendly Setup] Exception:', error);
    return NextResponse.json(
      {
        error: 'Setup webhook exception',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
