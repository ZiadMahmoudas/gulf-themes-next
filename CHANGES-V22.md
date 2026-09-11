# ArabDEV V22

- Rebuilt the article editor toolbar so P + H1 + H2 + H3 + H4 + H5 + H6 are always visible.
- Added active block indication and a visible `EDITOR V22` badge so deployment can be verified.
- Added separate formatting row: bold, italic, unordered list, ordered list, link, image, undo, redo, clear formatting.
- Fixed image insertion by preserving/restoring the caret before the file picker opens.
- Added explicit Supabase admin-session check and visible upload errors/success messages.
- Restricted article image input to the Storage-supported formats: JPG, PNG, WEBP, GIF; max 10MB.
- Inserted article images as semantic `<figure>` blocks with editable captions.
- Improved featured image/video upload diagnostics in MediaUpload.
- Reworked editor P/H1–H6 typography using the Arabic font with zero Arabic letter-spacing and readable line heights.
- Matched front-end article semantic typography to the editor.
- Fixed the home hero Arabic headline spacing and separated the WordPress signature so text no longer collides.
