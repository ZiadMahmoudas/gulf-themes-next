# ArabDEV V17

## Admin login stability

- Fixed `/admin/login` Server Action crashing with HTTP 500 when Supabase environment variables are missing on Vercel.
- Added an explicit runtime configuration check before creating the Supabase server client.
- Added a defensive Supabase connection/auth catch with a friendly login error instead of a generic production crash page.
- Updated the Arabic configuration error to point directly to Vercel Environment Variables + redeploy.
- No public signup was added: `/admin` remains owner-only by design.
