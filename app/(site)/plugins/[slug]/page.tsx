import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { pluginImage } from "@/lib/editorial-images";
import { getPluginBySlug } from "@/lib/public-data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);
  if (!plugin) return {};
  const image = pluginImage(plugin.slug, plugin.coverImage);
  return {
    title: `${plugin.title} — إضافة WordPress`,
    description: plugin.description,
    alternates: { canonical: `/plugins/${plugin.slug}` },
    openGraph: {
      type: "website",
      url: `${site.url}/plugins/${plugin.slug}`,
      title: plugin.title,
      description: plugin.description,
      images: [{ url: image, alt: plugin.title }],
    },
  };
}

export default async function PluginDetailPage({ params }: Props) {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);
  if (!plugin) notFound();

  const image = pluginImage(plugin.slug, plugin.coverImage);
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: plugin.title,
    description: plugin.description,
    image,
    applicationCategory: "WordPress Plugin",
    operatingSystem: "WordPress",
    url: `${site.url}/plugins/${plugin.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductDetail
        kind="plugin"
        title={plugin.title}
        label={plugin.label}
        category={plugin.category}
        description={plugin.description}
        longDescription={plugin.longDescription}
        price={plugin.price}
        status={plugin.status}
        image={image}
        externalUrl={plugin.externalUrl}
        features={plugin.features}
        contentHtml={plugin.contentHtml}
      />
    </>
  );
}
