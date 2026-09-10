import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/ArticleShare";
import { getArticleBySlug, getPublishedArticles } from "@/lib/public-data";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return {};

  const canonical = `${site.url}/blog/${post.slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: "ArabDEV", url: site.url }],
    creator: "ArabDEV",
    publisher: "ArabDEV",
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      locale: "ar_SA",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.date,
      section: post.category,
      tags: post.keywords,
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [{ url: "/brand/arabdev-og.png", alt: "ArabDEV" }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.featuredImage || "/brand/arabdev-og.png"] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getArticleBySlug(slug), getPublishedArticles()]);
  if (!post) notFound();

  const articleUrl = `${site.url}/blog/${post.slug}`;
  const latest = allPosts.filter((item) => item.slug !== post.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ar",
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    image: post.featuredImage || `${site.url}/brand/arabdev-og.png`,
    author: { "@type": "Organization", name: "ArabDEV", url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/brand/arabdev-logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url },
      { "@type": "ListItem", position: 2, name: "المقالات", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <article className="post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="post-hero-dark">
        <div className="shell post-masthead">
          <Link href="/blog" className="post-back">↗ العودة للمقالات</Link>
          <div className="post-journal-brand">
            <Image src="/brand/arabdev-logo.png" width={170} height={62} alt="ArabDEV" sizes="170px" />
            <span>JOURNAL / KNOWLEDGE</span>
          </div>
        </div>

        <div className="shell post-hero-grid">
          <div className="post-main-visual">
            {post.featuredImage ? <img src={post.featuredImage} alt={post.title} fetchPriority="high" /> : <div className="post-cover-placeholder"><span>ARABDEV / ARTICLE</span><strong>{post.category}</strong><b>Knowledge that ships.</b></div>}
          </div>

          <aside className="post-latest">
            <span className="post-side-kicker">LATEST / ARABDEV</span>
            <h2>أحدث المقالات</h2>
            <div className="post-latest-list">
              {latest.map((item, index) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} prefetch>
                  <div className="post-latest-thumb">
                    {item.featuredImage ? <img src={item.featuredImage} alt="" loading="lazy" /> : <span>{String(index + 1).padStart(2, "0")}</span>}
                  </div>
                  <div><small>{item.category} / {item.date}</small><b>{item.title}</b><em>اقرأ المقال ↗</em></div>
                </Link>
              ))}
              {!latest.length && <p className="post-latest-empty">أول مقال في مكتبة ArabDEV — المقالات القادمة هتظهر هنا تلقائياً.</p>}
            </div>
          </aside>
        </div>

        <div className="shell post-title-row">
          <div className="post-title-copy">
            <div className="article-meta"><span>{post.category}</span><i>•</i><span>{post.readTime}</span><i>•</i><span>{post.date}</span></div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </div>
          <span className="post-issue">ARABDEV / {new Date(post.date).getFullYear()}</span>
        </div>
      </section>

      <section className="shell post-reading-layout">
        <aside className="post-share-side"><ArticleShare url={articleUrl} title={post.title} /></aside>
        <div className="post-body-wrap">
          {post.contentHtml ? (
            <div className="post-body rich-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          ) : (
            <div className="post-body">
              {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
            </div>
          )}
          <div className="post-end-card">
            <div><Image src="/brand/arabdev-mark.png" width={68} height={68} alt="ArabDEV"/><span>ARABDEV NOTE</span></div>
            <p>لو المقال ساعدك، شاركه مع شخص بيبني موقع أو متجر عربي. ولو محتاج Theme أو Plugin لمشروعك، شوف منتجات ArabDEV أو تواصل معانا.</p>
            <div><Link href="/themes">القوالب ↗</Link><Link href="/plugins">الإضافات ↗</Link><Link href="/contact">تواصل ↗</Link></div>
          </div>
        </div>
      </section>
    </article>
  );
}
