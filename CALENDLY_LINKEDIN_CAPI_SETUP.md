# Calendly → LinkedIn Conversions API (CAPI) Integration Guide

This guide provides complete instructions for setting up, configuring, and verifying the production-ready **Calendly → LinkedIn Conversions API (CAPI)** integration.

---

## 🏗️ Architecture Overview

When a visitor schedules a meeting via Calendly:
1. **User Action**: Visitor schedules a meeting on the embedded Calendly widget (`https://dviora.com/schedule-meeting`).
2. **Webhook Notification**: Calendly posts an `invitee.created` webhook event to `https://dviora.com/api/calendly/webhook`.
3. **Signature Verification & Security**: Server verifies the HMAC SHA-256 signature using `CALENDLY_WEBHOOK_SIGNING_KEY` (if configured).
4. **Idempotency Check**: MongoDB checks `CalendlyWebhookEvent` collection for duplicate `calendlyEventId` to prevent duplicate conversion fires.
5. **LinkedIn CAPI Dispatch**: Server hashes invitee email (`SHA256_EMAIL`) and sends a `Calendly Meeting Booked` conversion event directly to LinkedIn CAPI (`https://api.linkedin.com/rest/conversionEvents`).
6. **Lead Record**: High-intent lead details are automatically persisted to the MongoDB `Lead` collection for Admin Panel viewing (`/admin/leads`).

---

## 🔑 Required Environment Variables

Add the following environment variables to your `.env.local` file locally and in your **Vercel Project Settings → Environment Variables**:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `CALENDLY_ACCESS_TOKEN` | Calendly Personal Access Token (PAT) with `scheduled_events:read`, `webhooks:read`, `webhooks:write` scopes | `eyJraW...` |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | (Optional/Recommended) Signing key returned by Calendly upon webhook creation for signature verification | `c0a76a...` |
| `LINKEDIN_CAPI_TOKEN` | LinkedIn Conversions API Bearer Token | `AQUddBy...` |
| `LINKEDIN_CONVERSION_ID` | LinkedIn Conversion Rule ID created in Campaign Manager | `28363460` |
| `NEXT_PUBLIC_SITE_URL` | Production website base URL | `https://dviora.com` |
| `MONGODB_URI` | MongoDB Connection String | `mongodb+srv://...` |

---

## 🛠️ Step 1: Webhook Subscription Setup

A setup endpoint is available at `/api/calendly/setup-webhook` to automatically register the webhook callback with Calendly's API v2.

### Execute Registration via cURL or Postman:

```bash
curl -X POST "https://dviora.com/api/calendly/setup-webhook?secret=admin123" \
     -H "Content-Type: application/json" \
     -d '{ "url": "https://dviora.com" }'
```

### Expected Response:
```json
{
  "message": "Calendly Webhook Subscription created successfully!",
  "webhookUrl": "https://dviora.com/api/calendly/webhook",
  "subscriptionUri": "https://api.calendly.com/webhook_subscriptions/xxxx-xxxx",
  "userUri": "https://api.calendly.com/users/xxxx",
  "organizationUri": "https://api.calendly.com/organizations/xxxx",
  "signingKeyNote": "Save the signing_key in CALENDLY_WEBHOOK_SIGNING_KEY in your .env.local and Vercel."
}
```

*Note: Copy the `signing_key` from the response (if provided) and save it to `CALENDLY_WEBHOOK_SIGNING_KEY` in Vercel.*

---

## 🔍 Step 2: Diagnostic Verification Endpoint

To verify system health and configuration status without exposing raw tokens:

```bash
curl -X GET "https://dviora.com/api/calendly/status"
```

### Expected Response:
```json
{
  "calendly": "configured",
  "linkedin": "configured",
  "signingKey": "configured",
  "database": "connected",
  "webhookEndpoint": "/api/calendly/webhook",
  "stats": {
    "totalEventsProcessed": 0,
    "successfulLinkedInConversions": 0,
    "failedLinkedInConversions": 0
  }
}
```

---

## 🧪 Step 3: Testing & Verification Procedure

1. **Simulate a Test Booking**:
   - Go to `https://dviora.com/schedule-meeting`.
   - Select a slot on the embedded Calendly widget and submit a test meeting with your email.

2. **Verify Server Execution Logs (Vercel / Local Terminal)**:
   Look for the following log output:
   ```text
   [Calendly Webhook] Received event type: invitee.created
   [Calendly Webhook] Sending LinkedIn CAPI conversion for Test User...
   [LinkedIn CAPI] Conversion recorded successfully
   [Calendly Webhook] Event processed successfully. LinkedIn Status: SUCCESS
   ```

3. **Verify Idempotency (Duplicate Prevention)**:
   - Resend the same webhook payload or retry:
   ```text
   [Calendly Webhook] Duplicate event detected for https://api.calendly.com/scheduled_events/... Skipping LinkedIn CAPI.
   ```

4. **Verify in LinkedIn Campaign Manager**:
   - Log into **LinkedIn Campaign Manager** → **Analyze** → **Conversions**.
   - Select Conversion Rule ID `28363460`.
   - Verify recent conversion events recorded via Server API.

---

## 🚨 Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| `401 Unauthorized: Invalid webhook signature` | Mismatch or missing `CALENDLY_WEBHOOK_SIGNING_KEY` | Ensure `CALENDLY_WEBHOOK_SIGNING_KEY` matches the signing key returned by Calendly setup |
| `LinkedIn CAPI Token missing` | Environment variable not set in Vercel | Set `LINKEDIN_CAPI_TOKEN` in Vercel Settings |
| `401 Unauthenticated: The access token is invalid` | Calendly Personal Access Token expired/revoked | Generate a new PAT in Calendly Account Settings → Integrations → Access Tokens and update `CALENDLY_ACCESS_TOKEN` |

---

## 📦 Modified & Added Files

- **Model**: [`src/models/CalendlyWebhookEvent.ts`](file:///e:/workstation/excellence/src/models/CalendlyWebhookEvent.ts)
- **LinkedIn CAPI Helper**: [`src/lib/linkedinCapi.ts`](file:///e:/workstation/excellence/src/lib/linkedinCapi.ts)
- **Calendly Signature Verification**: [`src/lib/calendly.ts`](file:///e:/workstation/excellence/src/lib/calendly.ts)
- **Webhook Endpoint**: [`src/app/api/calendly/webhook/route.ts`](file:///e:/workstation/excellence/src/app/api/calendly/webhook/route.ts)
- **Setup Webhook Endpoint**: [`src/app/api/calendly/setup-webhook/route.ts`](file:///e:/workstation/excellence/src/app/api/calendly/setup-webhook/route.ts)
- **Status Endpoint**: [`src/app/api/calendly/status/route.ts`](file:///e:/workstation/excellence/src/app/api/calendly/status/route.ts)
- **Environment Example**: [`\.env.example`](file:///e:/workstation/excellence/.env.example)
