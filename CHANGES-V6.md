# ArabDEV V6 — External product links

## What changed

- Theme and Plugin editors no longer show a Slug field.
- Theme and Plugin editors now show a normal full external URL input.
- Full URLs such as `https://demo.example.com/gulfshop` are preserved correctly.
- Existing `demo_url` database column is reused, so no Supabase schema migration is required.
- Product slugs are generated internally only for database compatibility.
- Theme and Plugin cards open the external URL in a new tab.
- Old `/themes/[slug]` and `/plugins/[slug]` URLs redirect to the external product URL.
- Theme/Plugin detail URLs are removed from the sitemap.
- Articles keep their normal internal Slug field and continue to live under `/blog/[slug]`.

## Update instructions

1. Keep your current `.env.local` file.
2. Replace the project files with this V6 package.
3. Delete `.next`.
4. Run `npm install` if needed.
5. Run `npm run dev`.
6. Open a Theme or Plugin in Admin and paste the full external URL into the new link field.

No SQL migration is needed for this update.
