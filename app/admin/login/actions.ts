"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

function isNextRedirect(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest || "").startsWith("NEXT_REDIRECT")
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

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      redirect("/admin/login?error=credentials");
    }
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    console.error("[ArabDEV admin login] Supabase request failed:", error);
    redirect("/admin/login?error=network");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("[ArabDEV admin logout] Supabase sign out failed:", error);
  }

  revalidatePath("/", "layout");
  redirect("/admin/login");
}
