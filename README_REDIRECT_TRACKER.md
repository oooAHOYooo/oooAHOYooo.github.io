# Redirect Tracker

Simple Python-based tracking for redirects from `ahoy.ooo` to `app.ahoy.ooo`.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the tracker server:**
   ```bash
   python redirect_tracker.py
   ```
   
   The server will run on `http://localhost:5000` by default.

## Configuration

### Update the tracking URL in index.html

When you deploy the tracker server, update the `TRACKER_URL` in `index.html`:

```javascript
const TRACKER_URL = 'https://your-server.com/track'; // Your deployed server URL
```

## Deployment Options

Since GitHub Pages is static, you'll need to host the Python server separately:

### Option 1: Simple VPS/Server
- Deploy the `redirect_tracker.py` script to any server with Python
- Use a process manager like `systemd` or `supervisord` to keep it running
- For production, use a WSGI server like `gunicorn`:
  ```bash
  pip install gunicorn
  gunicorn -w 4 -b 0.0.0.0:5000 redirect_tracker:app
  ```

### Option 2: Railway/Render/Fly.io
- These platforms can host Python apps easily
- Just point them to your `redirect_tracker.py` file

### Option 3: Serverless (AWS Lambda, Vercel, etc.)
- You'd need to adapt the script for serverless, but it's possible

## Endpoints

- `GET/POST /track` - Tracks a redirect event
- `GET /stats` - Returns basic statistics (total redirects, last redirect time)
- `GET /health` - Health check endpoint

## Log File

Redirects are logged to `redirect_logs.csv` in the same directory as the script.

The CSV includes:
- timestamp
- ip_address
- user_agent
- referer
- source_url
- target_url

## Testing Locally

1. Start the tracker: `python redirect_tracker.py`
2. Open `index.html` in a browser (or serve it locally)
3. Check `redirect_logs.csv` for logged redirects
4. Visit `http://localhost:5000/stats` to see statistics

## Notes

- The tracking uses `navigator.sendBeacon()` which works even during page redirects
- Tracking is non-blocking and won't slow down the redirect
- If the tracker server is down, the redirect still works (tracking just fails silently)
