import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع ArabDEV للاستفسار عن قوالب WordPress وElementor والإضافات أو طلب موقع مخصص.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappHref = buildWhatsappUrl(settings.socials.whatsapp || settings.phone, "مرحباً، أتواصل معكم من موقع ArabDEV");
  const socials = { ...settings.socials, whatsapp: settings.socials.whatsapp || settings.phone };

  return (
    <>
      <section className="contact-page shell">
        <div className="contact-intro">
          <span className="eyebrow">Contact / {settings.brandName}</span>
          <h1>عندك فكرة؟<br />خلّيها منتج.</h1>
          <p>لشراء Theme أو Plugin، طلب تركيب، أو تنفيذ موقع مخصص للسعودية والإمارات والسوق العربي — ابعت التفاصيل من الفورم أو تواصل مباشرة.</p>
          <div className="contact-mini-list"><span>Theme / Plugin</span><span>Custom Website</span><span>Support</span></div>
        </div>
        <div className="contact-cards">
          <a href={whatsappHref} target="_blank" rel="noreferrer"><small>WHATSAPP</small><b>{settings.phone}</b><span>ابدأ المحادثة ↗</span></a>
          <a href={`mailto:${settings.email}`}><small>EMAIL</small><b>{settings.email}</b><span>أرسل رسالة ↗</span></a>
          <div className="contact-social-card"><small>FOLLOW / CONNECT</small><SocialLinks showLabel socials={socials} /></div>
        </div>
      </section>
      <section className="shell contact-form-wrap"><ContactForm /></section>
    </>
  );
}
