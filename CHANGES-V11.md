# ArabDEV V11

## Public home
- Rebuilt the homepage as a premium WordPress products marketplace/studio.
- Featured product hero uses the first published Theme cover from Supabase; Unsplash is fallback only.
- Added product/category discovery strip for Themes, Plugins, Elementor and custom work.
- Added 3-column Theme, Plugin and Article collections on desktop.
- Added clear Arabic copy explaining what ArabDEV sells and who it serves.
- Added a dark value-proposition section and a direct WhatsApp recommendation CTA.
- Added editable FAQ section with FAQPage structured data for SEO.
- Header/Footer stay inside the shared public layout and remain present on all public pages.

## Dashboard / FAQ CMS
- New `/admin/faqs` section.
- Add / edit / delete / hide / reorder FAQs from Supabase.
- Run `supabase/v11-update.sql` once on an existing database.

## Stability / Vercel
- Site URL is normalized so `NEXT_PUBLIC_SITE_URL` cannot break `metadataBase` when the scheme is omitted.
- Supabase proxy no longer crashes a request if auth claim refresh temporarily fails.
- This makes `/admin/login` render more defensively on Vercel; environment variables are still required for login itself.

## Existing features kept
- Supabase CMS for Themes / Plugins / Articles / Media / Messages.
- EmailJS contact form.
- Google verification metadata.
- Sitemap, robots, RSS, OpenGraph and JSON-LD.
- Lenis smooth scrolling without DOM class mutation during hydration.
