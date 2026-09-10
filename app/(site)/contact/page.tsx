import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع ArabDEV للاستفسار عن قوالب WordPress وElementor والإضافات أو طلب موقع مخصص.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-page shell">
        <div className="contact-intro">
          <span className="eyebrow">Contact / ArabDEV</span>
          <h1>عندك فكرة؟<br />خلّيها منتج.</h1>
          <p>لشراء Theme أو Plugin، طلب تركيب، أو تنفيذ موقع مخصص للسعودية والإمارات والسوق العربي — ابعت التفاصيل من الفورم أو تواصل مباشرة.</p>
          <div className="contact-mini-list"><span>Theme / Plugin</span><span>Custom Website</span><span>Support</span></div>
        </div>
        <div className="contact-cards">
          <a href={whatsappUrl("مرحباً، أتواصل معكم من موقع ArabDEV")} target="_blank" rel="noreferrer"><small>WHATSAPP</small><b>{site.phone}</b><span>ابدأ المحادثة ↗</span></a>
          <a href={`mailto:${site.email}`}><small>EMAIL</small><b>{site.email}</b><span>أرسل رسالة ↗</span></a>
          <div className="contact-social-card"><small>FOLLOW / CONNECT</small><SocialLinks showLabel /></div>
        </div>
      </section>
      <section className="shell contact-form-wrap"><ContactForm /></section>
    </>
  );
}
