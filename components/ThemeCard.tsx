import Link from "next/link";
import type { ThemeItem } from "@/lib/content";
import { themeImage } from "@/lib/editorial-images";

export function ThemeCard({ theme }: { theme: ThemeItem }) {
  const image = themeImage(theme.slug, theme.coverImage);
  const detailUrl = `/themes/${theme.slug}`;

  return (
    <article className={`theme-card theme-${theme.slug}`} data-reveal="soft">
      <Link className="theme-visual has-cover theme-photo-visual" href={detailUrl} aria-label={`قراءة تفاصيل ${theme.title}`}>
        <img src={image} alt="" aria-hidden="true" className="theme-cover-image" loading="lazy" decoding="async" />
        <span className="theme-cover-shade" aria-hidden="true" />
        <div className="theme-card-top"><span>{theme.accent}</span><b>{theme.category}</b></div>
        <div className="theme-photo-panel" aria-hidden="true">
          <small>ARABDEV THEME</small>
          <strong>{theme.title}</strong>
          <span>{theme.label}</span>
        </div>
        <span className="product-hover-overlay-v19"><small>اعرف المنتج قبل المعاينة</small><b>شاهد التفاصيل ↗</b></span>
        <span className="theme-hover-label"><span>Details first</span><b>↗</b></span>
      </Link>
      <div className="theme-meta"><span>{theme.status}</span><span>{theme.category} / RTL</span></div>
      <div className="theme-title-row">
        <div><h3>{theme.title}</h3><p>{theme.description}</p></div>
        <Link className="circle-link" href={detailUrl} aria-label={`قراءة تفاصيل ${theme.title}`}>↗</Link>
      </div>
    </article>
  );
}
