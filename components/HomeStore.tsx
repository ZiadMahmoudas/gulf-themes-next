"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type HomeStoreProduct = {
  kind: "THEME" | "PLUGIN";
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  status: string;
  image: string;
  href: string;
  commerce: boolean;
};

type FilterKey = "all" | "themes" | "plugins" | "commerce";

const PAGE_SIZE = 4;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "كل المنتجات" },
  { key: "themes", label: "قوالب" },
  { key: "plugins", label: "إضافات" },
  { key: "commerce", label: "WooCommerce" },
];

function matchesFilter(product: HomeStoreProduct, filter: FilterKey) {
  if (filter === "themes") return product.kind === "THEME";
  if (filter === "plugins") return product.kind === "PLUGIN";
  if (filter === "commerce") return product.commerce;
  return true;
}

export function HomeStore({ products }: { products: HomeStoreProduct[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProducts = useMemo(
    () => products.filter((product) => matchesFilter(product, activeFilter)),
    [activeFilter, products],
  );

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount],
  );

  const filterCount = (filter: FilterKey) =>
    products.filter((product) => matchesFilter(product, filter)).length;

  const changeFilter = (filter: FilterKey) => {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
  };

  const hasMore = visibleCount < filteredProducts.length;

  return (
    <>
      <div className="v14-filter-row" aria-label="تصنيفات المنتجات" role="group">
        {filters.map((filter) => {
          const active = filter.key === activeFilter;
          return (
            <button
              type="button"
              className={active ? "is-active" : undefined}
              aria-pressed={active}
              onClick={() => changeFilter(filter.key)}
              key={filter.key}
            >
              <span>{filter.label}</span>
              <small>{String(filterCount(filter.key)).padStart(2, "0")}</small>
            </button>
          );
        })}
      </div>

      <div className="v14-product-grid" id="home-store-products" aria-live="polite">
        {visibleProducts.map((product, index) => {
          const card = (
            <>
              <div className="v14-product-media">
                <img
                  src={product.image}
                  alt={product.title}
                  loading={index < PAGE_SIZE ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="v14-product-kind">{product.kind}</span>
                <span className="v14-product-status">{product.status}</span>
                <span className="v14-product-overlay-v19"><small>اقرأ التفاصيل أولاً</small><b>شاهد التفاصيل ↗</b></span>
              </div>
              <div className="v14-product-body">
                <small>{product.category}</small>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="v14-product-bottom">
                  <strong>{product.price}</strong>
                  <span>عرض التفاصيل ↗</span>
                </div>
              </div>
            </>
          );

          return (
            <Link
              className="v14-product-card v14-product-card-filtered"
              href={product.href}
              key={`${activeFilter}-${product.kind}-${product.slug}`}
            >
              {card}
            </Link>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="v14-empty-filter">لا توجد منتجات في هذا التصنيف حالياً.</div>
      ) : null}

      {hasMore ? (
        <div className="v16-load-more-wrap">
          <button
            className="v16-load-more"
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredProducts.length))}
            aria-controls="home-store-products"
          >
            <span>تحميل المزيد</span>
            <small>{visibleProducts.length} / {filteredProducts.length}</small>
            <i aria-hidden="true">↓</i>
          </button>
        </div>
      ) : null}
    </>
  );
}
