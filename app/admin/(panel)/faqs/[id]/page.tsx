import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { FaqForm } from "@/components/admin/FaqForm";
export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <FaqForm faq={data} />;
}
