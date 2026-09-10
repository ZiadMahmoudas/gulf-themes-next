import Link from "next/link";
import type { Post } from "@/lib/content";

type CardPost = Post & { featuredImage?: string | null };

export function ArticleCard({ post, index }: { post: CardPost; index: number }) {
  return (
    <article className="article-card" data-reveal>
      <Link href={`/blog/${post.slug}`} className="article-thumb" aria-label={post.title} prefetch>
        {post.featuredImage ? (
          <img src={post.featuredImage} alt={post.title} loading="lazy" decoding="async" />
        ) : (
          <div className="article-thumb-placeholder" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>ArabDEV</b>
          </div>
        )}
      </Link>

      <div className="article-card-copy">
        <div className="article-meta"><span>{post.category}</span><i>•</i><span>{post.readTime}</span><i>•</i><span>{post.date}</span></div>
        <h3><Link href={`/blog/${post.slug}`} prefetch>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <Link className="article-read-more" href={`/blog/${post.slug}`} prefetch><span>اقرأ المزيد</span><b>↗</b></Link>
      </div>
    </article>
  );
}
