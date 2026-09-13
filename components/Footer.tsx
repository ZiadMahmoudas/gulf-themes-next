import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/site-settings";

export async function Footer() {
  const settings = await getSiteSettings();
  const salesWhatsapp = buildWhatsappUrl(settings.socials.whatsapp || settings.phone, "مرحباً، أريد ترشيح أنسب حل لمشروعي");
  const contactWhatsapp = buildWhatsappUrl(settings.socials.whatsapp || settings.phone, "مرحباً، أتواصل من موقع ArabDEV");
  const socials = { ...settings.socials, whatsapp: settings.socials.whatsapp || settings.phone };

  return (
    <footer className="v13-footer v19-footer">
      <div className="shell v13-footer-cta">
        <div>
          <span>ARABDEV / WORDPRESS FOR ARABIC BUSINESSES</span>
          <h2>عندك مشروع WordPress؟<br />خلّيه يبدأ صح.</h2>
          <p>اختار قالب أو إضافة جاهزة، أو ابعت لنا احتياجك ونرشح لك أنسب حل بدون تعقيد.</p>
        </div>
        <a href={salesWhatsapp} target="_blank" rel="noreferrer">ابدأ المحادثة <b>↗</b></a>
      </div>

      <div className="shell v13-footer-grid v19-footer-grid">
        <div className="v13-footer-brand v19-footer-brand">
          <Brand />
          <div className="v19-footer-social-head">
            <span>تابع {settings.brandName}</span>
            <div className="v13-footer-social"><SocialLinks dark socials={socials} /></div>
          </div>
          <p>{settings.tagline}</p>
          <small>Arabic-first · WordPress · GCC</small>
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
          <a href={`tel:${settings.phone}`}>{settings.phone}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <span>{site.location}</span>
          <a className="v13-footer-wa" href={contactWhatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>

      <div className="shell v13-footer-bottom v19-footer-bottom">
        <span>© 2026 {settings.brandName}. All rights reserved.</span>
        <span>Built for Arabic WordPress products.</span>
      </div>
    </footer>
  );
}
