import Link from "next/link";
import { themes, plugins, posts } from "@/lib/content";
import { ThemeCard } from "@/components/ThemeCard";
import { ArticleCard } from "@/components/ArticleCard";
import { PluginCard } from "@/components/PluginCard";
import { whatsappUrl } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy-wrap">
          <div className="hero-kicker"><span className="live-dot"/> WordPress products / Arabic-first</div>
          <h1>منتجات WordPress<br/><em>شكلها مش جاهز.</em></h1>
          <p className="hero-copy">ثيمات وإضافات معمولة للعربية من أول قرار في التصميم — للمشاريع اللي عايزة شكل عالمي، موبايل مظبوط، وواجهة مناسبة للسعودية والإمارات والسوق العربي.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/themes"><span>استكشف القوالب</span><b>↗</b></Link>
            <Link className="button ghost" href="/plugins"><span>شوف الإضافات</span><b>+</b></Link>
          </div>
          <div className="hero-proof">
            <div><span>01</span><b>RTL Native</b><small>العربية نقطة البداية</small></div>
            <div><span>02</span><b>Code + Elementor</b><small>مرونة حسب مشروعك</small></div>
            <div><span>03</span><b>GCC Focus</b><small>تجربة شراء وتواصل محلية</small></div>
          </div>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="showcase-glow" />
          <div className="showcase-label"><span>FEATURED DROP</span><b>01 / 26</b></div>
          <div className="showcase-browser">
            <div className="browser-bar"><i/><i/><i/><span>gulfshop.preview</span></div>
            <div className="browser-content">
              <small>GULFSHOP / FASHION</small>
              <h2>صمّم حضورك<br/>بطريقة أهدى.</h2>
              <span className="browser-pill">SHOP THE DROP ↗</span>
              <div className="browser-products"><i/><i/><i/></div>
            </div>
          </div>
          <div className="floating-card floating-theme"><small>THEME</small><b>GulfShop</b><span>WooCommerce · RTL</span></div>
          <div className="floating-card floating-plugin"><small>PLUGIN</small><b>WhatsApp Pulse</b><span>Conversion · Lightweight</span></div>
          <div className="showcase-note">Built for Arabic business<br/>without the template look.</div>
        </div>
      </section>

      <section className="rail" aria-label="مميزات ArabKit"><div><span>ARABIC FIRST</span><i>✦</i><span>WORDPRESS</span><i>✦</i><span>ELEMENTOR</span><i>✦</i><span>PLUGINS</span><i>✦</i><span>SEO READY</span><i>✦</i><span>GCC UX</span><i>✦</i></div></section>

      <section className="section shell collection-section">
        <div className="section-head">
          <div><span className="eyebrow">Theme collection / 01</span><h2>قوالب تبني عليها<br/>براند، مش مجرد موقع.</h2></div>
          <div className="section-side-copy"><p>كل Demo له شخصية مختلفة، لكن تحتهم Core واحد مرتب وسريع وقابل للتوسع.</p><Link href="/themes">عرض المكتبة <span>↗</span></Link></div>
        </div>
        <div className="category-pills"><span className="active">الكل</span><span>متاجر</span><span>خدمات</span><span>شركات</span><span>Portfolio</span></div>
        <div className="themes-grid">{themes.map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}</div>
      </section>

      <section className="bento-wrap">
        <div className="shell bento-grid">
          <article className="bento-card bento-intro"><span className="eyebrow light">Why ArabKit</span><h2>مش بنعرّب<br/>تصميم أجنبي.</h2><p>نبدأ من العربي: الخط، المحاذاة، حركة العناصر، الموبايل وطريقة اتخاذ القرار.</p></article>
          <article className="bento-card bento-type"><span>TYPE</span><div className="arabic-type-demo">واجهة<br/>تحترم<br/>العربي.</div><small>Alexandria / tuned line-height / zero random letter spacing</small></article>
          <article className="bento-card bento-mobile"><span>MOBILE</span><div className="phone-shell"><div className="phone-screen"><i/><h3>كل شيء<br/>في إيدك.</h3><div className="phone-nav"><b>⌂</b><b>⌕</b><b>＋</b><b>♡</b></div></div></div><small>Mobile-first navigation & CTA</small></article>
          <article className="bento-card bento-code"><span>CORE</span><pre>{`<Theme\n  dir="rtl"\n  fast\n  clean\n/>`}</pre><small>Code-first architecture, Elementor when it makes sense.</small></article>
        </div>
      </section>

      <section className="section shell plugin-home-section">
        <div className="section-head">
          <div><span className="eyebrow">Plugin lab / 02</span><h2>إضافات بتحل<br/>حاجة واحدة صح.</h2></div>
          <div className="section-side-copy"><p>بدل Plugin ضخم يحمل عشرات المزايا، كل أداة عندنا لها وظيفة واضحة ومحددة.</p><Link href="/plugins">عرض الإضافات <span>↗</span></Link></div>
        </div>
        <div className="plugins-grid">{plugins.map((plugin) => <PluginCard key={plugin.slug} plugin={plugin} />)}</div>
      </section>

      <section className="workflow-section">
        <div className="shell">
          <div className="workflow-head"><span className="eyebrow light">من الاختيار للإطلاق</span><h2>جرّب. اختار. ابدأ.</h2></div>
          <div className="workflow-grid">
            <div><span>01</span><h3>شوف الـDemo</h3><p>اختبر الشكل على الموبايل والديسكتوب قبل أي قرار.</p></div>
            <div><span>02</span><h3>اختار الباقة</h3><p>Theme فقط، تركيب، أو تخصيص كامل حسب المشروع.</p></div>
            <div><span>03</span><h3>كلّمنا مباشرة</h3><p>واتساب أو الفورم، بدون رحلة شراء معقدة في البداية.</p></div>
          </div>
          <a className="workflow-cta" href={whatsappUrl("مرحباً، أريد ترشيح أنسب Theme أو Plugin لمشروعي")} target="_blank" rel="noreferrer"><span>مش عارف تبدأ بإيه؟</span><b>خلّينا نرشح لك المناسب ↗</b></a>
        </div>
      </section>

      <section className="section shell articles-section">
        <div className="section-head"><div><span className="eyebrow">Knowledge / 03</span><h2>محتوى يجيب زيارة،<br/>ويفيد قبل ما يبيع.</h2></div><div className="section-side-copy"><p>المقالات جزء من المنتج: WordPress، Elementor، SEO وتجربة المواقع العربية.</p><Link href="/blog">كل المقالات <span>↗</span></Link></div></div>
        <div className="articles-list">{posts.map((post, i) => <ArticleCard key={post.slug} post={post} index={i} />)}</div>
      </section>

      <section className="shell cta-band">
        <div><span className="eyebrow">Custom request</span><h2>ملقتش اللي يناسبك؟<br/>نبنيه مخصوص.</h2><p>ثيم، Plugin، أو موقع كامل — ابعت الفكرة ونقول لك أنسب طريق.</p></div>
        <a className="cta-round" href={whatsappUrl("مرحباً، عندي فكرة وأريد تنفيذها مع ArabKit")} target="_blank" rel="noreferrer"><span>ابدأ</span><b>↗</b></a>
      </section>
    </>
  );
}
