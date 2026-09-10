import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getPublishedArticles } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "مقالات WordPress وElementor وSEO",
  description: "مقالات عربية عملية عن WordPress وElementor والقوالب والمتاجر وSEO وتجربة المستخدم.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedArticles();
  return (
    <section className="inner-hero shell library-page blog-library-page">
      <div className="library-header">
        <div><span className="eyebrow">ArabDEV / Knowledge</span><h1>المقالات</h1><p>شروحات وتجارب عملية عن WordPress، Elementor، SEO وبناء المواقع العربية — محتوى يساعدك تختار وتنفذ صح، مش كلام نظري.</p></div>
        <div className="library-stat" aria-label={`${posts.length} مقالات`}><strong>{String(posts.length).padStart(2, "0")}</strong><span>ARTICLES / SEO LIBRARY</span></div>
      </div>
      <div className="library-strip"><span>WordPress</span><i>•</i><span>Elementor</span><i>•</i><span>SEO</span><i>•</i><span>Arabic UX</span><i>•</i><span>WooCommerce</span></div>
      <div className="articles-grid inner-list">{posts.map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}</div>
    </section>
  );
}
