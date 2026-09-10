import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const [themes, plugins, articles, leads, recentArticles, recentMessages] = await Promise.all([
    supabase.from("themes").select("id", { count: "exact", head: true }),
    supabase.from("plugins").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("articles").select("id,title,slug,category,status,published_at,featured_image").order("created_at", { ascending: false }).limit(5),
    supabase.from("contact_messages").select("id,name,email,message,created_at,status").order("created_at", { ascending: false }).limit(4),
  ]);
  const stats = [
    ["إجمالي القوالب", themes.count || 0, "▣", "منتج داخل المكتبة"], ["إجمالي الإضافات", plugins.count || 0, "✚", "إضافة داخل المكتبة"],
    ["المقالات", articles.count || 0, "▤", "مقال ومسودة"], ["رسائل جديدة", leads.count || 0, "✉", "تحتاج مراجعة"],
  ];
  return <>
    <div className="admin-welcome"><div><small>DASHBOARD / TODAY</small><h1>مرحباً زياد 👋</h1><p>إليك نظرة سريعة على ArabDEV ومحتوى المنصة.</p></div><Link className="admin-primary" href="/admin/articles/new">+ كتابة مقال جديد</Link></div>
    <div className="admin-stats">{stats.map(([label,count,icon,sub]) => <article key={String(label)}><span>{icon}</span><small>{label}</small><b>{count}</b><p>{sub}</p></article>)}</div>
    <div className="admin-dashboard-grid">
      <section className="admin-panel admin-traffic"><div className="panel-title"><h2>أداء المحتوى</h2><span>آخر 30 يوم</span></div><strong>{articles.count || 0}</strong><small>إجمالي المحتوى</small><div className="fake-bars">{[42,66,54,78,58,88,69,93,74,82,60,97].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></section>
      <section className="admin-panel"><div className="panel-title"><h2>أحدث الرسائل</h2><Link href="/admin/messages">عرض الكل</Link></div><div className="message-list">{recentMessages.data?.length ? recentMessages.data.map((m:any)=><div key={m.id}><span className="message-avatar">{m.name?.slice(0,1)}</span><div><b>{m.name}</b><p>{m.message}</p></div><small>{new Date(m.created_at).toLocaleDateString("ar-EG")}</small></div>) : <p className="admin-empty">لا توجد رسائل حتى الآن.</p>}</div></section>
      <section className="admin-panel supabase-panel"><div className="panel-title"><h2>حالة قاعدة البيانات</h2><span>●</span></div><div className="supabase-lockup"><b>⚡ Supabase</b><span>متصل وجاهز للعمل</span></div><dl><div><dt>الحالة</dt><dd>Healthy ●</dd></div><div><dt>البيئة</dt><dd>Production</dd></div><div><dt>الصلاحية</dt><dd>Owner only</dd></div></dl></section>
    </div>
    <section className="admin-panel admin-table-panel"><div className="panel-title"><h2>أحدث المقالات</h2><Link href="/admin/articles">عرض الكل</Link></div><div className="admin-table"><div className="tr th"><span>العنوان</span><span>الرابط</span><span>التصنيف</span><span>الحالة</span><span>إجراء</span></div>{recentArticles.data?.map((a:any)=><div className="tr" key={a.id}><span><b>{a.title}</b></span><span dir="ltr">{a.slug}</span><span>{a.category}</span><span><i className={`status ${a.status}`}>{a.status === "published" ? "منشور" : "مسودة"}</i></span><span><Link href={`/admin/articles/${a.id}`}>تعديل</Link></span></div>)}</div></section>
  </>;
}
