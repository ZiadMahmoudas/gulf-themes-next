import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { site } from "@/lib/site";

export default async function SeoPage() {
  const { supabase } = await requireAdmin();
  const [{ count: published }, { count: drafts }, { data: missing }] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("articles").select("id,title,slug,seo_title,seo_description").or("seo_title.is.null,seo_description.is.null").limit(8),
  ]);
  const googleReady = Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);

  return (
    <>
      <div className="admin-section-head"><div><small>SEARCH / SEO</small><h1>تحسين محركات البحث</h1><p>راجع المحتوى، ملفات الفهرسة، وتجهيز Google Search Console من مكان واحد.</p></div><a className="admin-primary" href="/sitemap.xml" target="_blank">فتح Sitemap ↗</a></div>

      <div className="admin-stats seo-stats">
        <article><span>✓</span><small>منشور</small><b>{published || 0}</b><p>مقالات متاحة للفهرسة</p></article>
        <article><span>◌</span><small>مسودات</small><b>{drafts || 0}</b><p>غير ظاهرة للعامة</p></article>
        <article><span>⌕</span><small>تحتاج SEO</small><b>{missing?.length || 0}</b><p>Meta ناقصة أو محتاجة مراجعة</p></article>
        <article><span>{googleReady ? "✓" : "!"}</span><small>Search Console</small><b>{googleReady ? "جاهز" : "ناقص"}</b><p>{googleReady ? "Verification meta مضافة" : "أضف Verification token في env"}</p></article>
      </div>

      <div className="admin-dashboard-grid seo-dashboard-grid">
        <section className="admin-panel">
          <div className="panel-title"><div><small>INDEXING</small><h2>ملفات البحث</h2></div></div>
          <div className="seo-resource-list">
            <a href="/sitemap.xml" target="_blank"><div><b>Sitemap</b><small>{site.url}/sitemap.xml</small></div><span>↗</span></a>
            <a href="/robots.txt" target="_blank"><div><b>Robots</b><small>{site.url}/robots.txt</small></div><span>↗</span></a>
            <a href="/rss.xml" target="_blank"><div><b>RSS Feed</b><small>{site.url}/rss.xml</small></div><span>↗</span></a>
          </div>
        </section>

        <section className="admin-panel search-console-card">
          <div className="panel-title"><div><small>GOOGLE</small><h2>Search Console</h2></div><span className={`status-pill ${googleReady ? "published" : "draft"}`}>{googleReady ? "جاهز للتحقق" : "يحتاج Token"}</span></div>
          <p>بعد ربط الدومين الحقيقي، خُد قيمة <code>content</code> من HTML tag في Google وحطها في:</p>
          <code className="seo-code">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...</code>
          <p>بعد الـRedeploy قدّم ملف <b>/sitemap.xml</b> داخل Search Console.</p>
        </section>
      </div>

      <section className="admin-panel">
        <div className="panel-title"><h2>صفحات تحتاج مراجعة</h2></div>
        {missing?.length ? <div className="seo-todos">{missing.map((x: any) => <div key={x.id}><div><b>{x.title}</b><small>/{x.slug}</small></div><span>{!x.seo_title ? "SEO Title ناقص" : "Meta Description ناقص"}</span><Link href={`/admin/articles/${x.id}`}>إصلاح</Link></div>)}</div> : <p className="admin-empty">ممتاز، لا توجد مشاكل أساسية ظاهرة.</p>}
      </section>
    </>
  );
}
