import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { themeImage, pluginImage } from "@/lib/editorial-images";
import { whatsappUrl } from "@/lib/site";
import { getPublishedArticles, getPublishedFaqs, getPublishedPlugins, getPublishedThemes } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "قوالب وإضافات WordPress عربية احترافية",
  description: "ArabDEV منصة عربية لقوالب WordPress وإضافات ومواقع مخصصة، مصممة للعربي والسوق الخليجي مع RTL حقيقي وتجربة موبايل وأداء وSEO.",
  alternates: { canonical: "/" },
};

const categories = [
  ["01", "قوالب المتاجر", "WooCommerce وتجارب شراء عربية", "/themes"],
  ["02", "قوالب الشركات", "واجهات خدمات وشركات احترافية", "/themes"],
  ["03", "إضافات WordPress", "أدوات خفيفة بوظيفة واضحة", "/plugins"],
  ["04", "Elementor", "واجهات سهلة التعديل والإدارة", "/themes"],
  ["05", "السرعة وSEO", "محتوى وأدوات لتحسين الأداء", "/blog"],
  ["06", "تنفيذ مخصص", "حل مبني خصيصاً حسب مشروعك", "/contact"],
] as const;

const marquee = ["RTL NATIVE", "MOBILE FIRST", "WORDPRESS", "ELEMENTOR", "WOOCOMMERCE", "SEO READY", "GCC UX", "DIRECT SUPPORT"];

