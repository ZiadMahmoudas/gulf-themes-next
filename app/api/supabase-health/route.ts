import { NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const { url, usedFallbackUrl, usedFallbackKey } = getSupabaseConfig();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${url}/auth/v1/health`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    return NextResponse.json({
      ok: response.ok,
      authStatus: response.status,
      projectHost: new URL(url).hostname,
      configSource: usedFallbackUrl || usedFallbackKey ? "fallback-or-mixed" : "vercel-env",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        authStatus: null,
        projectHost: new URL(url).hostname,
        configSource: usedFallbackUrl || usedFallbackKey ? "fallback-or-mixed" : "vercel-env",
        error: error instanceof Error ? error.message : "Supabase health request failed",
      },
      { status: 503 }
    );
  } finally {
    clearTimeout(timer);
  }
}
