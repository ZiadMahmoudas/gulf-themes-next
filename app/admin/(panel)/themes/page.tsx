import { requireAdmin } from "@/lib/admin"; import { ProductList } from "@/components/admin/ProductList";
export default async function ThemesAdmin(){const {supabase}=await requireAdmin();const {data}=await supabase.from("themes").select("*").order("created_at",{ascending:false});return <ProductList type="themes" data={data||[]}/>}
