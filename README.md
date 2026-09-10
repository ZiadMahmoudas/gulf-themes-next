# ArabDEV V11

Premium Arabic-first WordPress Themes / Plugins / Content platform built with Next.js + Supabase.

**V11 highlights:** rebuilt marketplace homepage, dashboard-driven product images, 3-column article library, editable FAQs, SEO FAQ schema, and more defensive Vercel admin auth routing.

See `V11-INSTALL.txt` and `CHANGES-V11.md`.

---

# ArabDEV V8 — Premium Storefront + Supabase CMS

ArabDEV is a Next.js storefront for Arabic-first WordPress themes, plugins, editorial articles and custom work. The public site reads published content from Supabase; `/admin` remains owner-only.

## V8 highlights

- Lenis smooth scrolling (`lenis@1.3.26`) with reduced-motion fallback.
- Sticky smart navbar: follows the page, shrinks after scroll, hides on down-scroll and returns on up-scroll.
- Mobile menu rendered through a React portal so it cannot be clipped by the sticky header.
- New clear “What we do” section: Themes / Plugins / Custom Development.
- Article cards are now visual editorial cards with featured image, title, excerpt and “اقرأ المزيد”.
- Premium article page: large cover image, ArabDEV journal branding, latest articles sidebar, full sharing controls and reading layout.
- Sharing: Facebook, X, LinkedIn, WhatsApp, Telegram, copy link + native mobile share.
- Contact form fields are clearer; the select has a branded control style.
- Footer hierarchy and social alignment rebuilt to avoid clipping/overlap.
- Favicon / Apple icon / default Open Graph cover added from the ArabDEV identity.
- Google Search Console verification hook added to Next Metadata.
- Existing sitemap, robots.txt, RSS, canonical URLs and Article/Breadcrumb schema remain active.

## Keep your current `.env.local`

Do **not** overwrite your working Supabase / EmailJS credentials. Add only this optional line when you are ready for Google Search Console:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=PASTE_GOOGLE_HTML_TAG_CONTENT_HERE
```

Use only the `content` value from Google's HTML tag. Example: if Google gives:

```html
<meta name="google-site-verification" content="abc123" />
```

put only:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123
```

Then restart or redeploy the site.

## Run

```bash
npm install
npm run dev
```

For real performance testing, use production mode:

```bash
npm run build
npm start
```

Development mode compiles routes on first navigation and can feel slower than production.

## Search Console checklist after the real domain is connected

1. Set `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com`.
2. Add the Google verification content value to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Redeploy.
4. Verify the URL-prefix property in Google Search Console.
5. Submit `https://your-real-domain.com/sitemap.xml`.
6. Request indexing for the home page and your first strong article.

## Important

Themes and plugins keep external product/demo URLs. Articles stay internal under `/blog/[slug]` so ArabDEV builds its own search authority.

## V10 notes
- Main public UI uses Alexandria Arabic typography and editorial Unsplash photography.
- Article pages use the new dark Journal design.
- Google Search Console HTML verification is already wired. See `GOOGLE-SEARCH-CONSOLE.txt` for the DNS TXT record and sitemap steps.
- Replace Unsplash fallback images naturally by uploading real cover images from the Admin dashboard.
