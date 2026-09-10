"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isJournal = pathname.startsWith("/blog/");

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${isJournal ? " is-journal" : ""}`}>
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
            <Link key={item.href} href={item.href} prefetch className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={whatsappUrl("مرحباً، أريد الاستفسار عن ArabDEV")} target="_blank" rel="noreferrer">
            <span className="nav-cta-dot" />واتساب<b>↗</b>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
