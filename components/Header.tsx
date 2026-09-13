import { HeaderClient } from "@/components/HeaderClient";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/site-settings";

export async function Header() {
  const settings = await getSiteSettings();
  const whatsappHref = buildWhatsappUrl(
    settings.socials.whatsapp || settings.phone,
    "مرحباً، أريد الاستفسار عن منتجات ArabDEV",
  );

  const socials = { ...settings.socials, whatsapp: settings.socials.whatsapp || settings.phone };

  return <HeaderClient whatsappHref={whatsappHref} socials={socials} />;
}
