# ArabDEV V15

## Homepage fixes

- Fixed the black announcement marquee so it stays visually full across the entire viewport with no dead/empty gap during animation.
- Rebalanced the homepage hero typography for desktop widths: smaller headline, controlled line breaks, tighter vertical rhythm, and a better image/text ratio.
- Kept `WordPress` together with the Arabic title instead of allowing the word to fall onto an awkward separate line.
- Reduced oversized section headings to a more consistent storefront scale.

## Working store filters

- Converted the homepage filter pills from decorative spans into real interactive buttons.
- Added working filters for:
  - All products
  - Themes
  - Plugins
  - WooCommerce
- Added product counts inside the filter pills.
- Added a subtle entry transition when switching filters.
- Product cards now link to their own internal product page when no external demo URL is configured.

## FAQ

- Replaced native `<details>` animation with an accessible controlled accordion.
- FAQ opening and closing now animate smoothly in both directions.
- The plus icon rotates smoothly and the open item gets a subtle background state.
- Only one FAQ is open at a time; clicking the open item closes it.

## Files added

- `components/HomeStore.tsx`
- `components/HomeFaq.tsx`
