"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Public-site motion controller.
 *
 * Important: this component deliberately DOES NOT add/remove classes on
 * server-rendered content nodes. Mutating classes like `is-visible` while a
 * streamed Next.js route is hydrating can produce React hydration mismatches.
 * Reveal animations are CSS-only in V9.
 */
export function SiteEffects() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.86,
      touchMultiplier: 1,
      autoResize: true,
      anchors: { offset: -76 },
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis-ready");

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = window.requestAnimationFrame(raf);
    };

    rafRef.current = window.requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis-ready");
      lenis.destroy();
    };
  }, []);

  // A streamed route can change the document height after navigation. Let the
  // browser commit it, then tell Lenis to recalculate its scroll limits.
  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  return null;
}
