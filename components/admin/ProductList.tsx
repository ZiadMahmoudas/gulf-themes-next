import Link from "next/link";
import { deleteProduct } from "@/app/admin/(panel)/actions";

function shortUrl(value?: string | null) {
  if (!value) return "—";
  try {
    const url = new URL(value);
    return `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return value;
  }
}

export function ProductList({
  type,
  data,
}: {
  type: "themes" | "plugins";
  data: any[];
}) {
  const theme = type === "themes";

  return (
    <>
      <div className="admin-section-head">
        <div>
          <small>{theme ? "THEMES" : "PLUGINS"} / LIBRARY</small>
          <h1>{theme ? "القوالب" : "الإضافات"}</h1>
          <p>تحكم في المنتجات، الصور، الأسعار والرابط الخارجي.</p>
        </div>
        <Link className="admin-primary" href={`/admin/${type}/new`}>
          + {theme ? "قالب جديد" : "إضافة جديدة"}
        </Link>
      </div>

      <section className="admin-panel admin-table-panel">
        <div className="admin-table product-admin-table">
          <div className="tr th">
            <span>المنتج</span>
            <span>الرابط الخارجي</span>
            <span>التصنيف</span>
            <span>السعر</span>
            <span>الحالة</span>
            <span>إجراءات</span>
          </div>

          {data.length ? (
            data.map((p: any) => (
              <div className="tr" key={p.id}>
                <span className="article-cell">
                  {p.cover_image ? (
                    <i style={{ backgroundImage: `url(${p.cover_image})` }} />
                  ) : (
                    <i />
                  )}
                  <b>{p.title}</b>
                </span>

                <span className="external-url-cell" dir="ltr">
                  {p.demo_url ? (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.demo_url}
                    >
                      {shortUrl(p.demo_url)} <b>↗</b>
                    </a>
                  ) : (
                    <em>لم يضف رابط</em>
                  )}
                </span>

                <span>{p.category}</span>
                <span>{p.price}</span>
                <span>
                  <i className={`status ${p.status}`}>
                    {p.status === "published" ? "منشور" : "مسودة"}
                  </i>
                </span>
                <span className="row-actions">
                  <Link href={`/admin/${type}/${p.id}`}>تعديل</Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="table" value={type} />
                    <button type="submit">حذف</button>
                  </form>
                </span>
              </div>
            ))
          ) : (
            <p className="admin-empty">لا يوجد محتوى هنا بعد.</p>
          )}
        </div>
      </section>
    </>
  );
}
