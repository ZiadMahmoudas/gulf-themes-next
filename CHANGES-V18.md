# V18 — Admin final fix

- Removed the old raw `process.env` gate from `lib/admin.ts` that could redirect a valid session back to `?error=supabase`.
- Added one normalized Supabase config source in `lib/supabase/config.ts`.
- Supports `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or `NEXT_PUBLIC_SUPABASE_KEY`.
- Added a public-key/project-URL fallback so Vercel env scoping cannot block the admin login for this project.
- Updated browser/server/proxy Supabase clients to use the same config.
- Login now distinguishes wrong credentials from a real network/service failure.
- Added `/api/supabase-health` diagnostic endpoint; it never exposes the key.
