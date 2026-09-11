import type { Metadata } from "next";
import { ThemeCard } from "@/components/ThemeCard";
import { getPublishedThemes } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "قوالب WordPress عربية للسعودية والخليج",
  description: "قوالب WordPress وElementor عربية للمتاجر والشركات والخدمات.",
  alternates: { canonical: "/themes" },
};

export default async function ThemesPage() {
  const themes = await getPublishedThemes();

  return (
    <section className="inner-hero shell library-page">
      <div className="library-header">
        <div>
          <span className="eyebrow">ArabDEV / Theme Library</span>
          <h1>القوالب</h1>
          <p>تصميم عربي حقيقي، أداء قوي وتجربة مناسبة للموبايل والسوق الخليجي.</p>
        </div>
        <div className="library-stat" aria-label={`${themes.length} قوالب`}>
          <strong>{String(themes.length).padStart(2, "0")}</strong>
          <span>THEMES / LIVE LIBRARY</span>
        </div>
      </div>

      <div className="library-strip">
        <span>Arabic-first</span><i>•</i><span>Responsive</span><i>•</i><span>Fast Core</span><i>•</i><span>Details before Live Demo</span>
      </div>

      <div className="themes-grid inner-grid">
        {themes.map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}
      </div>
    </section>
  );
}
