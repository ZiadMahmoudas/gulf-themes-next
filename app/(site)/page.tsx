import Link from "next/link";
import { ThemeCard } from "@/components/ThemeCard";
import { ArticleCard } from "@/components/ArticleCard";
import { PluginCard } from "@/components/PluginCard";
import { whatsappUrl } from "@/lib/site";
import {
  getPublishedArticles,
  getPublishedPlugins,
  getPublishedThemes,
} from "@/lib/public-data";

export default async function Home() {
  const [themes, plugins, posts] = await Promise.all([
    getPublishedThemes(),
    getPublishedPlugins(),
    getPublishedArticles(),
  ]);

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy-wrap">
          <div className="hero-kicker">
            <span className="live-dot" /> ARABDEV / WORDPRESS STUDIO
          </div>
          <h1>
            منتجات رقمية
            <br />
            <em>تفهم العربي.</em>
          </h1>
          <p className="hero-copy">
            ArabDEV بيقدم قوالب WordPress جاهزة، إضافات عملية، وتنفيذ مواقع مخصصة للشركات والمتاجر العربية — مع تجربة RTL وموبايل وأداء معمولة صح من البداية.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/themes" prefetch>
              <span>استكشف القوالب</span><b>↗</b>
            </Link>
            <Link className="button ghost" href="/plugins" prefetch>
              <span>شوف الإضافات</span><b>+</b>
            </Link>
          </div>
          <div className="hero-proof">
            <div><span>01</span><b>Arabic First</b><small>RTL وتايبوجرافي من البداية</small></div>
            <div><span>02</span><b>Fast Core</b><small>واجهة خفيفة بدون حمل زائد</small></div>
            <div><span>03</span><b>GCC Focus</b><small>مناسب للسعودية والإمارات والخليج</small></div>
          </div>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="showcase-glow" />
          <div className="showcase-label"><span>FEATURED / ARABDEV</span><b>2026</b></div>
          <div className="showcase-browser">
            <div className="browser-bar"><i /><i /><i /><span>gulfshop.preview</span></div>
            <div className="browser-content">
              <small>GULFSHOP / FASHION</small>
              <h2>واجهة عربية<br />تبيع أحسن.</h2>
              <span className="browser-pill">VIEW DEMO ↗</span>
              <div className="browser-products"><i /><i /><i /></div>
            </div>
          </div>
          <div className="floating-card floating-theme"><small>THEME</small><b>GulfShop</b><span>WooCommerce · RTL</span></div>
          <div className="floating-card floating-plugin"><small>PLUGIN</small><b>WhatsApp Pulse</b><span>Conversion · Lightweight</span></div>
          <div className="showcase-note">Premium WordPress products<br />for Arabic businesses.</div>
        </div>
      </section>

      <section className="rail" aria-label="مميزات ArabDEV">
        <div>
          <span>ARABIC FIRST</span><i>✦</i><span>WORDPRESS</span><i>✦</i>
          <span>ELEMENTOR</span><i>✦</i><span>PLUGINS</span><i>✦</i>
          <span>SEO READY</span><i>✦</i><span>GCC UX</span>
        </div>
      </section>

      <section className="shell offer-clarity" data-reveal>
        <div className="offer-clarity-head"><span className="eyebrow">What we do / 00</span><h2>اختار اللي مشروعك محتاجه.<br />وسيّب الباقي علينا.</h2><p>سواء محتاج تبدأ بقالب جاهز، تزود وظيفة بإضافة، أو تنفذ تجربة كاملة مخصوص — ArabDEV بيخليك تبدأ من حل واضح وقابل للتوسع.</p></div>
        <div className="offer-clarity-grid">
          <Link href="/themes"><span>01</span><div><small>WORDPRESS THEMES</small><h3>قوالب جاهزة</h3><p>مواقع ومتاجر عربية جاهزة للتخصيص، مع Demo حقيقي وتجربة Mobile وRTL محسوبة.</p></div><b>↗</b></Link>
          <Link href="/plugins"><span>02</span><div><small>WORDPRESS PLUGINS</small><h3>إضافات عملية</h3><p>وظائف مركزة تحسن التحويل أو المحتوى أو تجربة WooCommerce بدون تحميل زائد.</p></div><b>↗</b></Link>
          <Link href="/contact"><span>03</span><div><small>CUSTOM DEVELOPMENT</small><h3>تنفيذ مخصص</h3><p>موقع أو Theme أو Plugin مخصوص لو مشروعك محتاج حاجة أبعد من المنتجات الجاهزة.</p></div><b>↗</b></Link>
        </div>
      </section>

      <section className="section shell collection-section" data-reveal>
        <div className="section-head">
          <div>
            <span className="eyebrow">Theme collection / 01</span>
            <h2>قوالب تبني عليها<br />براند، مش مجرد موقع.</h2>
          </div>
          <div className="section-side-copy">
            <p>مكتبة متجددة من القوالب العربية. كل منتج له Demo خارجي وتجربة واضحة قبل التواصل أو الشراء.</p>
            <Link href="/themes" prefetch>عرض المكتبة <span>↗</span></Link>
          </div>
        </div>
        <div className="category-pills" aria-hidden="true">
          <span className="active">الكل</span><span>متاجر</span><span>خدمات</span><span>شركات</span><span>Portfolio</span>
        </div>
        <div className="themes-grid">
          {themes.slice(0, 6).map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}
        </div>
      </section>

      <section className="bento-wrap" data-reveal="soft">
        <div className="shell bento-grid">
          <article className="bento-card bento-intro">
            <span className="eyebrow light">Why ArabDEV</span>
            <h2>مش تعريب<br />بعد التصميم.</h2>
            <p>العربي جزء من النظام: الخط، المسافات، الـRTL، الموبايل، المحتوى وقرارات التحويل.</p>
          </article>
          <article className="bento-card bento-type">
            <span>TYPE</span>
            <div className="arabic-type-demo">عربي<br />واضح<br />ومتزن.</div>
            <small>IBM Plex Sans Arabic / tuned spacing / readable scale</small>
          </article>
          <article className="bento-card bento-mobile">
            <span>MOBILE</span>
            <div className="phone-shell"><div className="phone-screen"><i /><h3>موبايل<br />من الأول.</h3><div className="phone-nav"><b>⌂</b><b>⌕</b><b>＋</b><b>♡</b></div></div></div>
            <small>Mobile-first UX & CTA</small>
          </article>
          <article className="bento-card bento-code">
            <span>CORE</span>
            <pre>{`<ArabDEV\n  rtl\n  fast\n  scalable\n/>`}</pre>
            <small>Next.js storefront + WordPress products + Supabase CMS.</small>
          </article>
        </div>
      </section>

      <section className="section shell plugin-home-section" data-reveal>
        <div className="section-head">
          <div><span className="eyebrow">Plugin lab / 02</span><h2>إضافات بتحل<br />حاجة واحدة صح.</h2></div>
          <div className="section-side-copy">
            <p>Plugins عملية وخفيفة بدل تحميل الموقع عشرات المميزات غير المستخدمة.</p>
            <Link href="/plugins" prefetch>عرض الإضافات <span>↗</span></Link>
          </div>
        </div>
        <div className="plugins-grid">
          {plugins.slice(0, 6).map((plugin) => <PluginCard key={plugin.slug} plugin={plugin} />)}
        </div>
      </section>

      <section className="workflow-section" data-reveal>
        <div className="shell">
          <div className="workflow-head"><span className="eyebrow light">من الاختيار للإطلاق</span><h2>جرّب. اختار. ابدأ.</h2></div>
          <div className="workflow-grid">
            <div><span>01</span><h3>شوف الـDemo</h3><p>افتح المشروع الحقيقي واختبر الشكل والتجربة قبل ما تتواصل.</p></div>
            <div><span>02</span><h3>اختار المناسب</h3><p>Theme أو Plugin أو تنفيذ مخصص حسب احتياج مشروعك.</p></div>
            <div><span>03</span><h3>ابدأ مباشرة</h3><p>تواصل على واتساب بدون رحلة شراء معقدة في البداية.</p></div>
          </div>
          <a className="workflow-cta" href={whatsappUrl("مرحباً، أريد ترشيح أنسب Theme أو Plugin لمشروعي")} target="_blank" rel="noreferrer">
            <span>مش عارف تبدأ بإيه؟</span><b>خلّينا نرشح لك المناسب ↗</b>
          </a>
        </div>
      </section>

      <section className="section shell articles-section" data-reveal>
        <div className="section-head">
          <div><span className="eyebrow">Knowledge / 03</span><h2>محتوى يبني ثقة،<br />ويجيب Search.</h2></div>
          <div className="section-side-copy">
            <p>مقالات WordPress وSEO وتجربة المستخدم العربية، ومدارتها بالكامل من لوحة التحكم.</p>
            <Link href="/blog" prefetch>كل المقالات <span>↗</span></Link>
          </div>
        </div>
        <div className="articles-grid home-articles-grid">
          {posts.slice(0, 3).map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}
        </div>
      </section>

      <section className="shell cta-band" data-reveal="soft">
        <div><span className="eyebrow">Custom request</span><h2>محتاج حاجة مخصوص؟<br />نبنيها معاك.</h2><p>ثيم، Plugin، أو موقع كامل موجه للسوق الخليجي.</p></div>
        <a className="cta-round" href={whatsappUrl("مرحباً، عندي فكرة وأريد تنفيذها مع ArabDEV")} target="_blank" rel="noreferrer"><span>ابدأ</span><b>↗</b></a>
      </section>
    </>
  );
}
