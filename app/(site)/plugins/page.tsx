import type { Metadata } from "next";
import { PluginCard } from "@/components/PluginCard";
import { getPublishedPlugins } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "إضافات WordPress عربية",
  description: "إضافات WordPress عملية وخفيفة للمواقع والمتاجر العربية.",
  alternates: { canonical: "/plugins" },
};

export default async function PluginsPage() {
  const plugins = await getPublishedPlugins();

  return (
    <section className="inner-hero shell library-page">
      <div className="library-header">
        <div>
          <span className="eyebrow">ArabDEV / Plugin Library</span>
          <h1>الإضافات</h1>
          <p>Plugins واضحة في الهدف، خفيفة في التنفيذ، ومصممة لمشاكل حقيقية في المواقع العربية.</p>
        </div>
        <div className="library-stat" aria-label={`${plugins.length} إضافات`}>
          <strong>{String(plugins.length).padStart(2, "0")}</strong>
          <span>PLUGINS / PRODUCT LAB</span>
        </div>
      </div>

      <div className="library-strip">
        <span>Lightweight</span><i>•</i><span>WordPress</span><i>•</i><span>RTL Friendly</span><i>•</i><span>Product Details First</span>
      </div>

      <div className="plugins-grid inner-grid">
        {plugins.map((plugin) => <PluginCard key={plugin.slug} plugin={plugin} />)}
      </div>
    </section>
  );
}
