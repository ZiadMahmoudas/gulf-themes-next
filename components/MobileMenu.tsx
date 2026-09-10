"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SocialLinks } from "@/components/SocialLinks";
import { whatsappUrl } from "@/lib/site";

const links = [
  ["/themes", "القوالب", "Themes"],
  ["/plugins", "الإضافات", "Plugins"],
  ["/blog", "المقالات", "Guides"],
  ["/about", "عن ArabDEV", "About"],
  ["/contact", "تواصل معنا", "Contact"],
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overlay = (
    <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="mobile-menu-backdrop" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} />
      <aside className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="قائمة ArabDEV">
        <div className="mobile-menu-top">
          <span className="mobile-menu-kicker">ArabDEV / Menu</span>
          <button className="mobile-menu-close" type="button" onClick={() => setOpen(false)} aria-label="إغلاق القائمة">×</button>
        </div>

        <nav aria-label="قائمة الموبايل">
          {links.map(([href, ar, en], index) => (
            <Link href={href} key={href} className={pathname === href || pathname.startsWith(`${href}/`) ? "is-active" : ""} onClick={() => setOpen(false)}>
              <span className="mobile-link-index">0{index + 1}</span>
              <span className="mobile-link-copy"><b>{ar}</b><small>{en}</small></span>
              <span className="mobile-link-arrow">↗</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <a className="mobile-whatsapp" href={whatsappUrl("مرحباً، أتواصل معكم من موقع ArabDEV")} target="_blank" rel="noreferrer">ابدأ على واتساب <span>↗</span></a>
          <SocialLinks compact dark />
          <small className="mobile-menu-note">Themes · Plugins · Arabic WordPress</small>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        className={`menu-button ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
