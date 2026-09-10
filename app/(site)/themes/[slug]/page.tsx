import { notFound, redirect } from "next/navigation";
import { getThemeBySlug } from "@/lib/public-data";

// Themes are external products in V6.
// This route is kept only for backwards compatibility with old ArabDEV URLs.
export default async function ThemeRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);

  if (!theme) notFound();
  if (theme.externalUrl) redirect(theme.externalUrl);

  notFound();
}
