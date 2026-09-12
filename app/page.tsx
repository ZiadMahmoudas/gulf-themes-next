import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteEffects } from "@/components/SiteEffects";
import { HomeFaq } from "@/components/HomeFaq";
import { articleImage, pluginImage, themeImage } from "@/lib/editorial-images";
import { whatsappUrl } from "@/lib/site";
import { getPublishedArticles, getPublishedFaqs, getPublishedPlugins, getPublishedThemes } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "قوالب وإضافات WordPress عربية احترافية",
  description: "ArabDEV منصة عربية لقوالب وإضافات WordPress وحلول مخصصة، مصممة للعربي والموبايل والسوق الخليجي من البداية.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [themes, plugins, posts, faqs] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
    getPublishedFaqs(),
  ]);

  const featuredTheme = themes[0];
  const featuredPlugin = plugins[0];
  const featuredImage = featuredTheme
    ? themeImage(featuredTheme.slug, featuredTheme.coverImage)
    : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=84";

  const productCards = [
    ...themes.slice(0, 3).map((item) => ({
      type: "قالب",
      title: item.title,
      description: item.description,
      price: item.price,
      image: themeImage(item.slug, item.coverImage),
      href: `/themes/${item.slug}`,
    })),
    ...plugins.slice(0, 3).map((item) => ({
      type: "إضافة",
      title: item.title,
      description: item.description,
      price: item.price,
      image: pluginImage(item.slug, item.coverImage),
      href: `/plugins/${item.slug}`,
    })),
  ].slice(0, 6);

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
      <main className="v23-home">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="v23-hero">
          <div className="shell v23-hero-grid">
            <div className="v23-hero-copy">
              <span className="v23-kicker"><i /> ARABDEV / WORDPRESS PRODUCTS</span>
              <h1>
                منتجات WordPress مصممة للعربي. <span className="v23-gold">جاهزة تبدأ بيها أسرع.</span>
              </h1>
              <p>
                قوالب، إضافات، وتنفيذ مخصص بواجهة عربية حقيقية، تجربة موبايل محسوبة،
                وأداء مناسب للسعودية والإمارات وباقي السوق الخليجي.
              </p>
              <div className="v23-hero-actions">
                <Link href="/themes" className="v23-btn v23-btn-dark">تصفح القوالب <span>↗</span></Link>
                <Link href="/plugins" className="v23-btn v23-btn-light">شوف الإضافات <span>+</span></Link>
              </div>
              <div className="v23-hero-points">
                <span><b>RTL</b> من البداية</span>
                <span><b>Mobile</b> تجربة محسوبة</span>
                <span><b>SEO</b> بنية جاهزة</span>
                <span><b>GCC</b> للسوق الخليجي</span>
              </div>
            </div>

            <Link
              href={featuredTheme ? `/themes/${featuredTheme.slug}` : "/themes"}
              className="v23-featured-card v23-featured-card-clean"
              aria-label={featuredTheme?.title || "قالب WordPress عربي"}
            >
              <img src={featuredImage} alt={featuredTheme?.title || "قالب WordPress عربي"} fetchPriority="high" decoding="async" />
            </Link>
          </div>
        </section>

        <section className="v23-trustbar">
          <div className="shell">
            <span>WORDPRESS THEMES</span><i>•</i><span>PLUGINS</span><i>•</i><span>ARABIC FIRST</span><i>•</i><span>RTL NATIVE</span><i>•</i><span>MOBILE FIRST</span><i>•</i><span>DIRECT SUPPORT</span>
          </div>
        </section>

        <section className="shell v23-offer-section">
          <div className="v23-section-head">
            <div><small>WHAT WE OFFER</small><h2>اختار البداية المناسبة لمشروعك.</h2></div>
            <p>ابدأ بمنتج جاهز، أو اطلب تنفيذ مخصص لو محتاج تجربة مختلفة بالكامل.</p>
          </div>
          <div className="v23-offer-grid">
            <Link href="/themes"><span>01</span><b>قوالب WordPress</b><p>متاجر، شركات، خدمات، وبورتفوليو بواجهات عربية جاهزة للتعديل.</p><em>استكشف القوالب ↗</em></Link>
            <Link href="/plugins"><span>02</span><b>إضافات WordPress</b><p>أدوات عملية خفيفة تضيف وظائف واضحة بدل تحميل الموقع بإضافات ضخمة.</p><em>استكشف الإضافات ↗</em></Link>
            <a href={whatsappUrl("مرحباً، أريد تنفيذ موقع WordPress مخصص")} target="_blank" rel="noreferrer"><span>03</span><b>تنفيذ مخصص</b><p>لو المنتج الجاهز لا يكفي، نبني لك الواجهة أو الوظيفة حسب مشروعك.</p><em>ابدأ مشروعك ↗</em></a>
          </div>
        </section>

        <section className="v23-products-section">
          <div className="shell">
            <div className="v23-section-head v23-section-head-light">
              <div><small>LATEST PRODUCTS</small><h2>أحدث ما نزل على ArabDEV.</h2></div>
              <Link href="/themes">عرض المكتبة <span>↗</span></Link>
            </div>
            <div className="v23-products-grid">
              {productCards.map((product) => (
                <Link href={product.href} className="v23-product-card" key={`${product.type}-${product.href}`}>
                  <div className="v23-product-media"><img src={product.image} alt={product.title} loading="lazy" decoding="async" /><span>{product.type}</span></div>
                  <div className="v23-product-body"><small>متاح الآن</small><h3>{product.title}</h3><p>{product.description}</p><div><b>{product.price}</b><span>التفاصيل ↗</span></div></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="shell v23-story-section">
          <div className="v23-story-media"><img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=84" alt="تصميم وتطوير واجهات WordPress" loading="lazy" decoding="async" /></div>
          <div className="v23-story-copy"><small>WHY ARABDEV</small><h2>مش بنعرّب تصميم أجنبي. بنصمم التجربة للعربي من أول قرار.</h2><p>الخطوط، المسافات، اتجاه العناصر، الموبايل، أزرار الشراء، واتساب، وسرعة التحميل كلها جزء من المنتج، مش إضافات بنفتكرها في الآخر.</p><Link href="/about">اعرف أكثر عن ArabDEV ↗</Link></div>
        </section>

        <section className="shell v23-articles-section">
          <div className="v23-section-head"><div><small>JOURNAL</small><h2>محتوى يساعدك تختار وتبني صح.</h2></div><Link href="/blog">كل المقالات ↗</Link></div>
          <div className="v23-articles-grid">
            {posts.slice(0, 6).map((post) => (
              <Link href={`/blog/${post.slug}`} className="v23-article-card" key={post.slug}>
                <img src={articleImage(post.slug, post.featuredImage)} alt={post.title} loading="lazy" decoding="async" />
                <div><small>{post.category} · {post.readTime}</small><h3>{post.title}</h3><p>{post.excerpt}</p><span>اقرأ المزيد ↗</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="v23-faq-section">
          <div className="shell v23-faq-grid">
            <div><small>FAQ</small><h2>قبل ما تبدأ، دي أكثر أسئلة بتتكرر.</h2><p>وإنت تقدر تضيف وتعدل الأسئلة دي من الـDashboard.</p></div>
            <HomeFaq faqs={faqs} />
          </div>
        </section>

        <section className="shell v23-final-cta">
          <div><small>READY TO START?</small><h2>لقيت اللي يناسبك؟ ابدأ قبل ما تضيع وقتك في البناء من الصفر.</h2></div>
          <div><Link href="/themes" className="v23-btn v23-btn-dark">شوف المنتجات ↗</Link><a href={whatsappUrl("مرحباً، أريد الاستفسار عن منتجات ArabDEV")} className="v23-btn v23-btn-light" target="_blank" rel="noreferrer">كلّمنا واتساب</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
