import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عن ArabDEV",
  description: "ArabDEV منصة عربية لثيمات وإضافات WordPress ومواقع مخصصة موجهة للسعودية والإمارات والسوق العربي.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="inner-hero shell about-page">
      <div className="about-hero">
        <div>
          <span className="eyebrow">About / ArabDEV</span>
          <h1>نبني للعربي<br />من البداية.</h1>
          <p>ArabDEV ستوديو ومنصة منتجات رقمية عربية. بنصمم ونطور قوالب WordPress، إضافات عملية، ومواقع مخصصة للشركات والمتاجر — مع تركيز حقيقي على العربية، الموبايل، السرعة وتجربة المستخدم في السوق الخليجي والعربي.</p>
        </div>
        <aside className="about-side" aria-label="مبادئ ArabDEV">
          <span>01</span><b>Arabic-first</b><small>Typography · RTL · UX</small>
          <span>02</span><b>Performance</b><small>Clean core · Less JS</small>
          <span>03</span><b>GCC-ready</b><small>Saudi · UAE · Gulf</small>
        </aside>
      </div>

      <div className="about-offers" data-reveal>
        <article><span>01 / THEMES</span><h2>قوالب WordPress</h2><p>قوالب جاهزة بواجهات عربية قوية، Demo واضح، وتجربة Mobile وRTL محسوبة من البداية.</p><Link href="/themes">شوف القوالب ↗</Link></article>
        <article><span>02 / PLUGINS</span><h2>إضافات عملية</h2><p>Plugins خفيفة تحل مشاكل محددة في التحويل، المحتوى، WooCommerce وتجربة المواقع العربية.</p><Link href="/plugins">شوف الإضافات ↗</Link></article>
        <article><span>03 / CUSTOM</span><h2>تنفيذ مخصص</h2><p>لو المشروع محتاج تجربة خاصة، بننفذ موقع أو Theme مخصص بدل إجبارك على قالب لا يناسب احتياجك.</p><Link href="/contact">ابدأ مشروعك ↗</Link></article>
      </div>

      <div className="about-statement" data-reveal>
        <p>عربي أوضح.</p><p>موبايل أسرع.</p><p>منتج يبيع أحسن.</p>
      </div>
    </section>
  );
}
