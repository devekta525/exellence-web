import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';

export async function POST(req: Request) {
  try {
    const { name, phone, email, website, service, revenue, message, isWebsiteDev } = await req.json();

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP credentials are not configured in environment variables.");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpUser,
      to: smtpUser,
      subject: `New Dviora Lead: ${name} (${service})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; background-color: #020617; color: #ffffff; padding: 40px; border-radius: 24px; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; padding: 10px 20px; border: 2px solid #c5a059; border-radius: 12px;">
              <h1 style="color: #c5a059; margin: 0; font-size: 24px; letter-spacing: 4px; text-transform: uppercase;">Dviora</h1>
            </div>
            <p style="color: #64748b; font-size: 14px; margin-top: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Strategic Growth Lead</p>
          </div>
          
          <div style="background: linear-gradient(145deg, #0f172a, #020617); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 20px;">
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 5px;">Full Name</span>
                  <span style="font-size: 18px; font-weight: 700; color: #ffffff;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 20px;">
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 5px;">Contact Details</span>
                  <span style="font-size: 16px; color: #cbd5e1;">${phone ? `📞 ${phone}` : `✉️ ${email}`}</span>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 20px;">
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 5px;">Service Requested</span>
                  <span style="font-size: 16px; color: #34d399; font-weight: 700;">${service}</span>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 20px;">
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 5px;">Website URL</span>
                  <a href="${website}" style="font-size: 16px; color: #38bdf8; text-decoration: none; font-weight: 600;">${website}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 5px;">Target Revenue Tier</span>
                  <span style="font-size: 16px; color: #f472b6; font-weight: 700; background: rgba(244,114,182,0.1); padding: 4px 12px; border-radius: 6px; display: inline-block;">${revenue}</span>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 40px;">
            <h3 style="color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-left: 3px solid #38bdf8; padding-left: 10px;">Client Brief</h3>
            <div style="background-color: rgba(255,255,255,0.02); padding: 25px; border-radius: 16px; font-style: normal; color: #94a3b8; line-height: 1.8; border: 1px solid rgba(255,255,255,0.03);">
              ${message ? message.replace(/\n/g, '<br>') : '<span style="color: #475569;">No specific brief provided.</span>'}
            </div>
          </div>

          <div style="text-align: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="font-size: 11px; color: #475569; margin: 0; text-transform: uppercase; letter-spacing: 2px;">© 2026 Dviora Agency | High-Impact Growth</p>
          </div>
        </div>
      `,
    };

    // 1. Send the email notification
    await transporter.sendMail(mailOptions);

    // 2. LinkedIn Conversions API (CAPI) Tracking
    try {
      const LINKEDIN_CAPI_TOKEN = process.env.LINKEDIN_CAPI_TOKEN;
      const LINKEDIN_CONVERSION_ID = process.env.LINKEDIN_CONVERSION_ID;

      if (!LINKEDIN_CAPI_TOKEN || !LINKEDIN_CONVERSION_ID) {
        throw new Error("LinkedIn CAPI credentials are not configured in environment variables.");
      }

      const userIds = [];
      if (email) {
        const encoder = new TextEncoder();
        const data = encoder.encode(email.toLowerCase().trim());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        userIds.push({
          idType: "SHA256_EMAIL",
          idValue: hashedEmail
        });
      }

      const capiPayload = {
        conversion: `urn:li:conversions:${LINKEDIN_CONVERSION_ID}`,
        conversionHappenedAt: Date.now(),
        user: {
          userIds: userIds,
          userInfo: {
            firstName: name ? name.split(' ')[0] : undefined,
            lastName: name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : undefined,
          }
        }
      };

      const capiResponse = await fetch('https://api.linkedin.com/rest/conversionEvents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LINKEDIN_CAPI_TOKEN}`,
          'LinkedIn-Version': '2024-01',
          'X-RestLi-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(capiPayload)
      });

      if (!capiResponse.ok) {
        console.error('LinkedIn CAPI failed:', await capiResponse.text());
      } else {
        console.log('LinkedIn CAPI event sent successfully');
      }
    } catch (capiError) {
      console.error('LinkedIn CAPI Error:', capiError);
    }

    // 3. Save to MongoDB
    try {
      await connectToDatabase();
      await Lead.create({
        name,
        phone,
        email,
        website,
        service,
        revenue,
        message,
        status: 'New'
      });
      console.log('Lead saved to MongoDB successfully');
    } catch (dbError) {
      console.error('Error saving lead to MongoDB:', dbError);
      // We don't throw here to avoid failing the whole request if only DB fails
    }

    return NextResponse.json({ message: 'Email sent and conversion tracked successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({
      message: 'Error processing request',
      details: error?.message || String(error)
    }, { status: 500 });
  }
}
