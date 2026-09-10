import type { PluginItem } from "@/lib/content";

export function PluginCard({ plugin }: { plugin: PluginItem }) {
  const externalUrl = plugin.externalUrl?.trim();
  const hasCover = Boolean(plugin.coverImage);

  const visual = (
    <>
      {hasCover && (
        <>
          <img
            src={plugin.coverImage || ""}
            alt=""
            aria-hidden="true"
            className="plugin-cover-image"
            loading="lazy"
            decoding="async"
          />
          <span className="plugin-cover-shade" aria-hidden="true" />
        </>
      )}

      <div className="plugin-card-top">
        <span>{plugin.accent}</span>
        <b>{plugin.category}</b>
      </div>

      {!hasCover && (
        <div className="plugin-icon" aria-hidden="true"><span>{plugin.symbol}</span></div>
      )}

      <div className="plugin-visual-copy">
        <small>WORDPRESS PLUGIN</small>
        <b>{plugin.title}</b>
        <span>{plugin.label}</span>
      </div>
    </>
  );

  return (
    <article className={`plugin-card plugin-${plugin.slug}`} data-reveal="soft">
      {externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`plugin-visual${hasCover ? " has-cover" : ""}`}
          aria-label={`فتح ${plugin.title} في نافذة جديدة`}
        >
          {visual}
        </a>
      ) : (
        <div className={`plugin-visual${hasCover ? " has-cover" : ""}`}>{visual}</div>
      )}

      <div className="theme-meta">
        <span>{plugin.status}</span>
        <span>{plugin.category} / Modular</span>
      </div>

      <div className="theme-title-row">
        <div>
          <h3>{plugin.title}</h3>
          <p>{plugin.description}</p>
        </div>
        {externalUrl ? (
          <a className="circle-link" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`فتح ${plugin.title}`}>↗</a>
        ) : (
          <span className="circle-link is-disabled" aria-hidden="true">·</span>
        )}
      </div>
    </article>
  );
}
