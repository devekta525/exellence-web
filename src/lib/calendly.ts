import crypto from 'crypto';

export interface VerifyCalendlySignatureOptions {
  rawBody: string;
  signatureHeader: string | null;
  signingKey: string;
  toleranceSeconds?: number; // Optional timestamp tolerance check
}

/**
 * Verifies Calendly Webhook HMAC-SHA256 signature
 */
export function verifyCalendlySignature(options: VerifyCalendlySignatureOptions): {
  isValid: boolean;
  reason?: string;
} {
  const { rawBody, signatureHeader, signingKey, toleranceSeconds = 300 } = options;

  if (!signatureHeader) {
    return { isValid: false, reason: 'Missing calendly-webhook-signature header' };
  }

  // Parse t=... and v1=... from signature header
  const parts = signatureHeader.split(',');
  let t: string | null = null;
  let v1: string | null = null;

  for (const part of parts) {
    const [key, value] = part.trim().split('=');
    if (key === 't') t = value;
    if (key === 'v1') v1 = value;
  }

  if (!t || !v1) {
    return { isValid: false, reason: 'Malformed signature header (missing t or v1)' };
  }

  // Timestamp tolerance check
  const timestampNum = parseInt(t, 10);
  if (!isNaN(timestampNum) && toleranceSeconds > 0) {
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestampNum) > toleranceSeconds) {
      return { isValid: false, reason: 'Signature timestamp outside tolerance window' };
    }
  }

  // Compute expected HMAC SHA-256 signature
  const dataToSign = `${t}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', signingKey)
    .update(dataToSign, 'utf8')
    .digest('hex');

  try {
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const receivedBuffer = Buffer.from(v1, 'hex');

    if (expectedBuffer.length !== receivedBuffer.length) {
      return { isValid: false, reason: 'Signature length mismatch' };
    }

    const isMatch = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
    if (!isMatch) {
      return { isValid: false, reason: 'Signature mismatch' };
    }

    return { isValid: true };
  } catch (err) {
    return { isValid: false, reason: 'Signature computation error' };
  }
}

/**
 * Helper to fetch Calendly user info and organization
 */
export async function getCalendlyCurrentUser(accessToken: string) {
  const response = await fetch('https://api.calendly.com/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Calendly API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.resource;
}

/**
 * Helper to fetch Calendly scheduled event details by URI
 */
export async function getCalendlyEventDetails(eventUri: string, accessToken: string) {
  const response = await fetch(eventUri, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Calendly Event details fetch error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.resource;
}
