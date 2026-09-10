"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  );
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (email !== site.adminEmail.toLowerCase()) {
    redirect("/admin/login?error=denied");
  }

  if (!password) {
    redirect("/admin/login?error=credentials");
  }

  // On Vercel .env.local is not deployed because it is gitignored.
  // Missing runtime variables used to make this Server Action throw a 500.
  if (!hasSupabaseConfig()) {
    redirect("/admin/login?error=supabase");
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect("/admin/login?error=credentials");
    }
  } catch (error) {
    // Preserve Next.js redirect exceptions thrown inside the try block.
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    redirect("/admin/login?error=supabase");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  if (!hasSupabaseConfig()) {
    redirect("/admin/login?error=supabase");
  }

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Even if Supabase is unavailable, return the visitor to login cleanly.
  }

  revalidatePath("/", "layout");
  redirect("/admin/login");
}
