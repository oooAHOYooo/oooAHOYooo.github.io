# Ahoy Insights setup

The dashboard lives at `/insights/`. Its page is unlisted and excluded from search indexing; the API enforces access, so the URL itself is not treated as a secret.

In Vercel, set these environment variables for the production deployment:

- `POSTHOG_PERSONAL_API_KEY`: a PostHog personal API key with permission to run queries for this project. Keep it server-side; never add it to the HTML or public analytics script.
- `POSTHOG_PROJECT_ID`: the numeric project ID from PostHog project settings.
- `FIREBASE_WEB_API_KEY`: the Firebase web API key for the existing Ahoy ID project (`ahoy-indie-media-da86d`).

The owner gate currently allows the verified Firebase account `alex@ahoy.ooo`. The browser signs in with Firebase and sends its short-lived ID token to `/api/insights`; the function checks the token with Google before using the PostHog key. Only the function can query PostHog.

The dashboard reads `$pageview` events and `$identify` events already in PostHog. At present, site page views are tracked, but account signup events and Ahoy ID identities are not connected to PostHog. To report actual new account totals, add a server-verified account-created event when Ahoy ID signup completes, with a stable account ID and timestamp. Do not send emails, passwords, or other personal data as event properties. Historical signup totals cannot be recovered from PostHog if those events were never recorded; Firebase account data would need a separate authorized source.

The hourly chart is shown in America/New_York time. Page view and visitor totals cover 30 days; recent activity covers 7 days.
