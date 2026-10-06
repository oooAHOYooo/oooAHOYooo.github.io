const QUERIES = {
  summary: `SELECT count() AS views, uniq(distinct_id) AS visitors, countIf(event = '$pageview' AND timestamp >= now() - INTERVAL 1 DAY) AS views_24h FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 30 DAY`,
  pages: `SELECT properties.$pathname AS path, any(properties.$title) AS title, count() AS views, uniq(distinct_id) AS visitors, max(timestamp) AS last_view FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 30 DAY GROUP BY path ORDER BY views DESC LIMIT 12`,
  hours: `SELECT toHour(toTimeZone(timestamp, 'America/New_York')) AS hour, count() AS views FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 30 DAY GROUP BY hour ORDER BY hour`
};

async function queryPostHog(query) {
  const response = await fetch(`https://us.i.posthog.com/api/projects/${encodeURIComponent(process.env.POSTHOG_PROJECT_ID)}/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } })
  });
  if (!response.ok) throw new Error(`PostHog query failed (${response.status})`);
  const result = await response.json();
  const columns = result.columns || [];
  return (result.results || []).map((row) => {
    if (!Array.isArray(row)) return row;
    return Object.fromEntries(columns.map((column, index) => [column, row[index]]));
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=900');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.POSTHOG_PERSONAL_API_KEY || !process.env.POSTHOG_PROJECT_ID) {
    return res.status(503).json({ error: 'Dashboard setup is incomplete. Add the PostHog environment variables in Vercel.' });
  }

  try {
    const entries = await Promise.all(Object.entries(QUERIES).map(async ([key, query]) => [key, await queryPostHog(query)]));
    return res.status(200).json(Object.fromEntries(entries));
  } catch (error) {
    console.error('Insights query error:', error);
    return res.status(502).json({ error: 'Could not load PostHog data. Check the project ID, API key permissions, and query access.' });
  }
}
