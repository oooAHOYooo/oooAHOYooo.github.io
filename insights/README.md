# Ahoy Insights setup

The dashboard lives at `/insights/`. It is public for anyone with the URL and excluded from search indexing. It returns aggregated page view, visitor, and hourly totals; it does not publish visitor-level activity, names, email addresses, or account identities. The API response is cached briefly to reduce repeat queries to PostHog.

In Vercel, set these environment variables for the production deployment:

- `POSTHOG_PERSONAL_API_KEY`: a PostHog personal API key with permission to run queries for this project. Keep it server-side; never add it to the HTML or public analytics script.
- `POSTHOG_PROJECT_ID`: the numeric project ID from PostHog project settings.
- The PostHog key remains server-side. The public page calls the API, which returns only the aggregate queries defined in `api/insights.js`.

The dashboard reads `$pageview` events already in PostHog. Ahoy ID signups and identities are not connected to these analytics, so account totals are not included.

The hourly chart is shown in America/New_York time. Page view and visitor totals cover 30 days; recent activity covers 7 days.
