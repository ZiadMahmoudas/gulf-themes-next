import Link from "next/link";
import type { Post } from "@/lib/content";
import { articleImage } from "@/lib/editorial-images";

type CardPost = Post & { featuredImage?: string | null };

export function ArticleCard({ post, index }: { post: CardPost; index: number }) {
  const image = articleImage(post.slug, post.featuredImage);

  return (
    <article className="article-card article-card-v10" data-reveal>
      <Link href={`/blog/${post.slug}`} className="article-thumb" aria-label={post.title} prefetch>
        <img src={image} alt={post.title} loading={index < 3 ? "eager" : "lazy"} decoding="async" />
        <span className="article-thumb-badge">{String(index + 1).padStart(2, "0")} / ARABDEV</span>
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
