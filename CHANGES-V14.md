# ArabDEV V14 — Home Storefront Fix

## What actually caused the old homepage to keep appearing
The project had a root route at `app/page.tsx`. That route wins for `/` and it does not inherit `app/(site)/layout.tsx`, so replacing only `app/(site)/page.tsx` does not change the homepage the user is seeing.

## V14 fix
- The canonical homepage is now `app/page.tsx`.
- The duplicate `app/(site)/page.tsx` is removed.
- The root homepage explicitly renders the shared `Header`, `SiteEffects`, and `Footer`.
- `npm run dev` and `npm run build` run a cleanup script first, removing a stale `app/(site)/page.tsx` if an older version was copied over this one.

## New homepage
Rebuilt as a real WordPress-product storefront rather than an editorial showcase:
- Hero with one featured theme + plugin + custom-build card.
- Continuous marquee with two identical tracks and no jump at the loop point.
- Category grid similar in information architecture to established WordPress stores.
- Popular products grid with Theme/Plugin labels, status, price and direct action.
- Custom WordPress promotional banner.
- Featured picks section.
- Arabic-first / Mobile-first / Performance / Support trust band.
- Journal cards.
- FAQ section from the Dashboard/Supabase source.
- Existing V13 navbar/footer are preserved.

## Data
Themes, plugins, articles and FAQs still come from `lib/public-data.ts`, so Dashboard/Supabase content continues to feed the homepage. Fallback content still works when Supabase is not configured.
