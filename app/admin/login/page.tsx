import Image from "next/image";
import { login } from "./actions";

export const metadata = { title: "دخول الإدارة", robots: { index: false, follow: false } };

const errorText: Record<string, string> = {
  denied: "هذا الحساب غير مسموح له بالدخول إلى لوحة ArabDEV.",
  credentials: "البريد أو كلمة المرور غير صحيحة.",
  supabase: "اتصال Supabase غير مضبوط على السيرفر. في Vercel أضف متغيرات Supabase من Settings → Environment Variables ثم اعمل Redeploy.",
};

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <Image src="/brand/arabdev-logo.png" alt="ArabDEV" width={320} height={118} priority />
          <span>PRIVATE ADMIN / CMS</span>
        </div>
        <div className="admin-login-copy"><small>لوحة خاصة</small><h1>أهلاً بعودتك.</h1><p>لا يوجد تسجيل حسابات. الدخول متاح لحساب الإدارة المحدد فقط.</p></div>
        {error && <div className="admin-alert error">{errorText[error] || "تعذر تسجيل الدخول."}</div>}
        <form action={login} className="admin-login-form">
          <label><span>البريد الإلكتروني</span><input name="email" type="email" defaultValue="ziadbobo78@gmail.com" required autoComplete="email" /></label>
          <label><span>كلمة المرور</span><input name="password" type="password" required autoComplete="current-password" placeholder="••••••••••" /></label>
          <button type="submit">دخول لوحة التحكم <b>←</b></button>
        </form>
        <p className="admin-login-note">ArabDEV · Supabase Auth · Owner only</p>
      </section>
    </main>
  );
}
