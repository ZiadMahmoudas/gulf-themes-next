import { saveTheme, savePlugin, deleteProduct } from "@/app/admin/(panel)/actions";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { ProductNameSlugFields } from "@/components/admin/ProductNameSlugFields";
import { RichEditor } from "@/components/admin/RichEditor";

type Product = {
  id?: string;
  title?: string;
  slug?: string;
  label?: string;
  category?: string;
  description?: string;
  content_html?: string | null;
  cover_image?: string | null;
  video_url?: string | null;
  gallery?: string[] | null;
  price?: string;
  features?: string[] | null;
  demo_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  keywords?: string[] | null;
  status?: string;
};

export function ProductForm({
  type,
  product = {},
}: {
  type: "themes" | "plugins";
  product?: Product;
}) {
  const isTheme = type === "themes";
  const action = isTheme ? saveTheme : savePlugin;
  const singular = isTheme ? "القالب" : "الإضافة";

  return (
    <form action={action} className="admin-editor-form">
      <input type="hidden" name="id" value={product.id || ""} />
      <input type="hidden" name="table" value={type} />

      <div className="editor-head">
        <div>
          <small>{isTheme ? "THEME" : "PLUGIN"} / EDITOR</small>
          <h1>{product.id ? `تعديل ${singular}` : `إضافة ${singular}`}</h1>
        </div>

        <div className="editor-head-actions">
          {product.id && (
            <button className="admin-danger" formAction={deleteProduct}>
              حذف {singular}
            </button>
          )}
          <button className="admin-primary" type="submit">
            حفظ
          </button>
        </div>
      </div>

      <div className="editor-layout">
        <section className="admin-panel editor-main">
          <ProductNameSlugFields
            initialTitle={product.title || ""}
            initialSlug={product.slug || ""}
            placeholder={isTheme ? "GulfShop" : "WP Rocket"}
            basePath={isTheme ? "/themes" : "/plugins"}
          />

          <label className="admin-field">
            <span>{isTheme ? "رابط المعاينة / الشراء الخارجي" : "رابط المعاينة / الشراء الخارجي"}</span>
            <input
              name="demo_url"
              type="url"
              inputMode="url"
              defaultValue={product.demo_url || ""}
              dir="ltr"
              placeholder="https://example.com/product"
              autoComplete="url"
            />
            <small className="admin-field-help">
              الزائر يدخل صفحة التفاصيل داخل ArabDEV أولًا، وبعدها فقط يفتح الرابط الخارجي من زر «شاهد الآن».
            </small>
          </label>

          <div className="two-fields">
            <label className="admin-field">
              <span>Label</span>
              <input
                name="label"
                defaultValue={product.label || ""}
                placeholder={isTheme ? "متجر خليجي" : "إضافة ووردبريس"}
              />
            </label>

            <label className="admin-field">
              <span>التصنيف</span>
              <input
                name="category"
                defaultValue={product.category || "WordPress"}
              />
            </label>
          </div>

          <label className="admin-field">
            <span>وصف مختصر</span>
            <textarea
              name="description"
              defaultValue={product.description || ""}
              rows={4}
              placeholder="اشرح بسرعة المشكلة التي يحلها المنتج ولماذا هو مفيد."
            />
          </label>

          <div className="admin-field">
            <span>وصف / محتوى المنتج</span>
            <RichEditor initial={product.content_html || ""} />
          </div>
        </section>

        <aside className="editor-side">
          <section className="admin-panel">
            <h3>النشر</h3>
            <label className="admin-field">
              <span>الحالة</span>
              <select name="status" defaultValue={product.status || "draft"}>
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
              </select>
            </label>
            <label className="admin-field">
              <span>السعر</span>
              <input name="price" defaultValue={product.price || "قريباً"} placeholder="199 ر.س" />
            </label>
          </section>

          <section className="admin-panel">
            <h3>الوسائط</h3>
            <MediaUpload
              name="cover_image"
              initial={product.cover_image}
              label="صورة المنتج الرئيسية"
            />

            <MediaUpload
              name="video_url"
              initial={product.video_url}
              label="فيديو شرح / Preview"
              kind="video"
            />
            <p className="admin-media-note-v20">
              الفيديو اختياري ويظهر داخل صفحة التفاصيل مع Controls. يفضل فيديو MP4/WebM قصير ومضغوط لتحافظ على سرعة الموقع.
            </p>
          </section>

          <section className="admin-panel">
            <h3>المميزات</h3>
            <label className="admin-field">
              <span>المميزات — مفصولة بفاصلة</span>
              <textarea
                name="features"
                defaultValue={(product.features || []).join(", ")}
                rows={5}
              />
            </label>

            {isTheme && (
              <label className="admin-field">
                <span>Gallery URLs — كل رابط في سطر</span>
                <textarea
                  name="gallery"
                  defaultValue={(product.gallery || []).join("\n")}
                  rows={4}
                  dir="ltr"
                />
              </label>
            )}
          </section>

          <section className="admin-panel seo-box">
            <h3>SEO للمنتج</h3>
            <label className="admin-field">
              <span>SEO Title</span>
              <input name="seo_title" defaultValue={product.seo_title || ""} />
            </label>
            <label className="admin-field">
              <span>Meta Description</span>
              <textarea
                name="seo_description"
                defaultValue={product.seo_description || ""}
                rows={3}
              />
            </label>
            <label className="admin-field">
              <span>Keywords</span>
              <textarea
                name="keywords"
                defaultValue={(product.keywords || []).join(", ")}
                rows={3}
              />
            </label>
          </section>
        </aside>
      </div>
    </form>
  );
}
