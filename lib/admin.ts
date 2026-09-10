import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

export async function requireAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    redirect("/admin/login?error=supabase");
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims as { email?: string; sub?: string } | undefined;
  if (!claims?.email || claims.email.toLowerCase() !== site.adminEmail.toLowerCase()) {
    redirect("/admin/login");
  }
  return { supabase, claims };
}
