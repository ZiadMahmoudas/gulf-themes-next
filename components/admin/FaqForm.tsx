import Link from "next/link";
import { saveFaq } from "@/app/admin/(panel)/actions";

export function FaqForm({ faq }: { faq?: any }) {
  return (
    <>
      <div className="admin-section-head">
        <div>
          <small>CONTENT / FAQ</small>
          <h1>{faq ? "تعديل السؤال" : "سؤال جديد"}</h1>
          <p>اكتب سؤالاً واضحاً وإجابة قصيرة ومباشرة تظهر في الصفحة الرئيسية.</p>
        </div>
        <Link className="admin-secondary" href="/admin/faqs">← رجوع</Link>
      </div>
      <form action={saveFaq} className="admin-panel faq-admin-form">
        {faq?.id && <input type="hidden" name="id" value={faq.id} />}
        <label className="admin-field">
          <span>السؤال</span>
          <input name="question" defaultValue={faq?.question || ""} required placeholder="مثال: هل القوالب مناسبة للمتاجر السعودية؟" />
        </label>
        <label className="admin-field">
          <span>الإجابة</span>
          <textarea name="answer" rows={7} defaultValue={faq?.answer || ""} required placeholder="اكتب إجابة واضحة ومختصرة..." />
        </label>
        <div className="two-fields">
          <label className="admin-field">
            <span>ترتيب الظهور</span>
            <input type="number" name="sort_order" min="0" defaultValue={faq?.sort_order ?? 0} />
          </label>
          <label className="admin-field">
            <span>الحالة</span>
            <select name="is_published" defaultValue={faq?.is_published === false ? "false" : "true"}>
              <option value="true">منشور</option>
              <option value="false">مخفي</option>
            </select>
          </label>
        </div>
        <button className="admin-primary" type="submit">حفظ السؤال</button>
      </form>
    </>
  );
}
