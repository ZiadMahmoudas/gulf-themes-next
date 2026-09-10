const FALLBACK_URL = "https://dfiqkesdrefwmtboacub.supabase.co";
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_FZ14-PU_zejZmlQzOURCfg_Vxo7eLkT";

function clean(value?: string) {
  return (value || "").trim().replace(/^['\"]|['\"]$/g, "");
}

function validUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function validKey(value: string) {
  return value.startsWith("sb_publishable_") || value.startsWith("eyJ");
}

export function getSupabaseConfig() {
  const envUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const envKey = clean(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  const url = validUrl(envUrl) ? envUrl : FALLBACK_URL;
  const key = validKey(envKey) ? envKey : FALLBACK_PUBLISHABLE_KEY;

  return {
    url,
    key,
    usedFallbackUrl: url === FALLBACK_URL && envUrl !== FALLBACK_URL,
    usedFallbackKey: key === FALLBACK_PUBLISHABLE_KEY && envKey !== FALLBACK_PUBLISHABLE_KEY,
  };
}
