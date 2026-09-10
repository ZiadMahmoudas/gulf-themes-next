function normalizeSiteUrl(value?: string) {
  const raw = (value || "https://arabdev.vercel.app").trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "ArabDEV",
  shortName: "ArabDEV",
  arabicTagline: "ثيمات وإضافات ومنتجات WordPress عربية بجودة تليق بالسوق الخليجي.",
  description:
    "ArabDEV منصة عربية لثيمات WordPress وElementor وإضافات ومنتجات رقمية موجهة للسعودية والإمارات والخليج.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  phone: "01100133486",
  whatsapp: "201100133486",
  email: "ziadbobo78@gmail.com",
  adminEmail: process.env.ADMIN_EMAIL || "ziadbobo78@gmail.com",
  location: "Cairo, Egypt · Serving GCC & Arab markets",
  socials: {
    facebook: "https://www.facebook.com/ziadmohagerDev/",
    instagram: "https://www.instagram.com/ziadmohagerdev/",
    linkedin: "https://www.linkedin.com/in/ziad-mahmoud-mohammed/",
  },
};

export const whatsappUrl = (message = "مرحباً، أريد الاستفسار عن أحد منتجات ArabDEV") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
