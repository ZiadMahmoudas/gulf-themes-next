import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedArticles, getPublishedPlugins, getPublishedThemes } from "@/lib/public-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, themes, plugins] = await Promise.all([
    getPublishedArticles(),
    getPublishedThemes(),
    getPublishedPlugins(),
  ]);

  const staticPages = ["", "/themes", "/plugins", "/blog", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/blog" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticPages,
    ...themes.map((theme) => ({
      url: `${site.url}/themes/${theme.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...plugins.map((plugin) => ({
      url: `${site.url}/plugins/${plugin.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
