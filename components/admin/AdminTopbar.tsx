import Link from "next/link";
import { logout } from "@/app/admin/login/actions";

export function AdminTopbar({ email }: { email: string }) {
  return (
    <header className="admin-topbar">
      <div className="admin-profile">
        <span className="admin-avatar">ZM</span>
        <div>
          <b>زياد محمود</b>
          <small>{email}</small>
        </div>
      </div>

      <div className="admin-search" role="search">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span>ابحث في المقالات، الإضافات، القوالب...</span>
        <kbd>⌘ K</kbd>
      </div>

      <div className="admin-top-actions">
        <Link href="/" target="_blank">عرض الموقع ↗</Link>
        <form action={logout}>
          <button type="submit">تسجيل الخروج</button>
        </form>
      </div>
    </header>
  );
}
