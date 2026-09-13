import { site } from "@/lib/site";

export type SocialKey =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "x"
  | "tiktok"
  | "youtube"
  | "telegram"
  | "whatsapp"
  | "github";

export type SiteSocialLinks = Partial<Record<SocialKey, string>>;

export type PublicSiteSettings = {
  brandName: string;
  tagline: string;
  phone: string;
  email: string;
  socials: SiteSocialLinks;
};

const FALLBACK_SETTINGS: PublicSiteSettings = {
  brandName: site.name,
  tagline: site.arabicTagline,
  phone: site.phone,
  email: site.email,
  socials: {
    facebook: site.socials.facebook,
    instagram: site.socials.instagram,
    linkedin: site.socials.linkedin,
    whatsapp: site.whatsapp,
  },
};

const configured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

function clean(value: unknown, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function cleanSocials(input: unknown): SiteSocialLinks {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  const raw = input as Record<string, unknown>;
  const keys: SocialKey[] = [
    "facebook",
    "instagram",
    "linkedin",
    "x",
    "tiktok",
    "youtube",
    "telegram",
    "whatsapp",
    "github",
  ];

  return Object.fromEntries(
    keys
      .map((key) => [key, clean(raw[key])] as const)
      .filter(([, value]) => Boolean(value)),
  ) as SiteSocialLinks;
}

async function fetchSettingsRow(select: string) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/site_settings?select=${encodeURIComponent(select)}&id=eq.1&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "force-cache",
      next: { revalidate: 300, tags: ["arabdev-settings"] },
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase settings read failed (${response.status})`);
  }

  const rows = (await response.json()) as Record<string, unknown>[];
  return rows[0] || null;
}

export async function getSiteSettings(): Promise<PublicSiteSettings> {
  if (!configured()) return FALLBACK_SETTINGS;

  try {
    let row: Record<string, unknown> | null = null;

    try {
      row = await fetchSettingsRow(
        "brand_name,tagline,phone,email,facebook,instagram,linkedin,social_links",
      );
    } catch {
      // Backwards compatible with databases that have not run V28 yet.
      row = await fetchSettingsRow(
        "brand_name,tagline,phone,email,facebook,instagram,linkedin",
      );
    }

    if (!row) return FALLBACK_SETTINGS;

    const storedSocials = cleanSocials(row.social_links);
    const legacySocial = (key: "facebook" | "instagram" | "linkedin") =>
      Object.prototype.hasOwnProperty.call(row, key)
        ? clean(row[key])
        : clean(FALLBACK_SETTINGS.socials[key]);
    const socials: SiteSocialLinks = {
      facebook: legacySocial("facebook"),
      instagram: legacySocial("instagram"),
      linkedin: legacySocial("linkedin"),
      ...storedSocials,
    };

    // Empty values should hide a network instead of rendering a broken button.
    Object.entries(socials).forEach(([key, value]) => {
      if (!clean(value)) delete socials[key as SocialKey];
    });


    return {
      brandName: clean(row.brand_name, FALLBACK_SETTINGS.brandName),
      tagline: clean(row.tagline, FALLBACK_SETTINGS.tagline),
      phone: clean(row.phone, FALLBACK_SETTINGS.phone),
      email: clean(row.email, FALLBACK_SETTINGS.email),
      socials,
    };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export function buildWhatsappUrl(raw: string | undefined, message = "") {
  const source = clean(raw, site.whatsapp);
  const encodedMessage = encodeURIComponent(message);

  if (/^https?:\/\//i.test(source)) {
    try {
      const url = new URL(source);
      if (message) url.searchParams.set("text", message);
      return url.toString();
    } catch {
      // Continue with number normalization below.
    }
  }

  let number = source.replace(/\D+/g, "");
  if (number.startsWith("00")) number = number.slice(2);
  // Convenience for the Egyptian local format used by the current site phone field.
  if (/^01\d{9}$/.test(number)) number = `20${number.slice(1)}`;
  return `https://wa.me/${number || site.whatsapp}${message ? `?text=${encodedMessage}` : ""}`;
}
