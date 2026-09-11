"use client";

import { useMemo, useState } from "react";

function slugifyProductTitle(value: string) {
  const normalized = value.normalize("NFKC").trim();
  const latin = normalized.match(/[a-zA-Z0-9]+/g)?.join("-") || "";
  const source = latin.length >= 2 ? latin : normalized;
  return source
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function ProductNameSlugFields({
  initialTitle = "",
  initialSlug = "",
  placeholder = "GulfShop",
  basePath,
}: {
  initialTitle?: string;
  initialSlug?: string;
  placeholder?: string;
  basePath: "/themes" | "/plugins";
}) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug || slugifyProductTitle(initialTitle));
  const [slugTouched, setSlugTouched] = useState(false);

  const preview = useMemo(
    () => `${basePath}/${slug || "product-slug"}`,
    [basePath, slug],
  );

  return (
    <>
      <label className="admin-field">
        <span>الاسم</span>
        <input
          name="title"
          value={title}
          required
          placeholder={placeholder}
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);
            if (!slugTouched) setSlug(slugifyProductTitle(nextTitle));
          }}
        />
      </label>

      <label className="admin-field product-slug-editor-v20">
        <span>رابط صفحة المنتج داخل ArabDEV</span>
        <div className="product-slug-box-v20" dir="ltr">
          <code>{basePath}/</code>
          <input
            name="slug"
            value={slug}
            required
            placeholder="wp-rocket"
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(
                event.target.value
                  .toLowerCase()
                  .replace(/[^\p{L}\p{N}-]+/gu, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 80),
              );
            }}
          />
          <button
            type="button"
            onClick={() => {
              setSlugTouched(false);
              setSlug(slugifyProductTitle(title));
            }}
          >
            من الاسم
          </button>
        </div>
        <small className="admin-field-help">
          ده الرابط الداخلي للتفاصيل: <b dir="ltr">{preview}</b>. لو غيرت اسم المنتج، اضغط «من الاسم» أو عدله يدويًا.
        </small>
      </label>
    </>
  );
}
