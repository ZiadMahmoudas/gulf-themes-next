import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SocialLinks } from "@/components/SocialLinks";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="v13-footer">
      <div className="shell v13-footer-cta">
        <div>
          <span>ARABDEV / WORDPRESS FOR ARABIC BUSINESSES</span>
          <h2>عندك مشروع WordPress؟<br />خلّيه يبدأ صح.</h2>
          <p>اختار قالب أو إضافة جاهزة، أو ابعت لنا احتياجك ونرشح لك أنسب حل بدون تعقيد.</p>
        </div>
        <a href={whatsappUrl("مرحباً، أريد ترشيح أنسب حل لمشروعي")} target="_blank" rel="noreferrer">ابدأ المحادثة <b>↗</b></a>
      </div>

      <div className="shell v13-footer-grid">
        <div className="v13-footer-brand">
          <Brand />
          <p>{site.arabicTagline}</p>
          <div className="v13-footer-social"><SocialLinks dark /></div>
        </div>

        <div className="v13-footer-col">
          <h3>المتجر</h3>
          <Link href="/themes">قوالب WordPress</Link>
          <Link href="/plugins">إضافات WordPress</Link>
          <Link href="/contact">طلب تنفيذ مخصص</Link>
        </div>

        <div className="v13-footer-col">
          <h3>روابط مهمة</h3>
          <Link href="/blog">المقالات والدلائل</Link>
          <Link href="/about">عن ArabDEV</Link>
          <Link href="/#faq">الأسئلة الشائعة</Link>
          <Link href="/contact">الدعم والتواصل</Link>
        </div>

        <div className="v13-footer-col v13-footer-contact">
          <h3>تواصل معنا</h3>
          <a href={`tel:${site.phone}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
          <a className="v13-footer-wa" href={whatsappUrl("مرحباً، أتواصل من موقع ArabDEV")} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>

      <div className="shell v13-footer-bottom">
        <span>© 2026 ArabDEV. All rights reserved.</span>
        <span>Arabic-first · WordPress · GCC</span>
      </div>
    </footer>
  );
}
