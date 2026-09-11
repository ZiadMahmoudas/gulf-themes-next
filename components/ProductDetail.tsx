import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

type ProductDetailProps = {
  kind: "theme" | "plugin";
  title: string;
  label: string;
  category: string;
  description: string;
  longDescription?: string;
  price: string;
  status: string;
  image: string;
  externalUrl?: string;
  features: string[];
  contentHtml?: string;
  gallery?: string[];
};

export function ProductDetail({
  kind,
  title,
  label,
  category,
  description,
  longDescription,
  price,
  status,
  image,
  externalUrl,
  features,
  contentHtml,
  gallery = [],
}: ProductDetailProps) {
  const libraryHref = kind === "theme" ? "/themes" : "/plugins";
  const libraryLabel = kind === "theme" ? "القوالب" : "الإضافات";
  const typeLabel = kind === "theme" ? "WORDPRESS THEME" : "WORDPRESS PLUGIN";
  const productTypeAr = kind === "theme" ? "القالب" : "الإضافة";
  const images = [image, ...gallery.filter(Boolean)].filter(
    (value, index, list) => list.indexOf(value) === index,
  );

  return (
    <article className="product-detail-v19">
      <section className="product-detail-hero-v19 shell">
        <nav className="product-breadcrumb-v19" aria-label="مسار الصفحة">
          <Link href="/">الرئيسية</Link>
          <span>/</span>
          <Link href={libraryHref}>{libraryLabel}</Link>
          <span>/</span>
          <b>{title}</b>
        </nav>

        <div className="product-detail-grid-v19">
          <div className="product-detail-media-v19">
            <div className="product-detail-cover-v19">
              <img src={image} alt={`${title} — ${label}`} fetchPriority="high" decoding="async" />
              <span className="product-detail-shade-v19" aria-hidden="true" />
              <div className="product-detail-media-top-v19">
                <span>{typeLabel}</span>
                <b>{status}</b>
              </div>
              <div className="product-detail-media-title-v19">
                <small>ARABDEV / {category}</small>
                <strong>{title}</strong>
                <span>{label}</span>
              </div>
            </div>
          </div>

          <div className="product-detail-copy-v19">
            <span className="product-detail-kicker-v19">{typeLabel} / DETAILS</span>
            <h1>{title}</h1>
            <p className="product-detail-lead-v19">{description}</p>

            <div className="product-detail-tags-v19">
              {features.slice(0, 5).map((feature) => <span key={feature}>{feature}</span>)}
            </div>

            <div className="product-detail-buy-v19">
              <div>
                <small>السعر</small>
                <strong>{price}</strong>
              </div>
              <div className="product-detail-actions-v19">
                {externalUrl ? (
                  <a className="product-detail-demo-v19" href={externalUrl} target="_blank" rel="noopener noreferrer">
                    شاهد الآن <b>↗</b>
                  </a>
                ) : (
                  <span className="product-detail-demo-v19 is-disabled">المعاينة قريباً</span>
                )}
                <a
                  className="product-detail-whatsapp-v19"
                  href={whatsappUrl(`مرحباً، أريد الاستفسار عن ${productTypeAr} ${title}`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  اسأل عن المنتج <b>↗</b>
                </a>
              </div>
            </div>

            <div className="product-detail-note-v19">
              <span>قبل فتح المعاينة</span>
              <p>هنا تقدر تقرأ تفاصيل المنتج ومميزاته أولاً، وبعدها افتح النسخة المباشرة من زر «شاهد الآن».</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-detail-body-v19 shell">
        <div className="product-detail-main-v19">
          <div className="product-detail-section-title-v19">
            <span>01</span>
            <div>
              <small>OVERVIEW</small>
              <h2>عن {productTypeAr}</h2>
            </div>
          </div>

          {contentHtml ? (
            <div className="product-rich-content-v19" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <div className="product-rich-content-v19">
              <p>{longDescription || description}</p>
              <p>تم تجهيز المنتج ليكون واضحاً في الاستخدام، مناسباً للعربية والموبايل، وقابلاً للتوسع بدون تعقيد غير ضروري.</p>
            </div>
          )}

          {images.length > 1 ? (
            <div className="product-gallery-v19">
              {images.slice(1).map((galleryImage, index) => (
                <figure key={`${galleryImage}-${index}`}>
                  <img src={galleryImage} alt={`${title} — صورة ${index + 2}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="product-detail-side-v19">
          <div className="product-features-card-v19">
            <span>02 / INCLUDED</span>
            <h2>أهم المميزات</h2>
            <ul>
              {features.length ? features.map((feature) => <li key={feature}><i>✓</i><span>{feature}</span></li>) : <li><i>✓</i><span>تفاصيل المنتج ستضاف قريباً</span></li>}
            </ul>
          </div>

          <div className="product-sticky-cta-v19">
            <small>جاهز تشوفه عملياً؟</small>
            <strong>{title}</strong>
            <p>بعد ما قرأت التفاصيل، افتح المعاينة الخارجية في تبويب جديد.</p>
            {externalUrl ? (
              <a href={externalUrl} target="_blank" rel="noopener noreferrer">شاهد الآن <b>↗</b></a>
            ) : (
              <span>المعاينة غير متاحة حالياً</span>
            )}
          </div>
        </aside>
      </section>

      <section className="product-detail-next-v19 shell">
        <div>
          <span>ARABDEV / DISCOVER MORE</span>
          <h2>شوف باقي {libraryLabel}.</h2>
        </div>
        <Link href={libraryHref}>العودة إلى {libraryLabel} <b>↗</b></Link>
      </section>
    </article>
  );
}
