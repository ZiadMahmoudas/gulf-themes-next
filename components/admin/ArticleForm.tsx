import { saveArticle, deleteArticle } from "@/app/admin/(panel)/actions";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { RichEditor } from "@/components/admin/RichEditor";
import { SlugInput } from "@/components/admin/SlugInput";

type Article = {
  id?: string; title?: string; slug?: string; excerpt?: string; category?: string; featured_image?: string | null;
  content_html?: string | null; seo_title?: string | null; seo_description?: string | null; keywords?: string[] | null;
  status?: string; published_at?: string | null;
};

export function ArticleForm({ article = {} }: { article?: Article }) {
  const isEdit = Boolean(article.id);
  return <form action={saveArticle} className="admin-editor-form">
    <input type="hidden" name="id" value={article.id || ""}/>
    <div className="editor-head"><div><small>{isEdit ? "EDIT ARTICLE" : "NEW ARTICLE"}</small><h1>{isEdit ? "تعديل المقال" : "مقال جديد"}</h1></div><div className="editor-head-actions">{isEdit && <button className="admin-danger" formAction={deleteArticle} name="delete" value="1">حذف المقال</button>}<button className="admin-primary" type="submit">حفظ التغييرات</button></div></div>
    <div className="editor-layout">
      <section className="admin-panel editor-main">
        <label className="admin-field"><span>عنوان المقال</span><input name="title" defaultValue={article.title || ""} placeholder="اكتب عنواناً واضحاً وقوياً" required /></label>
        <SlugInput initial={article.slug || ""}/>
        <label className="admin-field"><span>مقدمة قصيرة / Excerpt</span><textarea name="excerpt" defaultValue={article.excerpt || ""} rows={3} placeholder="النص الذي يظهر في كارت المقال ونتائج البحث..."/></label>
        <div className="admin-field"><span>محتوى المقال</span><RichEditor initial={article.content_html || ""}/></div>
      </section>
      <aside className="editor-side">
        <section className="admin-panel"><h3>النشر</h3><label className="admin-field"><span>الحالة</span><select name="status" defaultValue={article.status || "draft"}><option value="draft">مسودة</option><option value="published">منشور</option></select></label><label className="admin-field"><span>تاريخ النشر</span><input name="published_at" type="datetime-local" defaultValue={article.published_at ? new Date(article.published_at).toISOString().slice(0,16) : ""}/></label></section>
        <section className="admin-panel"><h3>التصنيف والصورة</h3><label className="admin-field"><span>التصنيف</span><input name="category" defaultValue={article.category || "WordPress"} placeholder="WordPress"/></label><MediaUpload name="featured_image" initial={article.featured_image} label="الصورة البارزة"/></section>
        <section className="admin-panel seo-box"><h3>SEO</h3><label className="admin-field"><span>SEO Title</span><input name="seo_title" defaultValue={article.seo_title || ""} maxLength={65}/></label><label className="admin-field"><span>Meta Description</span><textarea name="seo_description" defaultValue={article.seo_description || ""} rows={3} maxLength={170}/></label><label className="admin-field"><span>Keywords</span><textarea name="keywords" defaultValue={(article.keywords || []).join(", ")} rows={3} placeholder="wordpress, قالب عربي, seo"/></label><div className="serp-preview"><small>معاينة جوجل</small><b>{article.seo_title || article.title || "عنوان المقال سيظهر هنا"}</b><span>your-domain.com/blog/{article.slug || "article-slug"}</span><p>{article.seo_description || article.excerpt || "وصف الصفحة سيظهر هنا..."}</p></div></section>
      </aside>
    </div>
  </form>;
}
