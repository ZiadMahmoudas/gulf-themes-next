import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { themeImage } from "@/lib/editorial-images";
import { getThemeBySlug } from "@/lib/public-data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) return {};
  const image = themeImage(theme.slug, theme.coverImage);
  return {
    title: `${theme.title} — قالب WordPress عربي`,
    description: theme.description,
    alternates: { canonical: `/themes/${theme.slug}` },
    openGraph: {
      type: "website",
      url: `${site.url}/themes/${theme.slug}`,
      title: theme.title,
      description: theme.description,
      images: [{ url: image, alt: theme.title }],
    },
  };
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) notFound();

  const image = themeImage(theme.slug, theme.coverImage);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: theme.title,
    description: theme.description,
    image: [image, ...(theme.gallery || [])],
    category: theme.category,
    brand: { "@type": "Brand", name: "ArabDEV" },
    url: `${site.url}/themes/${theme.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductDetail
        kind="theme"
        title={theme.title}
        label={theme.label}
        category={theme.category}
        description={theme.description}
        longDescription={theme.longDescription}
        price={theme.price}
        status={theme.status}
        image={image}
        externalUrl={theme.externalUrl}
        features={theme.features}
        contentHtml={theme.contentHtml}
        gallery={theme.gallery}
      />
    </>
  );
}
