import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { ArticleForm } from "@/components/admin/ArticleForm";
export default async function EditArticlePage({params}:{params:Promise<{id:string}>}){const {id}=await params;const {supabase}=await requireAdmin();const {data}=await supabase.from("articles").select("*").eq("id",id).maybeSingle();if(!data)notFound();return <ArticleForm article={data}/>}
