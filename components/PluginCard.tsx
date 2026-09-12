import Link from "next/link";
import type { PluginItem } from "@/lib/content";
import { pluginImage } from "@/lib/editorial-images";

export function PluginCard({ plugin }: { plugin: PluginItem }) {
  const image = pluginImage(plugin.slug, plugin.coverImage);
  const detailUrl = `/plugins/${plugin.slug}`;

  return (
    <article className={`plugin-card product-library-card plugin-${plugin.slug}`} data-reveal="soft">
      <Link className="plugin-visual has-cover plugin-photo-visual product-card-media" href={detailUrl} aria-label={`قراءة تفاصيل ${plugin.title}`}>
        <img src={image} alt={plugin.title} className="plugin-cover-image" loading="lazy" decoding="async" />
      </Link>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-kind">PLUGIN / {plugin.category}</span>
          <span className="product-status">{plugin.status}</span>
        </div>

        <div className="product-card-heading">
          <div>
            <h3><Link href={detailUrl}>{plugin.title}</Link></h3>
            <p>{plugin.description}</p>
          </div>
          <Link className="product-card-arrow" href={detailUrl} aria-label={`قراءة تفاصيل ${plugin.title}`}>↗</Link>
        </div>

        <div className="product-card-foot">
          <span>{plugin.label}</span>
          <Link href={detailUrl}>شاهد التفاصيل <b>↗</b></Link>
        </div>
      </div>
    </article>
  );
}
