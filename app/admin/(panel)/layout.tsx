import { requireAdmin } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const { claims } = await requireAdmin();
  return <div className="admin-shell" dir="rtl"><AdminSidebar /><div className="admin-main"><AdminTopbar email={claims.email || ""} /><div className="admin-page">{children}</div></div></div>;
}
