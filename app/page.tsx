import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteEffects } from "@/components/SiteEffects";
import { ArticleCard } from "@/components/ArticleCard";
import { HomeStore } from "@/components/HomeStore";
import { HomeFaq } from "@/components/HomeFaq";
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
    "ArabDEV متجر عربي لقوالب وإضافات WordPress وحلول مخصصة، بواجهات RTL حقيقية وتجربة موبايل مناسبة للسوق الخليجي.",
  alternates: { canonical: "/" },
};

const categories = [
  { icon: "grid", title: "كل المنتجات", note: "ابدأ من المكتبة كاملة", href: "/themes" },
  { icon: "theme", title: "قوالب WordPress", note: "متاجر وشركات وخدمات", href: "/themes" },
  { icon: "plugin", title: "إضافات WordPress", note: "أدوات خفيفة ومركزة", href: "/plugins" },
  { icon: "shop", title: "WooCommerce", note: "تجربة شراء عربية", href: "/themes" },
  { icon: "builder", title: "Elementor", note: "واجهات سهلة التعديل", href: "/themes" },
  { icon: "speed", title: "السرعة والأداء", note: "Core أخف للموبايل", href: "/blog" },
  { icon: "seo", title: "SEO والمحتوى", note: "مقالات ودلائل عملية", href: "/blog" },
  { icon: "custom", title: "تنفيذ مخصص", note: "حل مبني لمشروعك", href: "/contact" },
] as const;

const marquee = [
  "WORDPRESS THEMES",
  "ARABIC FIRST",
  "RTL NATIVE",
  "MOBILE FIRST",
  "WOOCOMMERCE",
  "ELEMENTOR",
  "SEO READY",
  "DIRECT SUPPORT",
];

