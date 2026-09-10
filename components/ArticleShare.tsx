"use client";

import { useState } from "react";

type Props = {
  url: string;
  title: string;
};

type IconName = "facebook" | "x" | "linkedin" | "whatsapp" | "telegram" | "copy";

function Icon({ name }: { name: IconName }) {
  if (name === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 22v-9h3l.45-3.5H13.6V7.27c0-1.01.28-1.7 1.73-1.7h1.85V2.44c-.32-.04-1.42-.14-2.7-.14-2.67 0-4.5 1.63-4.5 4.63V9.5H7v3.5h2.98v9h3.62Z"/></svg>;
  if (name === "x") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.98 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.44 4.05H6.59L17.8 19.84Z"/></svg>;
  if (name === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9H7.12v11.45ZM20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28Z"/></svg>;
  if (name === "whatsapp") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 1.92 17.74L.25 23.75l6.15-1.61A11.8 11.8 0 0 0 12 23.56h.01A11.8 11.8 0 0 0 20.52 3.48ZM12 21.57a9.78 9.78 0 0 1-4.99-1.37l-.36-.21-3.65.95.98-3.55-.23-.37A9.8 9.8 0 1 1 12 21.57Zm5.38-7.35c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.64.08-.29-.15-1.24-.46-2.36-1.46a8.84 8.84 0 0 1-1.63-2.03c-.17-.3-.02-.45.13-.6.13-.13.3-.34.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.84 1.2 3.04.14.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.56-.08 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.19-.56-.34Z"/></svg>;
  if (name === "telegram") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.7 2.4 19.3 21c-.26 1.31-.95 1.63-1.93 1.02l-5.17-3.81-2.5 2.4c-.27.27-.5.5-1.03.5l.37-5.27 9.59-8.66c.42-.37-.09-.58-.65-.21L6.12 14.44l-5.1-1.6c-1.11-.34-1.13-1.11.23-1.64L21.2 3.51c.93-.34 1.74.21 1.5 1.11V2.4Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 12.8a4.8 4.8 0 0 1 0-6.8l2.12-2.12a4.8 4.8 0 1 1 6.79 6.79l-1.2 1.2-1.42-1.42 1.2-1.2a2.8 2.8 0 1 0-3.96-3.96L10 7.42a2.8 2.8 0 0 0 0 3.96l.6.6-1.42 1.42-.58-.6Zm6.8-1.6a4.8 4.8 0 0 1 0 6.8l-2.12 2.12a4.8 4.8 0 1 1-6.79-6.79l1.2-1.2 1.42 1.42-1.2 1.2a2.8 2.8 0 1 0 3.96 3.96L14 16.58a2.8 2.8 0 0 0 0-3.96l-.6-.6 1.42-1.42.58.6Z"/></svg>;
}

export function ArticleShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const eUrl = encodeURIComponent(url);
  const eTitle = encodeURIComponent(title);

  const links = [
    { name: "facebook" as const, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}` },
    { name: "x" as const, label: "X", href: `https://twitter.com/intent/tweet?url=${eUrl}&text=${eTitle}` },
    { name: "linkedin" as const, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${eUrl}` },
    { name: "whatsapp" as const, label: "WhatsApp", href: `https://wa.me/?text=${eTitle}%20${eUrl}` },
    { name: "telegram" as const, label: "Telegram", href: `https://t.me/share/url?url=${eUrl}&text=${eTitle}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("انسخ رابط المقال", url);
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { return; }
    }
    await copyLink();
  }

  return (
    <div className="article-share" aria-label="مشاركة المقال">
      <div className="article-share-head"><span>شارك المقال</span><button type="button" onClick={nativeShare}>مشاركة سريعة ↗</button></div>
      <div className="article-share-links">
        {links.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`مشاركة على ${item.label}`}>
            <Icon name={item.name} /><span>{item.label}</span>
          </a>
        ))}
        <button type="button" onClick={copyLink} aria-label="نسخ رابط المقال"><Icon name="copy"/><span>{copied ? "تم النسخ" : "نسخ الرابط"}</span></button>
      </div>
    </div>
  );
}
