import crypto from 'crypto';

export interface SendLinkedInConversionParams {
  email?: string;
  name?: string;
  timestamp?: number;
  conversionId?: string;
  accessToken?: string;
}

export interface LinkedInCAPIResult {
  success: boolean;
  status: number;
  message?: string;
  errorDetails?: string;
}

/**
 * Normalizes and SHA-256 hashes an email address for LinkedIn CAPI
 */
export function hashEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Sends a server-side conversion event to LinkedIn Conversions API
 */
export async function sendLinkedInConversion(
  params: SendLinkedInConversionParams
): Promise<LinkedInCAPIResult> {
  const token = params.accessToken || process.env.LINKEDIN_CAPI_TOKEN || process.env.LINKEDIN_ACCESS_TOKEN;
  const conversionId = params.conversionId || process.env.LINKEDIN_CONVERSION_ID;

  if (!token || !conversionId) {
    return {
      success: false,
      status: 400,
      message: 'LinkedIn CAPI token or Conversion ID is not configured in environment variables.',
    };
  }

  const userIds: Array<{ idType: string; idValue: string }> = [];
  if (params.email) {
    userIds.push({
      idType: 'SHA256_EMAIL',
      idValue: hashEmail(params.email),
    });
  }

  let firstName: string | undefined;
  let lastName: string | undefined;
  if (params.name) {
    const nameParts = params.name.trim().split(/\s+/);
    firstName = nameParts[0];
    if (nameParts.length > 1) {
      lastName = nameParts.slice(1).join(' ');
    }
  }

  const timestamp = params.timestamp || Date.now();

  const payload = {
    conversion: `urn:li:conversions:${conversionId}`,
    conversionHappenedAt: timestamp,
    user: {
      userIds,
      userInfo: {
        firstName,
        lastName,
      },
    },
  };

  try {
    const response = await fetch('https://api.linkedin.com/rest/conversionEvents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'LinkedIn-Version': '2024-01',
        'X-RestLi-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        success: true,
        status: response.status,
        message: 'LinkedIn CAPI conversion recorded successfully',
      };
    } else {
      const errorText = await response.text();
      console.error(`[LinkedIn CAPI] Error HTTP ${response.status}:`, errorText);
      return {
        success: false,
        status: response.status,
        message: `LinkedIn API error HTTP ${response.status}`,
        errorDetails: errorText,
      };
    }
  } catch (err: any) {
    console.error('[LinkedIn CAPI] Fetch exception:', err);
    return {
      success: false,
      status: 500,
      message: 'Network/Fetch exception calling LinkedIn CAPI',
      errorDetails: err?.message || String(err),
    };
  }
}
