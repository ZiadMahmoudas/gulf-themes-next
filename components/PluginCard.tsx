import Link from "next/link";
import type { PluginItem } from "@/lib/content";
import { pluginImage } from "@/lib/editorial-images";

export function PluginCard({ plugin }: { plugin: PluginItem }) {
  const image = pluginImage(plugin.slug, plugin.coverImage);
  const detailUrl = `/plugins/${plugin.slug}`;

  return (
    <article className={`plugin-card plugin-${plugin.slug}`} data-reveal="soft">
      <Link className="plugin-visual has-cover plugin-photo-visual" href={detailUrl} aria-label={`قراءة تفاصيل ${plugin.title}`}>
        <img src={image} alt="" aria-hidden="true" className="plugin-cover-image" loading="lazy" decoding="async" />
        <span className="plugin-cover-shade" aria-hidden="true" />
        <div className="plugin-card-top"><span>{plugin.accent}</span><b>{plugin.category}</b></div>
        <div className="plugin-photo-panel" aria-hidden="true"><small>WORDPRESS PLUGIN</small><strong>{plugin.title}</strong><span>{plugin.label}</span></div>
        <span className="product-hover-overlay-v19"><small>اعرف المنتج قبل المعاينة</small><b>شاهد التفاصيل ↗</b></span>
      </Link>
      <div className="theme-meta"><span>{plugin.status}</span><span>{plugin.category} / Modular</span></div>
      <div className="theme-title-row"><div><h3>{plugin.title}</h3><p>{plugin.description}</p></div><Link className="circle-link" href={detailUrl} aria-label={`قراءة تفاصيل ${plugin.title}`}>↗</Link></div>
    </article>
  );
}
