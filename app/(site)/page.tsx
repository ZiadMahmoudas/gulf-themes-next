import type { Metadata } from "next";
import Link from "next/link";
import { ThemeCard } from "@/components/ThemeCard";
import { ArticleCard } from "@/components/ArticleCard";
import { PluginCard } from "@/components/PluginCard";
import { editorialImages } from "@/lib/editorial-images";
import { whatsappUrl } from "@/lib/site";
import { getPublishedArticles, getPublishedPlugins, getPublishedThemes } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "قوالب وإضافات WordPress عربية للخليج",
  description: "ArabDEV يقدم قوالب WordPress وإضافات ومواقع مخصصة بواجهة عربية RTL، أداء سريع وتجربة موبايل مناسبة للسعودية والإمارات والخليج.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [themes, plugins, posts] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
  ]);

  return (
    <>
      <section className="home-hero-v10 shell">
        <div className="home-hero-copy-v10">
          <div className="hero-kicker"><span className="live-dot" /> WORDPRESS PRODUCTS / ARABIC-FIRST</div>
          <h1>
            قوالب وإضافات<br />
            <span>WordPress عربية</span><br />
            <em>بمستوى عالمي.</em>
          </h1>
          <p>
            ArabDEV بيصمم ويطور قوالب WordPress، إضافات عملية، ومواقع مخصصة للشركات والمتاجر العربية والخليجية — بواجهة عربية متزنة، موبايل مضبوط، وكود خفيف قابل للتوسع.
          </p>
          <div className="hero-actions-v10">
            <Link className="button primary" href="/themes" prefetch><span>استكشف القوالب</span><b>↗</b></Link>
            <Link className="button ghost" href="/plugins" prefetch><span>شوف الإضافات</span><b>+</b></Link>
          </div>
          <div className="hero-metrics-v10">
            <div><strong>{String(themes.length).padStart(2,"0")}</strong><span>قوالب ومنتجات قابلة للعرض</span></div>
            <div><strong>{String(plugins.length).padStart(2,"0")}</strong><span>إضافات WordPress</span></div>
            <div><strong>RTL</strong><span>عربي من أول قرار تصميم</span></div>
          </div>
        </div>

        <div className="home-hero-photo-v10" data-reveal="soft">
          <img src={editorialImages.hero} alt="مساحة عمل لتطوير مواقع ومنتجات WordPress" fetchPriority="high" decoding="async" />
          <div className="home-photo-top-v10"><span>ARABDEV / DIGITAL PRODUCTS</span><b>2026</b></div>
          <div className="home-photo-card-v10 home-photo-card-theme"><small>THEMES</small><strong>Arabic-first UI</strong><span>WooCommerce · Elementor · Custom</span></div>
          <div className="home-photo-card-v10 home-photo-card-plugin"><small>PLUGINS</small><strong>Lightweight tools</strong><span>Conversion · Content · UX</span></div>
          <div className="home-photo-caption-v10"><span>مصمم للعربي</span><b>مش مجرد قالب مترجم.</b></div>
        </div>
      </section>

      <section className="home-service-bar-v10">
        <div className="shell home-service-grid-v10">
          <Link href="/themes"><span>01</span><div><small>WORDPRESS THEMES</small><b>قوالب جاهزة للبيع والاستخدام</b><p>تصميمات عربية حديثة مع RTL وموبايل وDemo واضح.</p></div><i>↗</i></Link>
          <Link href="/plugins"><span>02</span><div><small>WORDPRESS PLUGINS</small><b>إضافات عملية وخفيفة</b><p>وظائف محددة للمحتوى، التحويل، وWooCommerce بدون حمل زائد.</p></div><i>↗</i></Link>
          <Link href="/contact"><span>03</span><div><small>CUSTOM DEVELOPMENT</small><b>تنفيذ مواقع وحلول مخصصة</b><p>لو المنتج الجاهز مش كفاية، بنبني الحل على احتياج مشروعك.</p></div><i>↗</i></Link>
        </div>
      </section>

      <section className="section shell collection-section" data-reveal>
        <div className="section-head">
          <div><span className="eyebrow">Theme collection / 01</span><h2>قوالب تبني عليها<br />براند، مش مجرد موقع.</h2></div>
          <div className="section-side-copy"><p>كل قالب بيتعرض بصور واضحة، تفاصيل عملية، ورابط Demo خارجي عشان العميل يشوف التجربة قبل ما يتواصل.</p><Link href="/themes" prefetch>عرض كل القوالب <span>↗</span></Link></div>
        </div>
        <div className="themes-grid">{themes.slice(0, 6).map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}</div>
      </section>

      <section className="home-editorial-split-v10" data-reveal="soft">
        <div className="shell home-editorial-grid-v10">
          <div className="home-editorial-image-v10"><img src={editorialImages.studio} alt="تحليل وتصميم تجربة موقع احترافية" loading="lazy" decoding="async" /><span>PERFORMANCE / UX / SEO</span></div>
          <div className="home-editorial-copy-v10">
            <span className="eyebrow light">Why ArabDEV / 02</span>
            <h2>مش بنبيع شكل حلو بس.<br /><em>بنبني منتج ينفع يتباع.</em></h2>
            <p>المنتج عندنا لازم يبقى واضح للعميل، سريع على الموبايل، سهل التعديل، ومهيأ إنك تسوق له بمقال وLanding Page وDemo محترم.</p>
            <div className="home-editorial-points-v10"><div><b>01</b><span>Arabic typography</span></div><div><b>02</b><span>Mobile-first UX</span></div><div><b>03</b><span>SEO structure</span></div><div><b>04</b><span>Fast WordPress core</span></div></div>
          </div>
        </div>
      </section>

      <section className="section shell plugin-home-section" data-reveal>
        <div className="section-head">
          <div><span className="eyebrow">Plugin lab / 03</span><h2>إضافات بتحل<br />مشكلة واحدة صح.</h2></div>
          <div className="section-side-copy"><p>Plugins خفيفة ومركزة للمواقع العربية والمتاجر بدل تحميل عشرات المميزات اللي مش محتاجها.</p><Link href="/plugins" prefetch>عرض الإضافات <span>↗</span></Link></div>
        </div>
        <div className="plugins-grid">{plugins.slice(0, 6).map((plugin) => <PluginCard key={plugin.slug} plugin={plugin} />)}</div>
      </section>

      <section className="workflow-section" data-reveal>
        <div className="shell">
          <div className="workflow-head"><span className="eyebrow light">من الاختيار للإطلاق</span><h2>شوف. جرّب. ابدأ.</h2></div>
          <div className="workflow-grid">
            <div><span>01</span><h3>شوف المنتج</h3><p>صور، وصف، مميزات، والسوق المناسب ليه بشكل واضح.</p></div>
            <div><span>02</span><h3>افتح الـDemo</h3><p>جرّب الموقع أو الإضافة فعليًا قبل الشراء أو التواصل.</p></div>
            <div><span>03</span><h3>تواصل مباشرة</h3><p>واتساب أو إيميل، ومع الوقت نضيف تجربة شراء كاملة داخل المنصة.</p></div>
          </div>
          <a className="workflow-cta" href={whatsappUrl("مرحباً، أريد ترشيح أنسب Theme أو Plugin لمشروعي")} target="_blank" rel="noreferrer"><span>مش عارف تبدأ بإيه؟</span><b>خلّينا نرشح لك المناسب ↗</b></a>
        </div>
      </section>

      <section className="section shell articles-section" data-reveal>
        <div className="section-head">
          <div><span className="eyebrow">Journal / 04</span><h2>مقالات مفيدة للعميل،<br />ومفيدة للـSEO.</h2></div>
          <div className="section-side-copy"><p>كل مقال له صورة، عنوان واضح، وصف مختصر، صفحة قراءة كاملة، Share buttons وMetadata مستقلة لمحركات البحث.</p><Link href="/blog" prefetch>كل المقالات <span>↗</span></Link></div>
        </div>
        <div className="articles-grid home-articles-grid">{posts.slice(0, 3).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}</div>
      </section>

      <section className="shell cta-band" data-reveal="soft">
        <div><span className="eyebrow">Custom request</span><h2>عندك فكرة مختلفة؟<br />خلّيها منتج حقيقي.</h2><p>Theme، Plugin، أو موقع كامل موجه للسوق الخليجي والعربي.</p></div>
        <a className="cta-round" href={whatsappUrl("مرحباً، عندي فكرة وأريد تنفيذها مع ArabDEV")} target="_blank" rel="noreferrer"><span>ابدأ</span><b>↗</b></a>
      </section>
    </>
  );
}
