import type { Metadata } from "next";
import { Alexandria, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/site";

const arabic = Alexandria({ subsets: ["arabic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-arabic", display: "swap" });
const latin = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "HlAVGimmDYEmGUnPz0d_qfSFLSy-FnMN8aMnmYmSs1Q";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ثيمات وإضافات WordPress عربية`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: "technology",
  authors: [{ name: "ArabDEV", url: site.url }],
  creator: "ArabDEV",
  publisher: "ArabDEV",
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
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/brand/arabdev-og.png", width: 1200, height: 630, alt: "ArabDEV — WordPress Themes & Plugins for Arabic businesses" }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/brand/arabdev-og.png"] },
  robots: { index: true, follow: true },
  verification: { google: googleVerification },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/arabdev-logo.png`,
    image: `${site.url}/brand/arabdev-og.png`,
    email: site.email,
    telephone: site.phone,
    sameAs: [site.socials.facebook, site.socials.instagram, site.socials.linkedin],
    contactPoint: { "@type": "ContactPoint", telephone: site.phone, contactType: "sales", availableLanguage: ["Arabic", "English"] },
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
