import type { Metadata } from "next";
import Link from "next/link";
import { ThemeCard } from "@/components/ThemeCard";
import { PluginCard } from "@/components/PluginCard";
import { ArticleCard } from "@/components/ArticleCard";
import { themeImage } from "@/lib/editorial-images";
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

const categories = [
  { index: "01", title: "قوالب WordPress", note: "متاجر · شركات · خدمات", href: "/themes" },
  { index: "02", title: "إضافات WordPress", note: "WooCommerce · UX · محتوى", href: "/plugins" },
  { index: "03", title: "Elementor", note: "واجهات سهلة التعديل", href: "/themes" },
  { index: "04", title: "مواقع مخصصة", note: "تصميم وتطوير حسب الطلب", href: "/contact" },
];

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
    : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=82";

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
      <section className="v11-hero">
        <div className="shell v11-hero-grid">
          <div className="v11-hero-copy">
            <div className="v11-kicker"><i /> ARABIC-FIRST WORDPRESS PRODUCTS</div>
            <h1>
              منتجات WordPress<br />
              <span>جاهزة تبدأ بيها صح.</span>
            </h1>
            <p>
              قوالب، إضافات، وتنفيذ WordPress مخصص للسوق العربي والخليجي —
              بواجهة عربية متزنة، موبايل مضبوط، وكود سريع قابل للتوسع.
            </p>
            <div className="v11-hero-actions">
              <Link href="/themes" className="v11-btn v11-btn-dark">استكشف القوالب <b>↗</b></Link>
              <Link href="/plugins" className="v11-btn v11-btn-light">تصفح الإضافات <b>+</b></Link>
            </div>
            <div className="v11-proof-row">
              <span><b>RTL</b> عربي من البداية</span>
              <span><b>Mobile</b> تجربة موبايل حقيقية</span>
              <span><b>SEO</b> بنية جاهزة للنمو</span>
            </div>
          </div>

          <div className="v11-featured-product">
            <div className="v11-featured-frame">
              <img src={featuredImage} alt={featuredTheme?.title || "ArabDEV WordPress product"} fetchPriority="high" decoding="async" />
              <div className="v11-featured-overlay" />
              <div className="v11-featured-top"><span>FEATURED DROP</span><span>ARABDEV / 01</span></div>
              <div className="v11-featured-copy">
                <small>{featuredTheme?.category || "WORDPRESS / ARABIC-FIRST"}</small>
                <strong>{featuredTheme?.title || "ArabDEV Starter"}</strong>
                <p>{featuredTheme?.description || "منتج WordPress عربي مصمم بشكل نظيف وسريع."}</p>
                {featuredTheme?.externalUrl ? (
                  <a href={featuredTheme.externalUrl} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
                ) : (
                  <Link href="/themes">عرض المكتبة ↗</Link>
                )}
              </div>
            </div>
            <div className="v11-floating-card v11-floating-one"><small>THEMES</small><b>{themes.length || "01"}</b><span>منتجات منشورة</span></div>
            <div className="v11-floating-card v11-floating-two"><small>PLUGINS</small><b>{plugins.length || "01"}</b><span>أدوات عملية</span></div>
          </div>
        </div>
      </section>

      <section className="v11-category-strip">
        <div className="shell v11-category-grid">
          {categories.map((item) => (
            <Link href={item.href} key={item.index}>
              <span>{item.index}</span>
              <div><b>{item.title}</b><small>{item.note}</small></div>
              <i>↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell v11-section v11-products-section">
        <div className="v11-section-head">
          <div><span className="v11-kicker">THEMES / NEWEST</span><h2>قوالب تبني عليها<br />مش مجرد Demo شكله حلو.</h2></div>
          <div><p>كل صورة منتج هنا بتتغير من لوحة التحكم. لو ما رفعتش صورة، الموقع يستخدم صورة احترافية مؤقتة لحد ما تضيف الـCover الحقيقي.</p><Link href="/themes">كل القوالب <b>↗</b></Link></div>
        </div>
        <div className="v11-theme-grid">
          {themes.slice(0, 6).map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}
        </div>
      </section>

      <section className="v11-dark-band">
        <div className="shell v11-dark-grid">
          <div className="v11-dark-intro">
            <span className="v11-kicker v11-kicker-light">WHY ARABDEV</span>
            <h2>مش بنضيف RTL<br />في آخر المشروع.</h2>
            <p>العربي والموبايل والسرعة جزء من أول قرار تصميم، مش تعديلات بنعملها بعد ما الواجهة تخلص.</p>
            <Link href="/about">اعرف طريقة شغلنا ↗</Link>
          </div>
          <div className="v11-value-grid">
            <article><span>01</span><h3>Arabic-first</h3><p>Typography ومسافات واتجاهات متظبطة للنص العربي من البداية.</p></article>
            <article><span>02</span><h3>Performance</h3><p>واجهة أخف، صور محسنة، وJavaScript أقل قدر الإمكان.</p></article>
            <article><span>03</span><h3>GCC-ready</h3><p>تجربة تناسب المتاجر والخدمات والشركات في السعودية والإمارات والخليج.</p></article>
            <article><span>04</span><h3>Easy to manage</h3><p>المحتوى والصور والمنتجات تتغير من Dashboard بدل لمس الكود كل مرة.</p></article>
          </div>
        </div>
      </section>

      <section className="shell v11-section v11-plugin-section">
        <div className="v11-section-head">
          <div><span className="v11-kicker">PLUGINS / TOOLS</span><h2>إضافات مركزة.<br />كل واحدة تحل حاجة صح.</h2></div>
          <div><p>بدل Plugin ضخم فيه عشرات المزايا غير المستخدمة، نبني أدوات خفيفة وواضحة للـConversion والمحتوى وWooCommerce.</p><Link href="/plugins">كل الإضافات <b>↗</b></Link></div>
        </div>
        <div className="v11-plugin-grid">
          {plugins.slice(0, 6).map((plugin) => <PluginCard key={plugin.slug} plugin={plugin} />)}
        </div>
      </section>

      <section className="v11-help-band">
        <div className="shell v11-help-grid">
          <div><small>مش عارف تبدأ منين؟</small><h2>قول لنا مشروعك،<br />ونرشح لك الطريق الأقصر.</h2></div>
          <div>
            <p>لو محتاج قالب جاهز، إضافة، أو تنفيذ مخصص، ابعت نوع المشروع والهدف الأساسي وهنقولك الأنسب قبل ما تبدأ.</p>
            <a href={whatsappUrl("مرحباً، أريد ترشيح أنسب حل لمشروعي على ArabDEV")} target="_blank" rel="noreferrer" className="v11-btn v11-btn-dark">اسأل على واتساب <b>↗</b></a>
          </div>
        </div>
      </section>

      <section className="shell v11-section v11-journal-section">
        <div className="v11-section-head">
          <div><span className="v11-kicker">JOURNAL / SEO</span><h2>محتوى يساعدك تختار،<br />ويساعدنا نتوجد في البحث.</h2></div>
          <div><p>مقالات عملية عن WordPress، Elementor، المتاجر، السرعة والـSEO. كل مقال له صورة وصفحة قراءة وبيانات مهيأة لمحركات البحث.</p><Link href="/blog">كل المقالات <b>↗</b></Link></div>
        </div>
        <div className="v11-article-grid">
          {posts.slice(0, 6).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}
        </div>
      </section>

      <section className="shell v11-section v11-faq-section" id="faq">
        <div className="v11-faq-head">
          <span className="v11-kicker">FAQ / BEFORE YOU START</span>
          <h2>أسئلة قبل ما تبدأ.</h2>
          <p>الأسئلة دي تقدر تضيفها وتعدلها وتحذفها من Dashboard بعد تشغيل تحديث قاعدة البيانات V11.</p>
        </div>
        <div className="v11-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.id || `${faq.question}-${index}`} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><b>{faq.question}</b><i>+</i></summary>
              <div><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </section>

      <section className="shell v11-final-cta">
        <div><span>ARABDEV / LET'S BUILD</span><h2>أول منتج عندك<br />يستاهل بداية محترمة.</h2><p>ابدأ بالقالب، الإضافة، أو الموقع المناسب وبعدها نكبر المكتبة والمحتوى واحدة واحدة.</p></div>
        <a href={whatsappUrl("مرحباً، أريد أن أبدأ مع ArabDEV")} target="_blank" rel="noreferrer"><span>ابدأ الآن</span><b>↗</b></a>
      </section>
    </>
  );
}
