# ArabDEV V12

## What is actually new
- Home page rebuilt from scratch with a storefront / marketplace information architecture.
- Hero now features a real published theme and uses its Dashboard cover image first.
- Added quick product categories inspired by established WordPress stores, without copying their design.
- Added dark "latest products" catalog mixing Themes and Plugins.
- Added a clearer Arabic-first value section, article grid, metrics, dynamic FAQ, and final CTA.
- Header no longer disappears while scrolling; it stays sticky and only shrinks/blurs.
- Exact user-supplied AD mark is now the favicon source.
- Generated `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, and public fallbacks from that mark.
- Product and article images continue to prefer Supabase Dashboard images, using Unsplash only when no image exists.
- Existing Supabase, EmailJS, SEO verification, sitemap, robots, RSS, dashboard and FAQ schema remain intact.

## No database migration required
V12 does not add new tables. If you already ran V11 FAQ migration, there is no new SQL to run.
