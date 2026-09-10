import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { deleteFaq } from "@/app/admin/(panel)/actions";

export default async function FaqsPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const q = await searchParams;
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });

  return (
    <>
      <div className="admin-section-head">
        <div><small>CONTENT / FAQ</small><h1>الأسئلة الشائعة</h1><p>أضف وعدّل الأسئلة التي تظهر في الصفحة الرئيسية.</p></div>
        <Link className="admin-primary" href="/admin/faqs/new">+ سؤال جديد</Link>
      </div>
      {(q.saved || q.deleted) && <div className="admin-alert success">{q.deleted ? "تم حذف السؤال." : "تم حفظ السؤال."}</div>}
      {error && <div className="admin-alert error">شغّل ملف supabase/v11-update.sql أولاً لإضافة جدول الأسئلة الشائعة.</div>}
      <section className="admin-panel admin-table-panel">
        <div className="faq-admin-list">
          {data?.length ? data.map((faq: any, index: number) => (
            <article key={faq.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><b>{faq.question}</b><p>{faq.answer}</p></div>
              <i className={`status ${faq.is_published ? "published" : "draft"}`}>{faq.is_published ? "منشور" : "مخفي"}</i>
              <div className="row-actions">
                <Link href={`/admin/faqs/${faq.id}`}>تعديل</Link>
                <form action={deleteFaq}><input type="hidden" name="id" value={faq.id} /><button type="submit">حذف</button></form>
              </div>
            </article>
          )) : <p className="admin-empty">لا توجد أسئلة حتى الآن. أضف أول سؤال.</p>}
        </div>
      </section>
    </>
  );
}
