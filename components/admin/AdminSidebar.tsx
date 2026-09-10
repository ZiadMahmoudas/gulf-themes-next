"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/Brand";

type IconName = "home" | "themes" | "plugins" | "articles" | "faqs" | "media" | "messages" | "seo" | "settings";

const items: Array<{ href: string; icon: IconName; label: string }> = [
  { href: "/admin", icon: "home", label: "الرئيسية" },
  { href: "/admin/themes", icon: "themes", label: "القوالب" },
  { href: "/admin/plugins", icon: "plugins", label: "الإضافات" },
  { href: "/admin/articles", icon: "articles", label: "المقالات" },
  { href: "/admin/faqs", icon: "faqs", label: "الأسئلة الشائعة" },
  { href: "/admin/media", icon: "media", label: "الوسائط" },
  { href: "/admin/messages", icon: "messages", label: "الرسائل" },
  { href: "/admin/seo", icon: "seo", label: "تحسين محركات البحث" },
  { href: "/admin/settings", icon: "settings", label: "الإعدادات" },
];

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "home") return <svg {...common}><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.6V21h13V9.6"/><path d="M9.5 21v-6h5v6"/></svg>;
  if (name === "themes") return <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
  if (name === "plugins") return <svg {...common}><path d="M9 3h6v4a2 2 0 1 0 4 0V9h2v6h-4a2 2 0 1 0 0 4v2h-6v-4a2 2 0 1 0-4 0v4H3v-6h4a2 2 0 1 0 0-4H3V5h6V3Z"/></svg>;
  if (name === "articles") return <svg {...common}><path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4M9 11h6M9 15h6"/></svg>;
  if (name === "faqs") return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.35 2.35 0 1 1 3.9 1.76c-.9.72-1.7 1.2-1.7 2.74"/><path d="M12 17h.01"/></svg>;
  if (name === "media") return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m5 18 4.5-4.5 3 3 2-2L19 19"/></svg>;
  if (name === "messages") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (name === "seo") return <svg {...common}><path d="M5 20V10M12 20V4M19 20v-7"/><path d="M3 20h18"/></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.14.37.36.7.64.98.28.28.63.5 1.02.62H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <Brand admin />
        <small>أفكار عربية · منتجات رقمية</small>
      </div>

      <nav aria-label="لوحة التحكم">
        {items.map(({ href, icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={active ? "is-active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              <span className="admin-nav-icon"><Icon name={icon} /></span>
              <b>{label}</b>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-cta">
        <span>♛</span>
        <b>اصنع تأثيراً أكبر</b>
        <p>قوالب وإضافات ومحتوى عربي عالي الجودة.</p>
        <Link href="/admin/themes/new">+ إضافة منتج جديد</Link>
      </div>
    </aside>
  );
}
