import type { Metadata } from "next";
import { Alexandria, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/site";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/site-settings";

const arabic = Alexandria({ subsets: ["arabic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-arabic", display: "swap" });
const latin = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "HlAVGimmDYEmGUnPz0d_qfSFLSy-FnMN8aMnmYmSs1Q";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const description = settings.tagline || site.description;

  return {
    metadataBase: new URL(site.url),
    title: { default: `${settings.brandName} | ثيمات وإضافات WordPress عربية`, template: `%s | ${settings.brandName}` },
    description,
    applicationName: settings.brandName,
    category: "technology",
    authors: [{ name: settings.brandName, url: site.url }],
    creator: settings.brandName,
    publisher: settings.brandName,
    keywords: ["قوالب ووردبريس", "قالب ووردبريس عربي", "Elementor عربي", "قالب متجر سعودي", "WooCommerce عربي", "إضافات ووردبريس عربية", "WordPress الخليج"],
    alternates: { types: { "application/rss+xml": `${site.url}/rss.xml` } },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", sizes: "64x64", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: site.url,
      siteName: settings.brandName,
      title: settings.brandName,
      description,
      images: [{ url: "/brand/arabdev-og.png", width: 1200, height: 630, alt: `${settings.brandName} — WordPress Themes & Plugins for Arabic businesses` }],
    },
    twitter: { card: "summary_large_image", title: settings.brandName, description, images: ["/brand/arabdev-og.png"] },
    robots: { index: true, follow: true },
    verification: { google: googleVerification },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const sameAs = Object.entries(settings.socials)
    .map(([key, value]) => key === "whatsapp" ? buildWhatsappUrl(value) : value)
    .filter((value): value is string => Boolean(value && /^https?:\/\//i.test(value)));

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName,
    url: site.url,
    logo: `${site.url}/brand/arabdev-logo.png`,
    image: `${site.url}/brand/arabdev-og.png`,
    email: settings.email,
    telephone: settings.phone,
    sameAs,
    contactPoint: { "@type": "ContactPoint", telephone: settings.phone, contactType: "sales", availableLanguage: ["Arabic", "English"] },
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${arabic.variable} ${latin.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}
