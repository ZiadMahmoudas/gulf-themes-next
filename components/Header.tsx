"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { Brand } from "@/components/Brand";
import { whatsappUrl } from "@/lib/site";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/themes", label: "القوالب" },
  { href: "/plugins", label: "الإضافات" },
  { href: "/blog", label: "المقالات" },
  { href: "/about", label: "عن ArabDEV" },
  { href: "/contact", label: "تواصل" },
];

const marqueeItems = [
  "قوالب WordPress عربية احترافية",
  "RTL حقيقي من البداية",
  "واجهات مناسبة للسوق الخليجي",
  "Mobile-first & SEO-ready",
  "دعم مباشر قبل وبعد الشراء",
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

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`v13-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="v13-announcement" aria-label="مميزات ArabDEV">
        <div className="v13-marquee-track">
          {[0, 1].map((copy) => (
            <div className="v13-marquee-group" aria-hidden={copy === 1} key={copy}>
              {marqueeItems.map((item) => <span key={`${copy}-${item}`}>{item}<i>✦</i></span>)}
            </div>
          ))}
        </div>
      </div>

      <div className="shell v13-nav">
        <Brand priority />

        <nav className="v13-desktop-nav" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} prefetch className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v13-nav-actions">
          <Link className="v13-shop-link" href="/themes">تصفح المنتجات <span>↗</span></Link>
          <a className="v13-whatsapp" href={whatsappUrl("مرحباً، أريد الاستفسار عن منتجات ArabDEV")} target="_blank" rel="noreferrer">
            <span className="v13-live-dot" />واتساب
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
