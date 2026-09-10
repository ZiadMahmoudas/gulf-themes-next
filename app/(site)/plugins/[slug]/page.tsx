import { notFound, redirect } from "next/navigation";
import { getPluginBySlug } from "@/lib/public-data";

// Plugins are external products in V6.
// This route is kept only for backwards compatibility with old ArabDEV URLs.
export default async function PluginRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);

  if (!plugin) notFound();
  if (plugin.externalUrl) redirect(plugin.externalUrl);

  notFound();
}
