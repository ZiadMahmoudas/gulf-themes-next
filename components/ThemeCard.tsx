import type { ThemeItem } from "@/lib/content";

export function ThemeCard({ theme }: { theme: ThemeItem }) {
  const externalUrl = theme.externalUrl?.trim();
  const hasCover = Boolean(theme.coverImage);

  const visual = (
    <>
      {hasCover && (
        <>
          <img
            src={theme.coverImage || ""}
            alt=""
            aria-hidden="true"
            className="theme-cover-image"
            loading="lazy"
            decoding="async"
          />
          <span className="theme-cover-shade" aria-hidden="true" />
        </>
      )}

      <div className="theme-card-top">
        <span>{theme.accent}</span>
        <b>{theme.category}</b>
      </div>

      {!hasCover && (
        <div className="mock-browser" aria-hidden="true">
          <div className="mock-top">
            <i /><i /><i />
            <span>{theme.title.toLowerCase()}.demo</span>
          </div>
          <div className="mock-hero">
            <span>{theme.label}</span>
            <b>{theme.title}</b>
            <em>Arabic-first digital experience</em>
            <u>{externalUrl ? "OPEN PROJECT" : "COMING SOON"}</u>
          </div>
          <div className="mock-lines"><i /><i /><i /></div>
        </div>
      )}

      <span className="theme-hover-label">
        {externalUrl ? "Live preview" : "قريباً"}
        <b>{externalUrl ? "↗" : "•"}</b>
      </span>
    </>
  );

  return (
    <article className={`theme-card theme-${theme.slug}`} data-reveal="soft">
      {externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`theme-visual${hasCover ? " has-cover" : ""}`}
          aria-label={`فتح ${theme.title} في نافذة جديدة`}
        >
          {visual}
        </a>
      ) : (
        <div className={`theme-visual${hasCover ? " has-cover" : ""}`}>{visual}</div>
      )}

      <div className="theme-meta">
        <span>{theme.status}</span>
        <span>{theme.category} / RTL</span>
      </div>

      <div className="theme-title-row">
        <div>
          <h3>{theme.title}</h3>
          <p>{theme.description}</p>
        </div>
        {externalUrl ? (
          <a
            className="circle-link"
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`فتح ${theme.title}`}
          >
            ↗
          </a>
        ) : (
          <span className="circle-link is-disabled" aria-hidden="true">·</span>
        )}
      </div>
    </article>
  );
}
