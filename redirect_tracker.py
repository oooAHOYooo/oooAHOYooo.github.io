#!/usr/bin/env python3
"""
Simple redirect tracker for ahoy.ooo -> app.ahoy.ooo
Logs redirect events to a CSV file.

Usage:
    python redirect_tracker.py

The server will run on http://localhost:5000 by default.
Change the port and host in the __main__ section if needed.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Allow requests from your domain

# Path to log file (in the same directory as the script)
LOG_FILE = Path(__file__).parent / 'redirect_logs.csv'

def init_log_file():
    """Create log file with headers if it doesn't exist"""
    if not LOG_FILE.exists():
        with open(LOG_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                'timestamp',
                'ip_address',
                'user_agent',
                'referer',
                'source_url',
                'target_url'
            ])

def log_redirect(ip, user_agent, referer, source_url, target_url):
    """Log a redirect event to CSV"""
    timestamp = datetime.now().isoformat()
    
    with open(LOG_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            timestamp,
            ip,
            user_agent or 'Unknown',
            referer or 'Direct',
            source_url,
            target_url
        ])

@app.route('/track', methods=['GET', 'POST'])
def track_redirect():
    """Endpoint to track redirect events"""
    try:
        # Get client IP (handles proxies)
        ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        if ip:
            ip = ip.split(',')[0].strip()
        
        # Get request data
        user_agent = request.headers.get('User-Agent', '')
        referer = request.headers.get('Referer', '')
        
        # Get source and target from query params or JSON body
        if request.method == 'POST':
            data = request.get_json() or {}
            source_url = data.get('source', 'ahoy.ooo')
            target_url = data.get('target', 'app.ahoy.ooo')
        else:
            source_url = request.args.get('source', 'ahoy.ooo')
            target_url = request.args.get('target', 'app.ahoy.ooo')
        
        # Log the redirect
        log_redirect(ip, user_agent, referer, source_url, target_url)
        
        return jsonify({
            'status': 'success',
            'message': 'Redirect tracked'
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get basic statistics from the log file"""
    if not LOG_FILE.exists():
        return jsonify({
            'total_redirects': 0,
            'message': 'No redirects logged yet'
        })
    
    try:
        with open(LOG_FILE, 'r') as f:
            reader = csv.DictReader(f)
            redirects = list(reader)
        
        return jsonify({
            'total_redirects': len(redirects),
            'last_redirect': redirects[-1]['timestamp'] if redirects else None
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    # Initialize log file
    init_log_file()
    
    print(f"Redirect tracker starting...")
    print(f"Log file: {LOG_FILE}")
    print(f"Tracking endpoint: http://localhost:5000/track")
    print(f"Stats endpoint: http://localhost:5000/stats")
    print(f"\nPress Ctrl+C to stop\n")
    
    # Run the server
    # For production, use a proper WSGI server like gunicorn
    app.run(host='0.0.0.0', port=5000, debug=True)
