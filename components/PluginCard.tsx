import type { PluginItem } from "@/lib/content";
import { pluginImage } from "@/lib/editorial-images";

export function PluginCard({ plugin }: { plugin: PluginItem }) {
  const externalUrl = plugin.externalUrl?.trim();
  const image = pluginImage(plugin.slug, plugin.coverImage);

  const visual = (
    <>
      <img src={image} alt="" aria-hidden="true" className="plugin-cover-image" loading="lazy" decoding="async" />
      <span className="plugin-cover-shade" aria-hidden="true" />
      <div className="plugin-card-top"><span>{plugin.accent}</span><b>{plugin.category}</b></div>
      <div className="plugin-photo-panel" aria-hidden="true"><small>WORDPRESS PLUGIN</small><strong>{plugin.title}</strong><span>{plugin.label}</span></div>
    </>
  );

  return (
    <article className={`plugin-card plugin-${plugin.slug}`} data-reveal="soft">
      {externalUrl ? (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="plugin-visual has-cover plugin-photo-visual" aria-label={`فتح ${plugin.title} في نافذة جديدة`}>{visual}</a>
      ) : (
        <div className="plugin-visual has-cover plugin-photo-visual">{visual}</div>
      )}
      <div className="theme-meta"><span>{plugin.status}</span><span>{plugin.category} / Modular</span></div>
      <div className="theme-title-row"><div><h3>{plugin.title}</h3><p>{plugin.description}</p></div>{externalUrl ? <a className="circle-link" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`فتح ${plugin.title}`}>↗</a> : <span className="circle-link is-disabled" aria-hidden="true">·</span>}</div>
    </article>
  );
}
