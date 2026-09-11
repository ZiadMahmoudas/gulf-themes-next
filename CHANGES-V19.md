# ArabDEV V19 — Product Details Flow + Footer Fix

## Product flow
- Theme and plugin cards no longer open the external demo directly.
- Every theme opens `/themes/[slug]` first.
- Every plugin opens `/plugins/[slug]` first.
- External `demo_url` is now used only by the **شاهد الآن** button inside the product details page.
- Added a hover/touch overlay: **شاهد التفاصيل**.
- Home hero, store cards and featured products now open the internal product page first.

## Product details pages
- New editorial product page with:
  - cover image from the dashboard
  - category, status, label and price
  - short description
  - features
  - rich HTML content from the dashboard
  - theme gallery when available
  - WhatsApp product enquiry CTA
  - external **شاهد الآن** CTA
  - Product / SoftwareApplication structured data
- Product `content_html` is now loaded from Supabase for themes and plugins.

## SEO
- Theme and plugin detail pages are now indexed in `sitemap.xml`.
- Added page-level metadata, canonical URLs and Open Graph data.

## Footer
- Footer brand block is aligned correctly for RTL.
- Social icons are placed directly below the logo at the beginning of the footer brand area.
- Footer spacing/order was cleaned up on desktop, tablet and mobile.

## Note
- No database migration is required. V19 reuses the existing `demo_url`, `content_html`, `gallery`, cover image, features and product fields.
