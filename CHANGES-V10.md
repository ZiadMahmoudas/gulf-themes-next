# ArabDEV V10 — Editorial Storefront / Journal / SEO

## Public website
- Rebuilt the home hero around real external Unsplash photography instead of a generic browser mockup.
- Clearer Arabic copy explaining exactly what ArabDEV sells: WordPress themes, plugins, and custom development.
- New three-part service rail and editorial proof section.
- Theme and plugin cards now use professional photographic fallbacks until a real dashboard cover is uploaded.
- Article cards always have a strong image, title, excerpt, metadata, and read-more action.

## Typography
- Arabic UI moved to Alexandria with a single consistent scale for headings and body copy.
- Improved Arabic line-height, weight, and mixed Arabic/English title behavior.

## Article page
- Entire article experience is now a dark editorial Journal layout.
- Large feature image at top.
- ArabDEV logo/masthead.
- Latest articles rail.
- Article title/deck/meta.
- Social sharing: Facebook, X, LinkedIn, WhatsApp, Telegram, copy/native share.
- Rich content styling and related articles.

## Smooth scrolling / motion
- Lenis tuned with duration/easing rather than a tiny lerp value for a more noticeable but controlled smooth scroll.
- Existing hydration-safe reveal system retained.

## Favicon
- Replaced app icon with the favicon image supplied by the user.
- Added 32px icon and 180px Apple touch icon.

## Google Search Console
- Google HTML meta token is wired into Next Metadata.
- DNS TXT record is documented in GOOGLE-SEARCH-CONSOLE.txt.
- Sitemap, robots and RSS remain available.

## External images
- External photographs are served from images.unsplash.com with optimized width/quality query parameters.
- Hero uses fetchPriority=high; non-critical images use lazy loading.
