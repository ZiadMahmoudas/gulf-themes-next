# ArabDEV V7 — Premium storefront + speed pass

## What changed
- Rebuilt the public storefront styling instead of stacking more legacy overrides.
- Fixed the oversized/colliding Arabic typography on the About page and Bento section.
- Changed the public Arabic font to IBM Plex Sans Arabic and kept Inter for Latin UI.
- Rebuilt the theme library as a premium 2-column desktop layout with larger previews.
- Theme/plugin cards now use uploaded Supabase cover images when available and lazy-load them.
- Rebuilt the footer with larger readable type, visible ArabDEV logo on dark background, social icons, and clearer contact columns.
- Added active navigation states.
- Added a sticky smart header: shrinks after scrolling, hides on scroll-down, returns on scroll-up.
- Added subtle entrance/view animations with reduced-motion support.
- Added a route loading state for instant feedback during navigation.
- Added `content-visibility` to heavy below-the-fold sections.

## Navigation/performance fixes
- Removed the duplicate root `app/page.tsx`; `/` now comes only from `app/(site)/page.tsx`.
- Public Supabase reads no longer use the cookie/auth SSR client.
- Public content is fetched through Supabase REST with Next.js Data Cache (`revalidate: 300`) and tags.
- Article list queries no longer download full article HTML.
- Admin save/delete actions call `updateTag()` so public cached content refreshes after edits.
- Main internal navigation links explicitly prefetch.

## Important
Keep your existing `.env.local`. This package intentionally does not include private environment values.

For a real speed test use production mode:

```bash
npm install
npm run build
npm start
```

`next dev` compiles routes on first visit, so the first navigation in development can look slower than production.
