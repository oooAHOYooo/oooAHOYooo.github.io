#!/usr/bin/env node

/**
 * Daily Traffic Report Generator & Resend Dispatcher
 *
 * Gathers traffic data from PostHog (when configured) and GitHub Repository Traffic,
 * formats a daily audience digest, and delivers it via Resend.
 *
 * Configurable Environment Variables:
 * - RESEND_API_KEY: API key from resend.com
 * - NOTIFICATION_EMAIL: Recipient email address
 * - RESEND_FROM_EMAIL: Sender address (default: "AHOY Traffic <onboarding@resend.dev>")
 * - POSTHOG_PERSONAL_API_KEY: PostHog personal API key for queries
 * - POSTHOG_PROJECT_ID: Numeric PostHog project ID
 * - GITHUB_TOKEN: GitHub personal access token or Actions token
 * - GITHUB_REPOSITORY: e.g. "oooAHOYooo/oooAHOYooo.github.io"
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'AHOY Traffic <onboarding@resend.dev>';
const POSTHOG_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPOSITORY || 'oooAHOYooo/oooAHOYooo.github.io';

const today = new Date().toISOString().slice(0, 10);

async function fetchPostHogData() {
  if (!POSTHOG_KEY || !POSTHOG_PROJECT_ID) {
    return null;
  }

  const queryHogQL = async (hogql) => {
    const res = await fetch(`https://us.i.posthog.com/api/projects/${encodeURIComponent(POSTHOG_PROJECT_ID)}/query/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query: hogql } })
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`PostHog query failed (${res.status}): ${errText}`);
    }
    const data = await res.json();
    const cols = data.columns || [];
    return (data.results || []).map((row) => {
      if (!Array.isArray(row)) return row;
      return Object.fromEntries(cols.map((col, idx) => [col, row[idx]]));
    });
  };

  try {
    const [summary24, summary7d, topPages, topReferrers] = await Promise.all([
      queryHogQL(
        `SELECT count() AS views_24h, uniq(distinct_id) AS visitors_24h FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 1 DAY`
      ),
      queryHogQL(
        `SELECT count() AS views_7d, uniq(distinct_id) AS visitors_7d FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY`
      ),
      queryHogQL(
        `SELECT properties.$pathname AS path, any(properties.$title) AS title, count() AS views, uniq(distinct_id) AS visitors FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY GROUP BY path ORDER BY views DESC LIMIT 8`
      ),
      queryHogQL(
        `SELECT properties.$referrer AS referrer, count() AS views FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY AND properties.$referrer != '' GROUP BY referrer ORDER BY views DESC LIMIT 5`
      )
    ]);

    return {
      summary24: summary24[0] || { views_24h: 0, visitors_24h: 0 },
      summary7d: summary7d[0] || { views_7d: 0, visitors_7d: 0 },
      topPages: topPages || [],
      topReferrers: topReferrers || []
    };
  } catch (err) {
    console.error('PostHog query error:', err.message);
    return null;
  }
}

async function fetchGitHubTraffic() {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return null;
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'ahoy-traffic-reporter'
  };

  try {
    const [viewsRes, pathsRes, referrersRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_REPO}/traffic/views`, { headers }),
      fetch(`https://api.github.com/repos/${GITHUB_REPO}/traffic/popular/paths`, { headers }),
      fetch(`https://api.github.com/repos/${GITHUB_REPO}/traffic/popular/referrers`, { headers })
    ]);

    const views = viewsRes.ok ? await viewsRes.json() : null;
    const paths = pathsRes.ok ? await pathsRes.json() : [];
    const referrers = referrersRes.ok ? await referrersRes.json() : [];

    const lastDay = views?.views?.slice(-1)[0] || { count: 0, uniques: 0 };

    return {
      totalViews14d: views?.count || 0,
      totalUniques14d: views?.uniques || 0,
      yesterdayViews: lastDay.count || 0,
      yesterdayUniques: lastDay.uniques || 0,
      popularPaths: paths.slice(0, 8),
      popularReferrers: referrers.slice(0, 5)
    };
  } catch (err) {
    console.error('GitHub Traffic query error:', err.message);
    return null;
  }
}

function buildEmailHtml({ posthog, github }) {
  const views24 = posthog ? posthog.summary24.views_24h : (github?.yesterdayViews ?? 'N/A');
  const visitors24 = posthog ? posthog.summary24.visitors_24h : (github?.yesterdayUniques ?? 'N/A');
  const views7d = posthog ? posthog.summary7d.views_7d : (github?.totalViews14d ?? 'N/A');
  const visitors7d = posthog ? posthog.summary7d.visitors_7d : (github?.totalUniques14d ?? 'N/A');

  const pages = posthog?.topPages?.length
    ? posthog.topPages.map((p) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;"><strong>${p.path || '/'}</strong><br><small style="color:#888;">${p.title || ''}</small></td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${p.views}</td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${p.visitors}</td></tr>`).join('')
    : (github?.popularPaths || []).map((p) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;"><strong>${p.path}</strong><br><small style="color:#888;">${p.title || ''}</small></td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${p.count}</td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${p.uniques}</td></tr>`).join('') || '<tr><td colspan="3" style="padding:12px;color:#888;">No page data recorded yet.</td></tr>';

  const referrers = posthog?.topReferrers?.length
    ? posthog.topReferrers.map((r) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;">${r.referrer}</td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${r.views}</td></tr>`).join('')
    : (github?.popularReferrers || []).map((r) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;">${r.referrer}</td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;">${r.count} (${r.uniques} uniq)</td></tr>`).join('') || '<tr><td colspan="2" style="padding:12px;color:#888;">Direct / None</td></tr>';

  const sourceNote = posthog
    ? 'Analytics source: PostHog'
    : github
      ? 'Analytics source: GitHub Repository Traffic'
      : 'No active remote analytics credentials detected';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AHOY Traffic Update · ${today}</title>
</head>
<body style="margin:0;padding:24px;background:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;color:#f0f6fc;">
  <div style="max-width:620px;margin:0 auto;background:#161b22;border:1px solid #30363d;border-radius:14px;padding:28px;">
    
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;border-bottom:1px solid #21262d;padding-bottom:16px;">
      <div>
        <h1 style="margin:0;font-size:22px;color:#ffffff;letter-spacing:-0.02em;">AHOY Daily Traffic</h1>
        <p style="margin:4px 0 0;font-size:13px;color:#8b949e;">Report for ${today} · <a href="https://ahoy.ooo" style="color:#58a6ff;text-decoration:none;">ahoy.ooo</a></p>
      </div>
      <span style="font-size:11px;font-weight:600;padding:4px 10px;background:#238636;color:#ffffff;border-radius:20px;text-transform:uppercase;letter-spacing:0.06em;">Daily</span>
    </div>

    <!-- Stat Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
      <div style="padding:16px;background:#0d1117;border:1px solid #30363d;border-radius:10px;">
        <div style="font-size:12px;color:#8b949e;text-transform:uppercase;letter-spacing:0.05em;">Views (24h)</div>
        <div style="font-size:28px;font-weight:700;color:#58a6ff;margin-top:6px;">${views24}</div>
      </div>
      <div style="padding:16px;background:#0d1117;border:1px solid #30363d;border-radius:10px;">
        <div style="font-size:12px;color:#8b949e;text-transform:uppercase;letter-spacing:0.05em;">Visitors (24h)</div>
        <div style="font-size:28px;font-weight:700;color:#7ee787;margin-top:6px;">${visitors24}</div>
      </div>
      <div style="padding:16px;background:#0d1117;border:1px solid #30363d;border-radius:10px;">
        <div style="font-size:12px;color:#8b949e;text-transform:uppercase;letter-spacing:0.05em;">Views (7 Days)</div>
        <div style="font-size:24px;font-weight:700;color:#d2a8ff;margin-top:6px;">${views7d}</div>
      </div>
      <div style="padding:16px;background:#0d1117;border:1px solid #30363d;border-radius:10px;">
        <div style="font-size:12px;color:#8b949e;text-transform:uppercase;letter-spacing:0.05em;">Visitors (7 Days)</div>
        <div style="font-size:24px;font-weight:700;color:#ffa657;margin-top:6px;">${visitors7d}</div>
      </div>
    </div>

    <!-- Top Pages -->
    <div style="margin-bottom:24px;">
      <h3 style="margin:0 0 10px;font-size:15px;color:#f0f6fc;">Top Visited Content</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="color:#8b949e;text-align:left;font-size:11px;text-transform:uppercase;">
            <th style="padding:6px 12px;border-bottom:1px solid #30363d;">Page</th>
            <th style="padding:6px 12px;border-bottom:1px solid #30363d;text-align:right;">Views</th>
            <th style="padding:6px 12px;border-bottom:1px solid #30363d;text-align:right;">Uniques</th>
          </tr>
        </thead>
        <tbody>
          ${pages}
        </tbody>
      </table>
    </div>

    <!-- Referrers -->
    <div style="margin-bottom:24px;">
      <h3 style="margin:0 0 10px;font-size:15px;color:#f0f6fc;">Top Referrers</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="color:#8b949e;text-align:left;font-size:11px;text-transform:uppercase;">
            <th style="padding:6px 12px;border-bottom:1px solid #30363d;">Referrer</th>
            <th style="padding:6px 12px;border-bottom:1px solid #30363d;text-align:right;">Views</th>
          </tr>
        </thead>
        <tbody>
          ${referrers}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding-top:16px;border-top:1px solid #21262d;font-size:12px;color:#8b949e;display:flex;justify-content:space-between;">
      <span>${sourceNote}</span>
      <span><a href="https://ahoy.ooo/insights" style="color:#58a6ff;text-decoration:none;">Live Insights Dashboard →</a></span>
    </div>
  </div>
</body>
</html>
  `.trim();
}

async function sendEmail(html) {
  if (!RESEND_API_KEY || !NOTIFICATION_EMAIL) {
    console.log('\n[DRY RUN] RESEND_API_KEY or NOTIFICATION_EMAIL is not set.');
    console.log('To deliver daily emails, add RESEND_API_KEY and NOTIFICATION_EMAIL to your GitHub Repository Secrets.');
    console.log('\n--- Generated Email HTML Preview ---\n');
    console.log(html);
    return;
  }

  console.log(`Sending daily traffic digest to ${NOTIFICATION_EMAIL} via Resend...`);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [NOTIFICATION_EMAIL],
      subject: `AHOY Traffic Update · ${today}`,
      html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log('Daily traffic digest successfully sent via Resend:', result.id);
}

async function main() {
  console.log(`Generating daily traffic report for ${today}...`);
  const [posthog, github] = await Promise.all([
    fetchPostHogData(),
    fetchGitHubTraffic()
  ]);

  const html = buildEmailHtml({ posthog, github });
  await sendEmail(html);
}

main().catch((err) => {
  console.error('Fatal error generating daily traffic report:', err);
  process.exit(1);
});
