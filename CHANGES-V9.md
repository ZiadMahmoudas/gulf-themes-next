# ArabDEV V9 — Hydration + Lenis stability fix

## Fixed

- Removed DOM `is-visible` mutations from the global reveal system.
  - This was the exact cause of the React hydration mismatch on `/blog` where the server returned `article-card` while the browser already had `article-card is-visible`.
- Reveal motion is now CSS-only and content is never hidden waiting for JavaScript.
- Rebuilt Lenis initialization with an explicit requestAnimationFrame loop instead of `autoRaf`.
- Lenis recalculates its limit after each Next.js route change.
- Removed `content-visibility:auto` from main homepage sections because it caused scroll-height/pop-in issues with smooth scrolling.
- Removed unnecessary logo preloads:
  - only the header brand is priority-loaded;
  - footer/admin/article copies are normal images;
  - added a correct `sizes` hint.
- Bumped project version to `0.9.0`.

## About the `VM... startTime` console error

There is no `startTime` reference in ArabDEV source code. A stack beginning with `VMxxxx` and `<anonymous>` is normally injected runtime code (browser extension / DevTools instrumentation). Test in an Incognito window with extensions disabled if it remains after the hydration error is gone.

## After replacing the project

Delete `.next` before restarting so the old client bundle cannot survive:

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

For real navigation-speed testing use:

```powershell
npm run build
npm start
```
