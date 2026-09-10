import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

export async function requireAdmin() {
  // Do not gate the dashboard on raw process.env checks.
  // Supabase config is normalized centrally and includes a safe public fallback.
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getClaims();
    if (error) redirect("/admin/login?error=session");

    const claims = data?.claims as { email?: string; sub?: string } | undefined;
    if (!claims?.email || claims.email.toLowerCase() !== site.adminEmail.toLowerCase()) {
      redirect("/admin/login?error=session");
    }

    return { supabase, claims };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    redirect("/admin/login?error=network");
  }
}
