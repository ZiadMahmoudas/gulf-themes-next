import type { ThemeItem } from "@/lib/content";
import { themeImage } from "@/lib/editorial-images";

export function ThemeCard({ theme }: { theme: ThemeItem }) {
  const externalUrl = theme.externalUrl?.trim();
  const image = themeImage(theme.slug, theme.coverImage);

  const visual = (
    <>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="theme-cover-image"
        loading="lazy"
        decoding="async"
      />
      <span className="theme-cover-shade" aria-hidden="true" />
      <div className="theme-card-top"><span>{theme.accent}</span><b>{theme.category}</b></div>
      <div className="theme-photo-panel" aria-hidden="true">
        <small>ARABDEV THEME</small>
        <strong>{theme.title}</strong>
        <span>{theme.label}</span>
      </div>
      <span className="theme-hover-label">{externalUrl ? "Live preview" : "قريباً"}<b>{externalUrl ? "↗" : "•"}</b></span>
    </>
  );

  return (
    <article className={`theme-card theme-${theme.slug}`} data-reveal="soft">
      {externalUrl ? (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="theme-visual has-cover theme-photo-visual" aria-label={`فتح ${theme.title} في نافذة جديدة`}>
          {visual}
        </a>
      ) : (
        <div className="theme-visual has-cover theme-photo-visual">{visual}</div>
      )}
      <div className="theme-meta"><span>{theme.status}</span><span>{theme.category} / RTL</span></div>
      <div className="theme-title-row">
        <div><h3>{theme.title}</h3><p>{theme.description}</p></div>
        {externalUrl ? <a className="circle-link" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`فتح ${theme.title}`}>↗</a> : <span className="circle-link is-disabled" aria-hidden="true">·</span>}
      </div>
    </article>
  );
}
