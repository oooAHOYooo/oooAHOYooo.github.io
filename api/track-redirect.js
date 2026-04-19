/**
 * Vercel Serverless Function for tracking redirects
 * 
 * This works with static sites! Just deploy to Vercel and it will handle the serverless function.
 * 
 * To use:
 * 1. Deploy this repo to Vercel (vercel.com)
 * 2. Update TRACKER_URL in index.html to: 'https://your-domain.vercel.app/api/track-redirect'
 * 
 * Optional: Add environment variables in Vercel dashboard:
 * - RESEND_API_KEY (if using Resend email notifications)
 * - NOTIFICATION_EMAIL (email to send notifications to)
 */

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get client info
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.connection?.remoteAddress || 
               'unknown';
    
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referer = req.headers['referer'] || req.headers['referrer'] || 'direct';
    
    // Get data from request
    const data = req.method === 'POST' ? req.body : req.query;
    const source = data?.source || 'ahoy.ooo';
    const target = data?.target || 'app.ahoy.ooo';
    const timestamp = new Date().toISOString();

    // Log the redirect (you can extend this to save to a database, Airtable, etc.)
    console.log('Redirect tracked:', {
      timestamp,
      ip: ip.split(',')[0].trim(),
      userAgent,
      referer,
      source,
      target
    });

    // Optional: Send email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await sendResendNotification({
          timestamp,
          ip: ip.split(',')[0].trim(),
          userAgent,
          referer,
          source,
          target
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Return success
    return res.status(200).json({
      status: 'success',
      message: 'Redirect tracked'
    });

  } catch (error) {
    console.error('Error tracking redirect:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

/**
 * Send email notification via Resend
 */
async function sendResendNotification(data) {
  // Only send email for the first redirect of the day (to avoid spam)
  // You can customize this logic
  
  const emailBody = `
    New redirect from ${data.source} to ${data.target}
    
    Time: ${data.timestamp}
    IP: ${data.ip}
    User Agent: ${data.userAgent}
    Referer: ${data.referer}
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'Ahoy Redirects <redirects@ahoy.ooo>', // Update with your verified domain
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `Redirect: ${data.source} → ${data.target}`,
      text: emailBody
    })
  });

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.statusText}`);
  }

  return response.json();
}
