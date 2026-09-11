"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

const list = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

const val = (fd: FormData, key: string) => String(fd.get(key) || "").trim();

function internalSlug(title: string) {
  const clean = title
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${clean || "product"}-${randomUUID().slice(0, 6)}`;
}

function normalizeExternalUrl(raw: string) {
  if (!raw) return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function saveArticle(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  const status = val(fd, "status") === "published" ? "published" : "draft";

  const payload = {
    title: val(fd, "title"),
    slug: val(fd, "slug"),
    excerpt: val(fd, "excerpt"),
    category: val(fd, "category") || "WordPress",
    featured_image: val(fd, "featured_image") || null,
    content_html: val(fd, "content_html"),
    seo_title: val(fd, "seo_title") || null,
    seo_description: val(fd, "seo_description") || null,
    keywords: list(fd.get("keywords")),
    status,
    published_at:
      status === "published"
        ? val(fd, "published_at") || new Date().toISOString()
        : null,
  };

  if (!payload.title || !payload.slug) {
    redirect(`/admin/articles/${id || "new"}?error=required`);
  }

  const query = id
    ? supabase.from("articles").update(payload).eq("id", id)
    : supabase.from("articles").insert(payload);

  const { error } = await query;
  if (error) {
    redirect(
      `/admin/articles/${id || "new"}?error=${encodeURIComponent(error.message)}`,
    );
  }

  updateTag("arabdev-articles");
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
  revalidatePath("/sitemap.xml");
  redirect("/admin/articles?saved=1");
}

export async function deleteArticle(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  if (id) await supabase.from("articles").delete().eq("id", id);
  updateTag("arabdev-articles");
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
  redirect("/admin/articles?deleted=1");
}

async function saveProduct(fd: FormData, table: "themes" | "plugins") {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  const title = val(fd, "title");
  const requestedSlug = val(fd, "slug");
  const rawExternalUrl = val(fd, "demo_url");
  const externalUrl = normalizeExternalUrl(rawExternalUrl);
  const productSlug = requestedSlug || internalSlug(title);

  if (!title) {
    redirect(`/admin/${table}/${id || "new"}?error=required`);
  }

  if (rawExternalUrl && !externalUrl) {
    redirect(`/admin/${table}/${id || "new"}?error=invalid-url`);
  }

  const payload: Record<string, unknown> = {
    title,
    // Public internal product URL. Editable from the dashboard.
    slug: productSlug,
    label: val(fd, "label"),
    category: val(fd, "category") || "WordPress",
    description: val(fd, "description"),
    content_html: val(fd, "content_html"),
    cover_image: val(fd, "cover_image") || null,
    video_url: val(fd, "video_url") || null,
    price: val(fd, "price") || "قريباً",
    features: list(fd.get("features")),
    // Existing DB column retained for backwards compatibility. In V6 it is
    // the main external destination URL for the product.
    demo_url: externalUrl,
    seo_title: val(fd, "seo_title") || null,
    seo_description: val(fd, "seo_description") || null,
    keywords: list(fd.get("keywords")),
    status: val(fd, "status") === "published" ? "published" : "draft",
  };

  if (table === "themes") payload.gallery = list(fd.get("gallery"));

  const query = id
    ? supabase.from(table).update(payload).eq("id", id)
    : supabase.from(table).insert(payload);

  const { error } = await query;
  if (error) {
    redirect(
      `/admin/${table}/${id || "new"}?error=${encodeURIComponent(error.message)}`,
    );
  }

  updateTag(table === "themes" ? "arabdev-themes" : "arabdev-plugins");
  revalidatePath(`/${table}`);
  revalidatePath(`/${table}/${productSlug}`);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect(`/admin/${table}?saved=1`);
}

export async function saveTheme(fd: FormData) {
  return saveProduct(fd, "themes");
}

export async function savePlugin(fd: FormData) {
  return saveProduct(fd, "plugins");
}

export async function deleteProduct(fd: FormData) {
  const { supabase } = await requireAdmin();
  const table = val(fd, "table") === "plugins" ? "plugins" : "themes";
  const id = val(fd, "id");
  if (id) await supabase.from(table).delete().eq("id", id);
  updateTag(table === "themes" ? "arabdev-themes" : "arabdev-plugins");
  revalidatePath(`/${table}`);
  revalidatePath(`/${table}/${productSlug}`);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/");
  redirect(`/admin/${table}?deleted=1`);
}

export async function updateMessage(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  const action = val(fd, "action");
  if (action === "delete") {
    await supabase.from("contact_messages").delete().eq("id", id);
  } else {
    await supabase
      .from("contact_messages")
      .update({ status: action === "archive" ? "archived" : "read" })
      .eq("id", id);
  }
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

export async function saveSettings(fd: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    brand_name: val(fd, "brand_name"),
    tagline: val(fd, "tagline"),
    phone: val(fd, "phone"),
    email: val(fd, "email"),
    facebook: val(fd, "facebook"),
    instagram: val(fd, "instagram"),
    linkedin: val(fd, "linkedin"),
  };

  const { error } = await supabase
    .from("site_settings")
    .update(payload)
    .eq("id", 1);

  if (error) {
    redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}


export async function saveFaq(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  const payload = {
    question: val(fd, "question"),
    answer: val(fd, "answer"),
    sort_order: Number(val(fd, "sort_order") || 0),
    is_published: val(fd, "is_published") !== "false",
  };

  if (!payload.question || !payload.answer) {
    redirect(`/admin/faqs/${id || "new"}?error=required`);
  }

  const query = id
    ? supabase.from("faqs").update(payload).eq("id", id)
    : supabase.from("faqs").insert(payload);
  const { error } = await query;
  if (error) redirect(`/admin/faqs/${id || "new"}?error=${encodeURIComponent(error.message)}`);

  updateTag("arabdev-faqs");
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaq(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = val(fd, "id");
  if (id) await supabase.from("faqs").delete().eq("id", id);
  updateTag("arabdev-faqs");
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs?deleted=1");
}
