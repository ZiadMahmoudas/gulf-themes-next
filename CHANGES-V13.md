# ArabDEV V13 — Storefront Home + Unified Header/Footer

## Fixed
- Removed the duplicate root `app/page.tsx` that was bypassing the `(site)` layout on `/`.
- The homepage now uses `app/(site)/page.tsx`, so the public Header, Footer and SiteEffects wrap it correctly.
- Replaced the old public Header with a unified sticky navigation used across all public pages.
- Replaced the old Footer with a contained footer that cannot visually spill into the previous page section.
- Added safe bottom spacing for Themes, Plugins, About, Contact and Journal page endings.
- Raised the portal mobile menu above the new sticky header.

## Homepage
- Rebuilt as a marketplace/storefront inspired by the information hierarchy of wordpresslicenses.com without copying its visual design.
- Hero with featured Theme + Plugin promotion.
- Continuous, duplicated CSS marquee with no visible jump/gap.
- Browse-by-category section.
- Dark products band for Theme/Plugin cards.
- Custom-build promotional block.
- ArabDEV value/benefit section.
- Journal/articles section.
- Dynamic FAQ section connected to existing public data.

## Visual system
- Keeps ArabDEV palette: off-white / warm sand / gold / near-black.
- Responsive layouts for desktop, tablet and mobile.
- Existing Dashboard/public-data flow is unchanged.
