import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { themeImage, pluginImage } from "@/lib/editorial-images";
import { whatsappUrl } from "@/lib/site";
import {
  getPublishedArticles,
  getPublishedFaqs,
  getPublishedPlugins,
  getPublishedThemes,
} from "@/lib/public-data";

export const metadata: Metadata = {
  title: "قوالب وإضافات WordPress عربية احترافية",
  description:
    "ArabDEV منصة عربية لقوالب WordPress وإضافات ومواقع مخصصة، مصممة للعربي والسوق الخليجي مع RTL حقيقي وتجربة موبايل وأداء وSEO.",
  alternates: { canonical: "/" },
};

const quickCategories = [
  { key: "themes", title: "قوالب WordPress", note: "متاجر، شركات وخدمات", href: "/themes" },
  { key: "plugins", title: "إضافات WordPress", note: "أدوات مركزة وخفيفة", href: "/plugins" },
  { key: "store", title: "WooCommerce", note: "تجارب شراء عربية", href: "/themes" },
  { key: "elementor", title: "Elementor", note: "واجهات سهلة التعديل", href: "/themes" },
  { key: "speed", title: "السرعة والأداء", note: "بنية أخف للموبايل", href: "/blog" },
  { key: "seo", title: "SEO والمحتوى", note: "مقالات ودلائل عملية", href: "/blog" },
  { key: "custom", title: "تنفيذ مخصص", note: "موقع حسب مشروعك", href: "/contact" },
  { key: "support", title: "دعم مباشر", note: "تواصل على واتساب", href: "/contact" },
];

function CategoryIcon({ type }: { type: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "themes") return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>;
  if (type === "plugins") return <svg {...common}><path d="M9.5 3v4M14.5 3v4M7 7h10v4a5 5 0 0 1-10 0V7Z"/><path d="M12 16v5"/></svg>;
  if (type === "store") return <svg {...common}><path d="M4 9h16l-1 11H5L4 9Z"/><path d="M7 9a5 5 0 0 1 10 0"/></svg>;
  if (type === "elementor") return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (type === "speed") return <svg {...common}><path d="M5 18a8 8 0 1 1 14 0"/><path d="m12 14 4-5"/><path d="M4 18h16"/></svg>;
  if (type === "seo") return <svg {...common}><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5M8 12l2-2 2 2 3-4"/></svg>;
  if (type === "custom") return <svg {...common}><path d="m4 17 6-6 3 3 7-7"/><path d="M15 7h5v5"/><path d="M4 21h16"/></svg>;
  return <svg {...common}><path d="M4 5h16v12H7l-3 3V5Z"/><path d="M8 9h8M8 13h5"/></svg>;
}

