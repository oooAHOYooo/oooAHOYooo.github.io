/**
 * Alternative: Resend-only tracking (simpler, just sends emails)
 * 
 * This version ONLY sends email notifications via Resend - no logging.
 * Good if you just want to be notified of redirects.
 * 
 * Set environment variables in Vercel:
 * - RESEND_API_KEY
 * - NOTIFICATION_EMAIL
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check for Resend API key
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL) {
    return res.status(200).json({
      status: 'success',
      message: 'Tracking disabled (no API key configured)'
    });
  }

  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referer = req.headers['referer'] || req.headers['referrer'] || 'direct';
    
    const data = req.method === 'POST' ? req.body : req.query;
    const source = data?.source || 'ahoy.ooo';
    const target = data?.target || 'app.ahoy.ooo';
    const timestamp = new Date().toISOString();

    // Send email via Resend
    const emailBody = `
New redirect detected!

From: ${source}
To: ${target}
Time: ${timestamp}
IP: ${ip}
User Agent: ${userAgent}
Referer: ${referer}
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Ahoy Redirects <redirects@ahoy.ooo>', // Update with your verified Resend domain
        to: [process.env.NOTIFICATION_EMAIL],
        subject: `Redirect: ${source} → ${target}`,
        text: emailBody
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${response.status} - ${error}`);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Email notification sent'
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    // Still return success so redirect isn't blocked
    return res.status(200).json({
      status: 'error',
      message: error.message
    });
  }
}