function CategoryIcon({ type }: { type: (typeof categories)[number]["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "theme") return <svg {...common}><rect x="3" y="4" width="18" height="15" rx="2.5"/><path d="M3 9h18M8 19v2h8v-2"/></svg>;
  if (type === "plugin") return <svg {...common}><path d="M9 3v4M15 3v4M7 7h10v3.5a5 5 0 0 1-10 0V7Z"/><path d="M12 15.5V21"/></svg>;
  if (type === "shop") return <svg {...common}><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M8 8a4 4 0 0 1 8 0"/></svg>;
  if (type === "builder") return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (type === "speed") return <svg {...common}><path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 14 4-5M5 18h14"/></svg>;
  if (type === "seo") return <svg {...common}><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5M7.5 12l2-2 2 2 3-4"/></svg>;
  if (type === "custom") return <svg {...common}><path d="m4 17 6-6 3 3 7-7"/><path d="M15 7h5v5M4 21h16"/></svg>;
  return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>;
}

export default async function Home() {
  const [themes, plugins, posts, faqs] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
    getPublishedFaqs(),
  ]);

  const featuredTheme = themes[0];
  const secondTheme = themes[1] || featuredTheme;
  const featuredPlugin = plugins[0];
  const secondPlugin = plugins[1] || featuredPlugin;

  const heroThemeImage = featuredTheme
    ? themeImage(featuredTheme.slug, featuredTheme.coverImage)
    : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=82";
  const heroPluginImage = featuredPlugin
    ? pluginImage(featuredPlugin.slug, featuredPlugin.coverImage)
    : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=82";
  const secondThemeImage = secondTheme
    ? themeImage(secondTheme.slug, secondTheme.coverImage)
    : heroThemeImage;

  const products = [
    ...themes.slice(0, 4).map((item) => ({ kind: "THEME" as const, item, image: themeImage(item.slug, item.coverImage), href: `/themes/${item.slug}` })),
    ...plugins.slice(0, 4).map((item) => ({ kind: "PLUGIN" as const, item, image: pluginImage(item.slug, item.coverImage), href: `/plugins/${item.slug}` })),
  ];

  const primaryProducts = products.slice(0, 8);
  const storeProducts = primaryProducts.map(({ kind, item, image, href }) => ({
    kind,
    slug: item.slug,
    title: item.title,
    category: item.category,
    description: item.description,
    price: item.price,
    status: item.status,
    image,
    href,
    commerce: /woocommerce|ووكومرس|متجر/i.test(
      `${item.title} ${item.label} ${item.category} ${item.description} ${(item.keywords || []).join(" ")}`,
    ),
  }));
  const featuredProducts = products.length > 4 ? [...products].reverse().slice(0, 4) : products;

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
      <SiteEffects />
      <Header />
      <main className="v14-home">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="v14-hero">
          <div className="shell v14-hero-grid">
            <div className="v14-hero-copy">
              <span className="v14-eyebrow"><i /> ARABDEV / WORDPRESS STORE</span>
              <h1><span className="v14-title-line">كل اللي تحتاجه</span><span className="v14-title-line">لموقع <em>WordPress</em></span><span className="v14-title-line">عربي أقوى.</span></h1>
              <p>
                قوالب وإضافات وحلول مخصصة للسوق العربي والخليجي — RTL حقيقي،
                تجربة موبايل محسوبة، وأداء نظيف من غير تعقيد.
              </p>
              <div className="v14-hero-actions">
                <Link href="/themes" className="v14-btn v14-btn-primary">تصفح القوالب <span>↗</span></Link>
                <Link href="/plugins" className="v14-btn v14-btn-secondary">شوف الإضافات <span>+</span></Link>
              </div>
              <div className="v14-hero-proof">
                <div><b>RTL</b><span>Arabic-first</span><small>العربي من البداية</small></div>
                <div><b>{String(themes.length + plugins.length).padStart(2, "0")}</b><span>Products</span><small>قوالب وإضافات</small></div>
                <div><b>GCC</b><span>Market ready</span><small>للخليج والسوق العربي</small></div>
              </div>
            </div>

            <div className="v14-hero-showcase">
              <Link
                className="v14-hero-main-card"
                href={featuredTheme ? `/themes/${featuredTheme.slug}` : "/themes"}
              >
                <img src={heroThemeImage} alt={featuredTheme?.title || "قالب WordPress عربي"} fetchPriority="high" decoding="async" />
                <span className="v14-media-shade" />
                <div className="v14-card-top"><span>FEATURED THEME</span><b>01 / {String(themes.length || 1).padStart(2, "0")}</b></div>
                <div className="v14-card-copy">
                  <small>{featuredTheme?.category || "WORDPRESS THEME"}</small>
                  <h2>{featuredTheme?.title || "قالب عربي احترافي"}</h2>
                  <p>{featuredTheme?.description || "واجهة WordPress مصممة للعربي من أول قرار."}</p>
                  <div><strong>{featuredTheme?.price || "قريباً"}</strong><span>شاهد التفاصيل ↗</span></div>
                </div>
              </Link>

              <Link
                className="v14-hero-mini-card v14-hero-mini-plugin"
                href={featuredPlugin ? `/plugins/${featuredPlugin.slug}` : "/plugins"}
              >
                <img src={heroPluginImage} alt={featuredPlugin?.title || "إضافة WordPress"} loading="eager" decoding="async" />
                <span className="v14-media-shade" />
                <div><small>PLUGIN PICK</small><b>{featuredPlugin?.title || "WordPress Plugin"}</b><span>شاهد التفاصيل · ↗</span></div>
              </Link>

              <a className="v14-hero-mini-card v14-hero-mini-custom" href={whatsappUrl("مرحباً، أريد تنفيذ WordPress مخصص لمشروعي")} target="_blank" rel="noreferrer">
                <span className="v14-custom-orbit" aria-hidden="true"><i/><i/><i/></span>
                <div><small>CUSTOM BUILD</small><b>مش لاقي الجاهز؟</b><span>ننفذه مخصوص · ↗</span></div>
              </a>
            </div>
          </div>
        </section>

        <section className="v14-marquee" aria-label="مميزات ArabDEV">
          <div className="v14-marquee-track">
            {[0, 1].map((copy) => (
              <div className="v14-marquee-group" key={copy} aria-hidden={copy === 1}>
                {marquee.map((item) => <span key={`${copy}-${item}`}>{item}<i>✦</i></span>)}
              </div>
            ))}
          </div>
        </section>

        <section className="shell v14-category-wrap">
          <div className="v14-category-head">
            <div><span className="v14-eyebrow">BROWSE / CATEGORIES</span><h2>ادخل على اللي محتاجه مباشرة.</h2></div>
            <Link href="/themes">عرض المكتبة <span>↗</span></Link>
          </div>
          <div className="v14-category-grid">
            {categories.map((category) => (
              <Link href={category.href} className="v14-category-card" key={category.title}>
                <span className="v14-category-icon"><CategoryIcon type={category.icon} /></span>
                <strong>{category.title}</strong>
                <small>{category.note}</small>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="v14-store-section">
          <div className="shell v14-section">
            <div className="v14-section-head v14-store-head">
              <div><span className="v14-eyebrow">POPULAR / STORE</span><h2>المنتجات الأكثر طلباً.</h2></div>
            </div>
            <HomeStore products={storeProducts} />
          </div>
        </section>

        <section className="shell v14-promo-banner">
          <div className="v14-promo-copy">
            <span className="v14-eyebrow v14-eyebrow-light">CUSTOM WORDPRESS</span>
            <h2>المشروع محتاج أكتر<br />من Theme جاهز؟</h2>
            <p>نقدر نبني Landing Page، موقع شركة، متجر أو Plugin مخصص بنفس الهوية والأداء.</p>
            <a href={whatsappUrl("مرحباً، أريد مناقشة تنفيذ WordPress مخصص")} target="_blank" rel="noreferrer">اطلب تنفيذ مخصص <span>↗</span></a>
          </div>
          <div className="v14-promo-visual" aria-hidden="true">
            <img src={secondThemeImage} alt="" loading="lazy" decoding="async" />
            <span />
            <div><b>DESIGN</b><b>CODE</b><b>RTL</b></div>
          </div>
        </section>

        <section className="shell v14-section v14-featured">
          <div className="v14-section-head">
            <div><span className="v14-eyebrow">FEATURED / PICKS</span><h2>اختيارات مميزة للمشروع الجاي.</h2></div>
            <p>مش لازم تشوف عشرات المنتجات. هنا بنجمع الاختيارات اللي وظيفتها واضحة وتبدأ منها أسرع.</p>
          </div>
          <div className="v14-feature-grid">
            {featuredProducts.map(({ kind, item, image, href }, index) => {
              const card = <>
                <div className="v14-feature-media"><img src={image} alt={item.title} loading="lazy" decoding="async" /><span>{String(index + 1).padStart(2, "0")}</span><i className="v14-feature-overlay-v19">شاهد التفاصيل ↗</i></div>
                <div className="v14-feature-copy"><small>{kind} / {item.category}</small><h3>{item.title}</h3><p>{item.description}</p><div><strong>{item.price}</strong><b>التفاصيل ↗</b></div></div>
              </>;
              return <Link href={href} className="v14-feature-card" key={`feature-${item.slug}`}>{card}</Link>;
            })}
          </div>
        </section>

        <section className="v14-confidence-band">
          <div className="shell v14-confidence-grid">
            <article><span>01</span><h3>عربي من البداية</h3><p>RTL، الخطوط، اتجاه الحركة والمسافات معمولة للعربي مش مترجمة بعد التصميم.</p></article>
            <article><span>02</span><h3>Mobile-first</h3><p>القرارات المهمة والـCTA وتجربة الشراء متظبطة للشاشة اللي العميل بيستخدمها فعلاً.</p></article>
            <article><span>03</span><h3>كود أخف</h3><p>أقل مؤثرات مالهاش لازمة، وصور ومكونات محسوبة علشان الأداء يفضل قابل للنمو.</p></article>
            <article><span>04</span><h3>دعم مباشر</h3><p>لو محتار بين قالب وإضافة أو محتاج تنفيذ مخصوص، تقدر تتواصل مباشرة قبل ما تبدأ.</p></article>
          </div>
        </section>

        <section className="shell v14-section v14-journal">
          <div className="v14-section-head">
            <div><span className="v14-eyebrow">JOURNAL / KNOWLEDGE</span><h2>محتوى يساعدك تختار صح.</h2></div>
            <div className="v14-journal-side"><p>WordPress، Elementor، السرعة، SEO وتجربة المواقع العربية — محتوى عملي قبل قرار الشراء أو التنفيذ.</p><Link href="/blog">كل المقالات ↗</Link></div>
          </div>
          <div className="v14-articles-grid">{posts.slice(0, 3).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}</div>
        </section>

        <section className="v14-faq-wrap" id="faq">
          <div className="shell v14-section v14-faq">
            <div className="v14-faq-intro">
              <span className="v14-eyebrow">FAQ / QUICK ANSWERS</span>
              <h2>قبل ما تختار.</h2>
              <p>إجابات سريعة على أكثر الأسئلة اللي بتظهر قبل شراء منتج أو طلب تنفيذ.</p>
              <a href={whatsappUrl("مرحباً، عندي سؤال عن منتجات ArabDEV")} target="_blank" rel="noreferrer">اسألنا مباشرة ↗</a>
            </div>
            <HomeFaq faqs={faqs.slice(0, 6)} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
