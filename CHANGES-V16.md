# V16 — Load More Store

- Replaced the two bottom store links with a single `تحميل المزيد` button.
- Store initially renders 4 items, then loads 4 more per click.
- Load More appears only when the active filter has more products to show.
- Changing filters resets pagination back to the first 4 matching products.
- Filter counts always use the complete product collection, so newly added products are included automatically.
- Empty filter state remains supported.
