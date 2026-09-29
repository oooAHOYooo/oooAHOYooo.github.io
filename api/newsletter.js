/**
 * Vercel Serverless Function for Newsletter Signups via Resend
 *
 * Submits to: /api/newsletter
 *
 * Environment variables configured in Vercel:
 * - RESEND_API_KEY: Your Resend API key
 * - NOTIFICATION_EMAIL: Target email for subscriber notifications (defaults to alex@ahoy.ooo)
 * - RESEND_FROM_EMAIL: Sender address (defaults to AHOY Newsletter <newsletter@ahoy.ooo>)
 * - RESEND_AUDIENCE_ID: (Optional) Resend Audience ID to store contacts for broadcast
 */

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'alex@ahoy.ooo';
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || 'AHOY Newsletter <newsletter@ahoy.ooo>';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse email from JSON, form-encoded body, or query
  let email = req.body?.email;
  if (!email && typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      email = parsed.email;
    } catch (_) {
      const params = new URLSearchParams(req.body);
      email = params.get('email');
    }
  }
  if (!email && req.query?.email) {
    email = req.query.email;
  }

  email = (email || '').trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const timestamp = new Date().toISOString();
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'unknown';
  const referer = req.headers['referer'] || req.headers['referrer'] || 'direct';

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      // 1. Send notification email to the site owner
      const notifyResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [NOTIFICATION_EMAIL],
          subject: `New AHOY Newsletter Subscriber: ${email}`,
          text: `A new member just subscribed to the AHOY newsletter!\n\nEmail: ${email}\nTime: ${timestamp}\nIP: ${ip}\nReferer: ${referer}`
        })
      });

      if (!notifyResponse.ok) {
        const errText = await notifyResponse.text();
        console.error('Resend notification error:', notifyResponse.status, errText);
      }

      // 2. If a Resend Audience ID is configured, add them as a contact
      if (process.env.RESEND_AUDIENCE_ID) {
        try {
          await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              email,
              unsubscribed: false
            })
          });
        } catch (audErr) {
          console.error('Resend audience error:', audErr);
        }
      }
    } catch (err) {
      console.error('Resend dispatch error:', err);
    }
  } else {
    console.warn('RESEND_API_KEY not configured. Recorded subscriber:', email);
  }

  const isJson = req.headers['accept']?.includes('application/json') || req.headers['content-type']?.includes('application/json');

  if (isJson) {
    return res.status(200).json({ ok: true, message: 'Subscribed successfully' });
  }

  return res.redirect(303, '/#newsletter');
}
