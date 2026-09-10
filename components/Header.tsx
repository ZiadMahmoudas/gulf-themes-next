"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { Brand } from "@/components/Brand";
import { whatsappUrl } from "@/lib/site";

const navItems = [
  { href: "/themes", label: "القوالب" },
  { href: "/plugins", label: "الإضافات" },
  { href: "/blog", label: "المقالات" },
  { href: "/about", label: "عن ArabDEV" },
  { href: "/contact", label: "تواصل" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY.current;
      setScrolled(y > 18);

      if (y < 96) {
        setHidden(false);
      } else if (Math.abs(delta) > 7) {
        setHidden(delta > 0);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setHidden(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isJournal = pathname.startsWith("/blog/");

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}${isJournal ? " is-journal" : ""}`}>
      <div className="announcement">
        <div className="shell">
          <span>Arab-first WordPress products</span>
          <i>✦</i>
          <span>Saudi · UAE · GCC</span>
        </div>
      </div>

      <div className="shell nav-wrap">
        <Brand priority />

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={isActive(item.href) ? "is-active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-cta"
            href={whatsappUrl("مرحباً، أريد الاستفسار عن ArabDEV")}
            target="_blank"
            rel="noreferrer"
          >
            <span className="nav-cta-dot" />
            واتساب
            <b>↗</b>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
