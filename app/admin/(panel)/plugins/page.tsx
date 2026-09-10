import { requireAdmin } from "@/lib/admin"; import { ProductList } from "@/components/admin/ProductList";
export default async function PluginsAdmin(){const {supabase}=await requireAdmin();const {data}=await supabase.from("plugins").select("*").order("created_at",{ascending:false});return <ProductList type="plugins" data={data||[]}/>}
