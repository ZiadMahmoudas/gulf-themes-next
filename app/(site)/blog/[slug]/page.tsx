import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/ArticleShare";
import { articleImage } from "@/lib/editorial-images";
import { getArticleBySlug, getPublishedArticles } from "@/lib/public-data";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return {};

  const canonical = `${site.url}/blog/${post.slug}`;
  const image = articleImage(post.slug, post.featuredImage);

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
      images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getArticleBySlug(slug), getPublishedArticles()]);
  if (!post) notFound();

  const articleUrl = `${site.url}/blog/${post.slug}`;
  const image = articleImage(post.slug, post.featuredImage);
  const latest = allPosts.filter((item) => item.slug !== post.slug).slice(0, 4);
  const related = allPosts.filter((item) => item.slug !== post.slug).slice(0, 6);

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
    image,
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
    <article className="journal-page-v10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="journal-shell-v10 shell">
        <div className="journal-top-v10">
          <Link href="/blog" className="journal-back-v10">← العودة للمقالات</Link>
          <div className="journal-brand-v10"><Image src="/brand/arabdev-logo.png" width={170} height={62} alt="ArabDEV" sizes="170px" /><span>JOURNAL / KNOWLEDGE</span></div>
        </div>

        <div className="journal-hero-grid-v10">
          <div className="journal-main-v10">
            <div className="journal-cover-v10"><img src={image} alt={post.title} fetchPriority="high" decoding="async" /></div>
            <div className="journal-meta-row-v10"><div className="article-meta"><span>{post.category}</span><i>•</i><span>{post.readTime}</span><i>•</i><span>{post.date}</span></div><ArticleShare url={articleUrl} title={post.title} /></div>
            <h1>{post.title}</h1>
            <p className="journal-deck-v10">{post.excerpt}</p>
          </div>

          <aside className="journal-latest-v10">
            <span>LATEST</span>
            <h2>أحدث المقالات</h2>
            <div className="journal-latest-list-v10">
              {latest.map((item, index) => {
                const itemImage = articleImage(item.slug, item.featuredImage);
                return (
                  <Link key={item.slug} href={`/blog/${item.slug}`} prefetch>
                    <img src={itemImage} alt="" loading="lazy" decoding="async" />
                    <div><small>{item.category} / {item.date}</small><b>{item.title}</b><em>اقرأ المقال ↗</em></div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="journal-reading-grid-v10">
          <aside className="journal-toc-v10">
            <span>ARABDEV / READING</span>
            <strong>مقال عملي ومباشر.</strong>
            <p>لو المقال أفادك، شاركه. ولو محتاج Theme أو Plugin لمشروعك، هتلاقي المنتجات من القائمة فوق.</p>
          </aside>

          <div className="journal-body-v10">
            {post.contentHtml ? (
              <div className="rich-content journal-rich-v10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            ) : (
              <div className="journal-rich-v10">
                {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
              </div>
            )}

            <div className="journal-note-v10">
              <div><Image src="/brand/arabdev-mark.png" width={64} height={64} alt="ArabDEV" /><span>ARABDEV NOTE</span></div>
              <p>بنكتب المحتوى عشان يساعد صاحب المشروع ياخد قرار أحسن، مش لمجرد حشو كلمات مفتاحية. شارك المقال لو شايف إنه ممكن يفيد حد بيبني موقع أو متجر عربي.</p>
              <div><Link href="/themes">القوالب ↗</Link><Link href="/plugins">الإضافات ↗</Link><Link href="/contact">تواصل ↗</Link></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="journal-related-v10">
            <div><span>RELATED</span><h2>مقالات مرتبطة</h2></div>
            <div className="journal-related-grid-v10">
              {related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} prefetch><img src={articleImage(item.slug, item.featuredImage)} alt="" loading="lazy" decoding="async" /><div><small>{item.category}</small><b>{item.title}</b><span>اقرأ المقال ↗</span></div></Link>)}
            </div>
          </section>
        )}

        <div className="journal-bottom-v10"><Link href="/blog">← العودة لكل المقالات</Link><span>ARABDEV / WORDPRESS FOR ARABIC BUSINESSES</span></div>
      </div>
    </article>
  );
}