export default async function Home() {
  const [themes, plugins, posts, faqs] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
    getPublishedFaqs(),
  ]);

  const featuredTheme = themes[0];
  const featuredPlugin = plugins[0];
  const heroImage = featuredTheme ? themeImage(featuredTheme.slug, featuredTheme.coverImage) : "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=84";
  const pluginCover = featuredPlugin ? pluginImage(featuredPlugin.slug, featuredPlugin.coverImage) : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=82";
  const productCount = themes.length + plugins.length;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  return (
    <div className="v13-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="v13-hero">
        <div className="shell v13-hero-grid">
          <div className="v13-hero-copy">
            <span className="v13-kicker">ARABDEV / WORDPRESS MARKETPLACE</span>
            <h1>كل اللي محتاجه<br />لموقع WordPress<br /><em>عربي أقوى.</em></h1>
            <p>قوالب وإضافات وحلول WordPress موجهة للعربي والسوق الخليجي، بتجربة موبايل مظبوطة، RTL حقيقي، وأداء يخليك تبدأ على أساس صح.</p>
            <div className="v13-hero-actions">
              <Link href="/themes" className="v13-btn v13-btn-dark">تصفح القوالب <b>↗</b></Link>
              <Link href="/plugins" className="v13-btn v13-btn-light">استكشف الإضافات <b>+</b></Link>
            </div>
            <div className="v13-proof">
              <div><strong>{String(productCount).padStart(2, "0")}</strong><span>منتج في المكتبة</span></div>
              <div><strong>RTL</strong><span>عربي من البداية</span></div>
              <div><strong>GCC</strong><span>جاهز للسوق الخليجي</span></div>
            </div>
          </div>

          <div className="v13-hero-showcase">
            <a className="v13-main-promo" href={featuredTheme?.externalUrl || "/themes"} target={featuredTheme?.externalUrl ? "_blank" : undefined} rel={featuredTheme?.externalUrl ? "noopener noreferrer" : undefined}>
              <img src={heroImage} alt={featuredTheme?.title || "قالب WordPress عربي من ArabDEV"} fetchPriority="high" decoding="async" />
              <span className="v13-image-shade" />
              <div className="v13-promo-head"><span>FEATURED THEME</span><b>{featuredTheme?.category || "WORDPRESS"}</b></div>
              <div className="v13-promo-copy"><small>{featuredTheme?.label || "ARABIC-FIRST"}</small><h2>{featuredTheme?.title || "ArabDEV Theme"}</h2><p>{featuredTheme?.description || "واجهة عربية احترافية جاهزة للانطلاق."}</p><div><strong>{featuredTheme?.price || "قريباً"}</strong><span>شاهد المنتج ↗</span></div></div>
            </a>
            <a className="v13-mini-promo" href={featuredPlugin?.externalUrl || "/plugins"} target={featuredPlugin?.externalUrl ? "_blank" : undefined} rel={featuredPlugin?.externalUrl ? "noopener noreferrer" : undefined}>
              <img src={pluginCover} alt={featuredPlugin?.title || "إضافة WordPress من ArabDEV"} loading="lazy" decoding="async" />
              <div><small>PLUGIN DROP</small><b>{featuredPlugin?.title || "WordPress Plugin"}</b><span>{featuredPlugin?.price || "استكشف الإضافات"} ↗</span></div>
            </a>
            <div className="v13-hero-stamp"><span>ARABIC</span><b>FIRST</b><small>DESIGN + CODE</small></div>
          </div>
        </div>
      </section>

      <section className="v13-home-marquee" aria-label="مميزات المنتجات">
        <div className="v13-home-marquee-track">
          {[0,1].map((copy) => <div className="v13-home-marquee-group" key={copy} aria-hidden={copy === 1}>{marquee.map((item) => <span key={`${copy}-${item}`}>{item}<i>✦</i></span>)}</div>)}
        </div>
      </section>

      <section className="shell v13-section v13-category-section">
        <div className="v13-section-head">
          <div><span className="v13-kicker">BROWSE / START HERE</span><h2>اختار اللي محتاجه<br />وادخل على طول.</h2></div>
          <p>نفس فكرة المتاجر الكبيرة: الوصول للمنتج أسرع، الأقسام أوضح، ومافيش زحمة بصرية أو رحلة طويلة علشان تلاقي المطلوب.</p>
        </div>
        <div className="v13-category-grid">
          {categories.map(([index, title, note, href]) => <Link href={href} key={index} className="v13-category-card"><span>{index}</span><div><h3>{title}</h3><p>{note}</p></div><b>↗</b></Link>)}
        </div>
      </section>

      <section className="v13-products-band">
        <div className="shell v13-section">
          <div className="v13-section-head v13-head-light">
            <div><span className="v13-kicker">MOST WANTED / STORE</span><h2>ابدأ بالمنتجات<br />الأكثر وضوحاً.</h2></div>
            <div className="v13-section-side"><p>عرض على طريقة المتاجر: صورة كبيرة، نوع المنتج، وصف مختصر، السعر، ودخول مباشر للتفاصيل أو الـLive Demo.</p><div><Link href="/themes">كل القوالب ↗</Link><Link href="/plugins">كل الإضافات ↗</Link></div></div>
          </div>
          <div className="v13-product-grid">
            {themes.slice(0, 4).map((theme, index) => {
              const card = <><div className="v13-product-image"><img src={themeImage(theme.slug, theme.coverImage)} alt={theme.title} loading={index < 2 ? "eager" : "lazy"} decoding="async" /><span>THEME</span></div><div className="v13-product-copy"><small>{theme.category} / {theme.status}</small><h3>{theme.title}</h3><p>{theme.description}</p><div><strong>{theme.price}</strong><b>عرض المنتج ↗</b></div></div></>;
              return theme.externalUrl ? <a className="v13-product-card" key={theme.slug} href={theme.externalUrl} target="_blank" rel="noopener noreferrer">{card}</a> : <Link className="v13-product-card" key={theme.slug} href="/themes">{card}</Link>;
            })}
            {plugins.slice(0, 4).map((plugin) => {
              const card = <><div className="v13-product-image"><img src={pluginImage(plugin.slug, plugin.coverImage)} alt={plugin.title} loading="lazy" decoding="async" /><span>PLUGIN</span></div><div className="v13-product-copy"><small>{plugin.category} / {plugin.status}</small><h3>{plugin.title}</h3><p>{plugin.description}</p><div><strong>{plugin.price}</strong><b>عرض المنتج ↗</b></div></div></>;
              return plugin.externalUrl ? <a className="v13-product-card" key={plugin.slug} href={plugin.externalUrl} target="_blank" rel="noopener noreferrer">{card}</a> : <Link className="v13-product-card" key={plugin.slug} href="/plugins">{card}</Link>;
            })}
          </div>
        </div>
      </section>

      <section className="shell v13-offer-card">
        <div><span className="v13-kicker">NEED A CUSTOM BUILD?</span><h2>مش لاقي قالب يناسبك؟<br />نبني التجربة مخصوص.</h2><p>موقع شركة، متجر، Landing Page أو Plugin — نفس الهوية والجودة لكن على احتياج مشروعك.</p></div>
        <a href={whatsappUrl("مرحباً، أحتاج تنفيذ WordPress مخصص لمشروعي")} target="_blank" rel="noreferrer">اطلب تنفيذ مخصص <b>↗</b></a>
        <div className="v13-offer-orbit" aria-hidden="true"><i/><i/><i/></div>
      </section>

      <section className="shell v13-section v13-value-section">
        <div className="v13-section-head">
          <div><span className="v13-kicker">WHY ARABDEV</span><h2>مش مجرد شكل.<br />المنتج معمول يشتغل.</h2></div>
          <p>الفرق في التفاصيل اللي بتبان بعد الاستخدام: الخط، المسافات، الموبايل، سرعة الوصول للمعلومة، والـCTA اللي ما يضيعش وسط التصميم.</p>
        </div>
        <div className="v13-value-grid">
          <article><span>01</span><h3>Arabic-first</h3><p>RTL وتايبوجرافي ومحاذاة واتجاه حركة معمولين للعربي من أول قرار.</p></article>
          <article><span>02</span><h3>Mobile-first</h3><p>الموبايل مش نسخة مصغرة من الديسكتوب؛ له قراراته ومسافاته وCTA واضح.</p></article>
          <article><span>03</span><h3>Fast core</h3><p>مؤثرات محسوبة وكود أخف بدل تحميل الصفحة بحركات مالهاش قيمة.</p></article>
          <article><span>04</span><h3>Direct support</h3><p>لو محتاج اختيار أو تنفيذ أو تعديل، التواصل مباشر وواضح بدون لف.</p></article>
        </div>
      </section>

      <section className="v13-journal-band">
        <div className="shell v13-section">
          <div className="v13-section-head">
            <div><span className="v13-kicker">JOURNAL / KNOWLEDGE</span><h2>محتوى يفيدك<br />قبل ما تشتري.</h2></div>
            <div className="v13-section-side"><p>WordPress، Elementor، السرعة، SEO وتجربة المواقع العربية — محتوى عملي مرتبط بالمشاكل اللي بنقابلها فعلاً.</p><Link href="/blog">كل المقالات ↗</Link></div>
          </div>
          <div className="v13-articles-grid">{posts.slice(0, 6).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}</div>
        </div>
      </section>

      <section className="shell v13-section v13-faq" id="faq">
        <div className="v13-faq-intro"><span className="v13-kicker">FAQ / QUICK ANSWERS</span><h2>قبل ما تبدأ.</h2><p>أهم الأسئلة موجودة هنا، ولو سؤالك مختلف تقدر تدخل واتساب مباشرة.</p><a href={whatsappUrl("مرحباً، لدي سؤال عن منتجات ArabDEV")} target="_blank" rel="noreferrer">اسألنا على واتساب ↗</a></div>
        <div className="v13-faq-list">
          {faqs.map((faq, index) => <details key={faq.id || `${faq.question}-${index}`} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><b>+</b></summary><div><p>{faq.answer}</p></div></details>)}
        </div>
      </section>
    </div>
  );
}