export default async function Home() {
  const [themes, plugins, posts, faqs] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
    getPublishedFaqs(),
  ]);

  const featuredTheme = themes[0];
  const featuredImage = featuredTheme
    ? themeImage(featuredTheme.slug, featuredTheme.coverImage)
    : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=84";

  const featuredPlugin = plugins[0];
  const productCount = themes.length + plugins.length;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="v12-top-offer">
        <div className="shell v12-top-offer-inner">
          <span><b>ArabDEV</b> — منتجات WordPress مبنية للعربي من البداية.</span>
          <a href={whatsappUrl("مرحباً، أريد الاستفسار عن منتجات ArabDEV")} target="_blank" rel="noreferrer">تواصل معنا ↗</a>
        </div>
      </section>

      <section className="v12-hero">
        <div className="shell v12-hero-grid">
          <div className="v12-hero-copy">
            <span className="v12-eyebrow">WORDPRESS PRODUCTS / ARABIC-FIRST</span>
            <h1>كل اللي تحتاجه<br />لبناء موقع <span>WordPress</span><br />عربي أقوى.</h1>
            <p>
              قوالب وإضافات وحلول WordPress موجهة للسوق العربي والخليجي —
              بواجهات أوضح، RTL حقيقي، تجربة موبايل محسوبة، وكود قابل للنمو.
            </p>
            <div className="v12-hero-actions">
              <Link href="/themes" className="v12-primary-btn">تصفح القوالب <span>↗</span></Link>
              <Link href="/plugins" className="v12-secondary-btn">استكشف الإضافات <span>+</span></Link>
            </div>
            <div className="v12-hero-trust">
              <div><strong>{String(themes.length).padStart(2, "0")}</strong><span>قوالب منشورة</span></div>
              <div><strong>{String(plugins.length).padStart(2, "0")}</strong><span>إضافات منشورة</span></div>
              <div><strong>{String(posts.length).padStart(2, "0")}</strong><span>مقالات ودلائل</span></div>
            </div>
          </div>

          <div className="v12-hero-product">
            <div className="v12-product-photo">
              <img src={featuredImage} alt={featuredTheme?.title || "ArabDEV WordPress Theme"} fetchPriority="high" decoding="async" />
              <span className="v12-product-shade" />
              <div className="v12-photo-top"><span>FEATURED THEME</span><span>{featuredTheme?.category || "WORDPRESS"}</span></div>
              <div className="v12-photo-bottom">
                <small>{featuredTheme?.label || "ARABIC WORDPRESS"}</small>
                <h2>{featuredTheme?.title || "ArabDEV Theme"}</h2>
                <p>{featuredTheme?.description || "واجهة WordPress عربية جاهزة لتبدأ منها بشكل احترافي."}</p>
              </div>
            </div>
            <div className="v12-product-bar">
              <div><span>الحالة</span><strong>{featuredTheme?.status || "متاح"}</strong></div>
              <div><span>السعر</span><strong>{featuredTheme?.price || "قريباً"}</strong></div>
              {featuredTheme?.externalUrl ? (
                <a href={featuredTheme.externalUrl} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
              ) : (
                <Link href="/themes">عرض القوالب ↗</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="v12-benefit-strip">
        <div className="shell">
          <span>RTL Native</span><i>•</i><span>Mobile First</span><i>•</i><span>SEO Ready</span><i>•</i><span>WooCommerce</span><i>•</i><span>Arabic Typography</span><i>•</i><span>Direct Support</span>
        </div>
      </section>

      <section className="shell v12-section v12-categories">
        <div className="v12-heading-row">
          <div><span className="v12-eyebrow">BROWSE / START HERE</span><h2>ابدأ من اللي محتاجه.</h2></div>
          <p>بدل ما تلف بين عشرات الصفحات، اختار نوع الحل وادخل مباشرة للمحتوى أو المنتج المناسب.</p>
        </div>
        <div className="v12-category-grid">
          {quickCategories.map((item) => (
            <Link href={item.href} key={item.key} className="v12-category-card">
              <span className="v12-category-icon"><CategoryIcon type={item.key} /></span>
              <div><strong>{item.title}</strong><small>{item.note}</small></div>
              <b>↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="v12-popular-wrap">
        <div className="shell v12-section">
          <div className="v12-heading-row v12-heading-light">
            <div><span className="v12-eyebrow">POPULAR / NEW DROPS</span><h2>ابدأ بأحدث المنتجات.</h2></div>
            <p>كل Cover هنا يأتي من الـDashboard. لو لم ترفع صورة بعد، يظهر fallback احترافي مؤقت فقط.</p>
          </div>

          <div className="v12-product-grid">
            {themes.slice(0, 2).map((theme, index) => {
              const image = themeImage(theme.slug, theme.coverImage);
              const content = <>
                <div className="v12-catalog-image"><img src={image} alt={theme.title} loading={index === 0 ? "eager" : "lazy"} decoding="async"/><span>{theme.category}</span></div>
                <div className="v12-catalog-copy"><small>THEME / {theme.status}</small><h3>{theme.title}</h3><p>{theme.description}</p><div><strong>{theme.price}</strong><b>عرض المنتج ↗</b></div></div>
              </>;
              return theme.externalUrl ? <a className="v12-catalog-card" href={theme.externalUrl} target="_blank" rel="noopener noreferrer" key={`t-${theme.slug}`}>{content}</a> : <Link className="v12-catalog-card" href="/themes" key={`t-${theme.slug}`}>{content}</Link>;
            })}
            {plugins.slice(0, 2).map((plugin) => {
              const image = pluginImage(plugin.slug, plugin.coverImage);
              const content = <>
                <div className="v12-catalog-image"><img src={image} alt={plugin.title} loading="lazy" decoding="async"/><span>{plugin.category}</span></div>
                <div className="v12-catalog-copy"><small>PLUGIN / {plugin.status}</small><h3>{plugin.title}</h3><p>{plugin.description}</p><div><strong>{plugin.price}</strong><b>عرض المنتج ↗</b></div></div>
              </>;
              return plugin.externalUrl ? <a className="v12-catalog-card" href={plugin.externalUrl} target="_blank" rel="noopener noreferrer" key={`p-${plugin.slug}`}>{content}</a> : <Link className="v12-catalog-card" href="/plugins" key={`p-${plugin.slug}`}>{content}</Link>;
            })}
          </div>

          <div className="v12-catalog-actions">
            <Link href="/themes">كل القوالب <span>↗</span></Link>
            <Link href="/plugins">كل الإضافات <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="shell v12-section v12-split-feature">
        <div className="v12-split-copy">
          <span className="v12-eyebrow">WHY ARABDEV</span>
          <h2>مش ترجمة لمنتج أجنبي.<br />التجربة نفسها مبنية للعربي.</h2>
          <p>من الخط والمسافات واتجاه الأيقونات، لصفحات الموبايل والـWooCommerce والـCTA — بنفكر في الاستخدام العربي من البداية.</p>
          <div className="v12-check-list">
            <span><b>01</b> Typography عربية مضبوطة</span>
            <span><b>02</b> Mobile UX قبل المؤثرات</span>
            <span><b>03</b> أداء وSEO قابلين للنمو</span>
            <span><b>04</b> إدارة المحتوى من Dashboard</span>
          </div>
          <Link href="/about" className="v12-text-link">اعرف أكتر عن ArabDEV ↗</Link>
        </div>
        <div className="v12-split-media">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=84" alt="فريق يعمل على تصميم وتطوير منتجات رقمية" loading="lazy" decoding="async" />
          <div className="v12-split-badge"><small>GCC READY</small><strong>Arabic-first</strong><span>Design · Code · Content</span></div>
        </div>
      </section>

      <section className="shell v12-section v12-journal">
        <div className="v12-heading-row">
          <div><span className="v12-eyebrow">JOURNAL / WORDPRESS</span><h2>محتوى يفيد قبل ما يبيع.</h2></div>
          <div><p>مقالات عن القوالب والإضافات والسرعة والـSEO وتجربة WordPress بالعربي.</p><Link href="/blog" className="v12-text-link">كل المقالات ↗</Link></div>
        </div>
        <div className="v12-article-grid">
          {posts.slice(0, 6).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}
        </div>
      </section>

      <section className="v12-stats-band">
        <div className="shell v12-stats-grid">
          <div><strong>{productCount || 0}</strong><span>منتج داخل المكتبة</span></div>
          <div><strong>RTL</strong><span>عربي من التصميم للكود</span></div>
          <div><strong>GCC</strong><span>السعودية والإمارات والخليج</span></div>
          <div><strong>1:1</strong><span>تواصل مباشر بدون تعقيد</span></div>
        </div>
      </section>

      <section className="shell v12-section v12-faq" id="faq">
        <div className="v12-faq-intro">
          <span className="v12-eyebrow">FAQ / QUICK ANSWERS</span>
          <h2>أسئلة قبل ما تبدأ.</h2>
          <p>الأسئلة دي مربوطة بالـDashboard، تقدر تضيف وتحذف وتعيد ترتيبها بدون تعديل الكود.</p>
          <a href={whatsappUrl("مرحباً، لدي سؤال عن ArabDEV")} target="_blank" rel="noreferrer" className="v12-text-link">سؤال تاني؟ كلمنا ↗</a>
        </div>
        <div className="v12-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.id || `${faq.question}-${index}`} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><b>+</b></summary>
              <div><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </section>

      <section className="shell v12-last-cta">
        <div><span className="v12-eyebrow">READY WHEN YOU ARE</span><h2>ابدأ بحاجة صغيرة.<br />وخليها تكبر صح.</h2><p>اختار قالب أو إضافة جاهزة، أو ابعت لنا فكرتك لو محتاج تنفيذ خاص.</p></div>
        <a href={whatsappUrl("مرحباً، أريد أن أبدأ مشروعاً مع ArabDEV")} target="_blank" rel="noreferrer">ابدأ على واتساب <span>↗</span></a>
      </section>
    </>
  );
}
