import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SocialLinks } from "@/components/SocialLinks";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-hero">
        <div>
          <span className="footer-eyebrow">ARABDEV / ARABIC-FIRST DIGITAL PRODUCTS</span>
          <h2>منتجات رقمية عربية<br />تبدأ صح من أول Pixel.</h2>
          <p>ثيمات WordPress، إضافات عملية، ومحتوى يساعد أصحاب المشاريع العربية والخليجية يطلقوا مواقع أوضح وأسرع وأسهل في البيع.</p>
        </div>
        <a className="footer-talk" href={whatsappUrl("مرحباً، أريد أن نبدأ مشروعاً مع ArabDEV")} target="_blank" rel="noreferrer"><span>ابدأ مشروعك</span><b>↗</b></a>
      </div>

      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <Brand />
          <p>{site.arabicTagline}</p>
          <div className="footer-social-wrap"><span>تابع ArabDEV</span><SocialLinks dark /></div>
        </div>

        <div className="footer-links-col">
          <h4>المنتجات</h4>
          <Link href="/themes" prefetch>قوالب WordPress</Link>
          <Link href="/plugins" prefetch>إضافات WordPress</Link>
          <Link href="/contact" prefetch>طلب موقع مخصص</Link>
        </div>

        <div className="footer-links-col">
          <h4>المعرفة</h4>
          <Link href="/blog" prefetch>المقالات والدلائل</Link>
          <Link href="/#faq">الأسئلة الشائعة</Link>
          <Link href="/about" prefetch>عن ArabDEV</Link>
          <Link href="/contact" prefetch>الدعم والتواصل</Link>
        </div>

        <div className="footer-contact">
          <h4>تواصل مباشرة</h4>
          <a href={`tel:${site.phone}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
          <a className="footer-whatsapp" href={whatsappUrl("مرحباً، أتواصل من موقع ArabDEV")} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>

      <div className="shell footer-bottom"><span>© 2026 ArabDEV. All rights reserved.</span><span>Arabic-first · WordPress · GCC</span></div>
    </footer>
  );
}
