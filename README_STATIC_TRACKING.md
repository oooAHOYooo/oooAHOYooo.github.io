# Static Site Redirect Tracking

Two options for tracking redirects on your static GitHub Pages site:

## Option 1: Vercel Serverless Function (Recommended)

Works perfectly with static sites! Vercel automatically handles the serverless function.

### Setup:

1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Vercel will automatically detect and deploy

2. **Set Environment Variables** (optional, for email notifications):
   - In Vercel dashboard → Settings → Environment Variables:
     - `RESEND_API_KEY` - Your Resend API key
     - `NOTIFICATION_EMAIL` - Email to receive notifications

3. **Update `index.html`:**
   ```javascript
   const TRACKER_URL = 'https://your-project.vercel.app/api/track-redirect';
   ```

4. **Get Resend API Key** (if using email notifications):
   - Sign up at [resend.com](https://resend.com)
   - Create an API key
   - Verify your domain (or use their test domain)
   - Add the API key to Vercel environment variables

## Option 2: Resend-Only (Simpler)

If you only want email notifications (no logging), use `api/track-redirect-resend.js`:

1. Same setup as Option 1, but use:
   ```javascript
   const TRACKER_URL = 'https://your-project.vercel.app/api/track-redirect-resend';
   ```

## Option 3: Webhook Services (No Code)

You can also use webhook services that work with static sites:

### A. Webhook.site
- Go to [webhook.site](https://webhook.site)
- Get your unique URL
- Use that as `TRACKER_URL` in `index.html`
- View redirects in real-time on their dashboard

### B. Zapier/Make.com Webhooks
- Create a webhook trigger
- Use the webhook URL as `TRACKER_URL`
- Connect to Google Sheets, Airtable, etc. for logging

### C. Airtable Webhook
- Create an Airtable base
- Use Zapier/Make to create a webhook
- Logs automatically go to Airtable

## Testing Locally

You can test the Vercel function locally:

```bash
npm i -g vercel
vercel dev
```

Then update `index.html` to use `http://localhost:3000/api/track-redirect`

## Which Option Should I Use?

- **Vercel + Resend**: Best for production, gives you both logging and email notifications
- **Resend-only**: Simplest, just email notifications
- **Webhook.site**: Easiest for testing, no setup needed
- **Zapier/Airtable**: Best if you want to analyze data in spreadsheets

## Notes

- All tracking is non-blocking - redirects work even if tracking fails
- Vercel has a generous free tier (100GB bandwidth, 100 hours function execution)
- Resend free tier: 3,000 emails/month, 100 emails/day
- The serverless function automatically scales and you don't need to manage a server!
