# ArabDEV V24 — Rich Editor + Vercel build fix

## Article editor
- `P / H1 / H2 / H3 / H4 / H5 / H6` selector is kept in one clear dropdown.
- Added a font-size selector: `12 / 14 / 16 / 18 / 22 / 28 / 36px`.
- Added `+ رفع صورة هنا`: the selected image uploads to Supabase Storage bucket `media` and is inserted at the saved caret position inside the article body.
- Image caption stays editable in the content area.
- Public article styles now explicitly support inline media and custom inline text sizes.
- Editor marker is now `EDITOR V24` so you can immediately verify that the new deployment is live.

## Vercel / build stability
- Fixed the TypeScript build error in `deleteProduct`: `productSlug` was referenced outside its scope.
- Removed the duplicate `/` route (`app/(site)/page.tsx`) permanently instead of deleting it at build time.
- Removed the cleanup prebuild hook; `npm run build` is now a normal `next build`.
- Added Node engine requirement `>=20.9.0`.
