import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedArticles } from "@/lib/public-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedArticles();

  const staticPages = ["", "/themes", "/plugins", "/blog", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/blog" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.8,
    }),
  );

  // Themes and plugins point to external destinations, so only their library
  // pages belong to ArabDEV's sitemap. Articles remain fully internal.
  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
