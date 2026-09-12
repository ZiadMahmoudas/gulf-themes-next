import Link from "next/link";
import type { ThemeItem } from "@/lib/content";
import { themeImage } from "@/lib/editorial-images";

export function ThemeCard({ theme }: { theme: ThemeItem }) {
  const image = themeImage(theme.slug, theme.coverImage);
  const detailUrl = `/themes/${theme.slug}`;

  return (
    <article className={`theme-card product-library-card theme-${theme.slug}`} data-reveal="soft">
      <Link className="theme-visual has-cover theme-photo-visual product-card-media" href={detailUrl} aria-label={`قراءة تفاصيل ${theme.title}`}>
        <img src={image} alt={theme.title} className="theme-cover-image" loading="lazy" decoding="async" />
      </Link>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-kind">THEME / {theme.category}</span>
          <span className="product-status">{theme.status}</span>
        </div>

        <div className="product-card-heading">
          <div>
            <h3><Link href={detailUrl}>{theme.title}</Link></h3>
            <p>{theme.description}</p>
          </div>
          <Link className="product-card-arrow" href={detailUrl} aria-label={`قراءة تفاصيل ${theme.title}`}>↗</Link>
        </div>

        <div className="product-card-foot">
          <span>{theme.label}</span>
          <Link href={detailUrl}>شاهد التفاصيل <b>↗</b></Link>
        </div>
      </div>
    </article>
  );
}
