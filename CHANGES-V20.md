# ArabDEV V20

## Product URLs
- Product slug is now visible and editable in Theme/Plugin admin.
- The slug field shows the real internal URL (`/plugins/...` or `/themes/...`).
- A `من الاسم` button regenerates a clean slug from the product name.
- Changing a product name no longer leaves you unable to correct the old legacy URL.

## Product videos
- Added `video_url` to themes and plugins.
- Added MP4/WebM/MOV upload directly from the product editor.
- Video is stored in the existing public Supabase `media` bucket.
- Product detail pages render the uploaded video with native controls and the cover as poster.
- Upload limit is 30MB to protect site speed. Short compressed videos are recommended.

## Conversion / sales UX
- Added a clear `اطلبه الآن` WhatsApp CTA on product pages.
- Added a strong conversion band after the details without fake countdowns or fake scarcity.
- Added a home sales strip that explains the real value: start faster instead of building from zero.
- Added subtle CTA pulse with reduced-motion support.

## Home hero typography
- Removed mixed Arabic/English text from the same headline line.
- WordPress now has a separate Latin treatment so Arabic line-height and bidi no longer collide.

## Required database migration
Run `supabase/v20-update.sql` once before saving products with videos.
