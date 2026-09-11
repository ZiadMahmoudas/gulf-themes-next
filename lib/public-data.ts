import {
  posts as fallbackPosts,
  themes as fallbackThemes,
  plugins as fallbackPlugins,
  type Post,
  type ThemeItem,
  type PluginItem,
} from "@/lib/content";

const configured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export type CmsPost = Post & {
  id?: string;
  featuredImage?: string | null;
  contentHtml?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type CmsTheme = ThemeItem & {
  id?: string;
  contentHtml?: string;
  demoUrl?: string | null;
  gallery?: string[];
};

export type CmsPlugin = PluginItem & {
  id?: string;
  contentHtml?: string;
  demoUrl?: string | null;
};

export type CmsFaq = {
  id?: string;
  question: string;
  answer: string;
  sortOrder: number;
};

type PublicFetchOptions = {
  tag: "arabdev-articles" | "arabdev-themes" | "arabdev-plugins" | "arabdev-faqs";
  revalidate?: number;
};

async function publicRest<T>(
  table: string,
  query: string,
  { tag, revalidate = 3600 }: PublicFetchOptions,
): Promise<T[]> {
  if (!configured()) return [];

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: "application/json",
    },
    cache: "force-cache",
    next: { revalidate, tags: [tag] },
  });

  if (!response.ok) {
    throw new Error(`Supabase public read failed: ${table} (${response.status})`);
  }

  return (await response.json()) as T[];
}

function cleanText(html: unknown) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapArticle(row: any): CmsPost {
  const plain = cleanText(row.content_html);
  const words = plain ? plain.split(/\s+/).length : 650;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    date: (row.published_at || row.created_at || new Date().toISOString()).slice(
      0,
      10,
    ),
    readTime: `${Math.max(3, Math.ceil(words / 180))} دقائق`,
    category: row.category || "WordPress",
    keywords: row.keywords || [],
    sections: [],
    featuredImage: row.featured_image,
    contentHtml: row.content_html || "",
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
}

function mapTheme(row: any): CmsTheme {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    label: row.label || "WordPress Theme",
    category: row.category || "WordPress",
    description: row.description || "",
    longDescription: row.description || "",
    price: row.price || "قريباً",
    status: "متاح",
    features: row.features || [],
    keywords: row.keywords || [],
    accent: String(row.title || "T").slice(0, 2).toUpperCase(),
    coverImage: row.cover_image,
    contentHtml: row.content_html || "",
    demoUrl: row.demo_url,
    externalUrl: row.demo_url || undefined,
    gallery: row.gallery || [],
  };
}

function mapPlugin(row: any): CmsPlugin {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    label: row.label || "WordPress Plugin",
    category: row.category || "WordPress",
    description: row.description || "",
    longDescription: row.description || "",
    price: row.price || "قريباً",
    status: "متاح",
    features: row.features || [],
    keywords: row.keywords || [],
    accent: String(row.title || "P").slice(0, 2).toUpperCase(),
    symbol: "+",
    coverImage: row.cover_image,
    contentHtml: row.content_html || "",
    demoUrl: row.demo_url,
    externalUrl: row.demo_url || undefined,
  };
}

const ARTICLE_LIST_FIELDS =
  "id,slug,title,excerpt,published_at,created_at,category,keywords,featured_image,seo_title,seo_description";
const ARTICLE_DETAIL_FIELDS = `${ARTICLE_LIST_FIELDS},content_html`;
const THEME_FIELDS =
  "id,slug,title,label,category,description,price,features,keywords,cover_image,demo_url,gallery,content_html";
const PLUGIN_FIELDS =
  "id,slug,title,label,category,description,price,features,keywords,cover_image,demo_url,content_html";

export async function getPublishedArticles(): Promise<CmsPost[]> {
  if (!configured()) return fallbackPosts;

  try {
    const rows = await publicRest<any>(
      "articles",
      `select=${ARTICLE_LIST_FIELDS}&status=eq.published&order=published_at.desc.nullslast,created_at.desc`,
      { tag: "arabdev-articles" },
    );
    return rows.map(mapArticle);
  } catch {
    return fallbackPosts;
  }
}

export async function getArticleBySlug(slug: string): Promise<CmsPost | null> {
  if (!configured()) return fallbackPosts.find((p) => p.slug === slug) || null;

  try {
    const rows = await publicRest<any>(
      "articles",
      `select=${ARTICLE_DETAIL_FIELDS}&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { tag: "arabdev-articles" },
    );
    return rows[0] ? mapArticle(rows[0]) : null;
  } catch {
    return fallbackPosts.find((p) => p.slug === slug) || null;
  }
}

export async function getPublishedThemes(): Promise<CmsTheme[]> {
  if (!configured()) return fallbackThemes;

  try {
    const rows = await publicRest<any>(
      "themes",
      `select=${THEME_FIELDS}&status=eq.published&order=created_at.desc`,
      { tag: "arabdev-themes" },
    );
    return rows.map(mapTheme);
  } catch {
    return fallbackThemes;
  }
}

export async function getThemeBySlug(slug: string): Promise<CmsTheme | null> {
  if (!configured()) return fallbackThemes.find((t) => t.slug === slug) || null;

  try {
    const rows = await publicRest<any>(
      "themes",
      `select=${THEME_FIELDS}&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { tag: "arabdev-themes" },
    );
    return rows[0] ? mapTheme(rows[0]) : null;
  } catch {
    return fallbackThemes.find((t) => t.slug === slug) || null;
  }
}

export async function getPublishedPlugins(): Promise<CmsPlugin[]> {
  if (!configured()) return fallbackPlugins;

  try {
    const rows = await publicRest<any>(
      "plugins",
      `select=${PLUGIN_FIELDS}&status=eq.published&order=created_at.desc`,
      { tag: "arabdev-plugins" },
    );
    return rows.map(mapPlugin);
  } catch {
    return fallbackPlugins;
  }
}

export async function getPluginBySlug(slug: string): Promise<CmsPlugin | null> {
  if (!configured()) return fallbackPlugins.find((p) => p.slug === slug) || null;

  try {
    const rows = await publicRest<any>(
      "plugins",
      `select=${PLUGIN_FIELDS}&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { tag: "arabdev-plugins" },
    );
    return rows[0] ? mapPlugin(rows[0]) : null;
  } catch {
    return fallbackPlugins.find((p) => p.slug === slug) || null;
  }
}


const fallbackFaqs: CmsFaq[] = [
  {
    question: "ما الذي تقدمه ArabDEV بالضبط؟",
    answer: "نبني ونوفر قوالب WordPress وإضافات عملية ومواقع مخصصة موجهة للعربي من البداية، مع اهتمام واضح بالموبايل والأداء والـRTL وتجربة العميل.",
    sortOrder: 1,
  },
  {
    question: "هل القوالب مناسبة للسعودية والإمارات والخليج؟",
    answer: "هذا هو الاتجاه الأساسي للمنصة. نهتم بطريقة عرض العربية، سرعة الموبايل، واتساب، WooCommerce، وصفحات الخدمات والمتاجر الشائعة في السوق الخليجي.",
    sortOrder: 2,
  },
  {
    question: "هل أقدر أشاهد القالب أو الإضافة قبل التواصل؟",
    answer: "كل قالب أو إضافة له صفحة تفاصيل داخل ArabDEV أولاً. بعد قراءة المميزات والوصف تقدر تفتح الـLive Demo الخارجي من زر «شاهد الآن».",
    sortOrder: 3,
  },
  {
    question: "هل تنفذون تعديلات أو موقع مخصص؟",
    answer: "نعم. لو القالب الجاهز لا يغطي احتياج المشروع، تقدر تتواصل معنا لتنفيذ واجهة أو موقع أو وظيفة WordPress مخصصة.",
    sortOrder: 4,
  },
];

export async function getPublishedFaqs(): Promise<CmsFaq[]> {
  if (!configured()) return fallbackFaqs;

  try {
    const rows = await publicRest<any>(
      "faqs",
      "select=id,question,answer,sort_order&is_published=eq.true&order=sort_order.asc,created_at.asc",
      { tag: "arabdev-faqs" },
    );
    if (!rows.length) return fallbackFaqs;
    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      sortOrder: Number(row.sort_order || 0),
    }));
  } catch {
    return fallbackFaqs;
  }
}
