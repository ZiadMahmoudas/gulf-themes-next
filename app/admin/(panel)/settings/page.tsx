import { requireAdmin } from "@/lib/admin";
import { saveSettings } from "@/app/admin/(panel)/actions";

type SocialData = Record<string, string>;

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const q = await searchParams;
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  const socials = ((data?.social_links || {}) as SocialData) || {};
  const socialValue = (key: string, legacyKey?: string) =>
    socials[key] || (legacyKey ? data?.[legacyKey] : "") || "";

  return (
    <>
      <div className="admin-section-head">
        <div>
          <small>SITE / SETTINGS</small>
          <h1>الإعدادات</h1>
          <p>أي تعديل هنا ينعكس على بيانات التواصل والسوشيال في الموقع بالكامل.</p>
        </div>
      </div>

      {q.saved && <div className="admin-alert success">تم حفظ الإعدادات وتحديث الموقع.</div>}
      {q.error && <div className="admin-alert error">تعذر الحفظ: {decodeURIComponent(q.error)}</div>}

      <form action={saveSettings} className="admin-panel settings-form v28-settings-form">
        <div className="v28-settings-section">
          <div className="v28-settings-title">
            <div><small>01</small><h2>بيانات البراند</h2></div>
            <p>الاسم، الوصف وبيانات التواصل الأساسية التي تظهر في الفوتر وصفحة التواصل.</p>
          </div>

          <div className="two-fields">
            <label className="admin-field"><span>اسم البراند</span><input name="brand_name" defaultValue={data?.brand_name || "ArabDEV"} /></label>
            <label className="admin-field"><span>الإيميل</span><input name="email" type="email" dir="ltr" defaultValue={data?.email || "ziadbobo78@gmail.com"} /></label>
          </div>
          <label className="admin-field"><span>وصف قصير</span><textarea name="tagline" rows={3} defaultValue={data?.tagline || ""} /></label>
          <label className="admin-field"><span>الهاتف</span><input name="phone" dir="ltr" defaultValue={data?.phone || "01100133486"} /></label>
        </div>

        <div className="v28-settings-section">
          <div className="v28-settings-title">
            <div><small>02</small><h2>السوشيال ميديا</h2></div>
            <p>حط الروابط اللي عندك فقط. أي منصة تسيبها فاضية لن تظهر في الموقع.</p>
          </div>

          <div className="two-fields">
            <label className="admin-field"><span>Facebook</span><input name="facebook" dir="ltr" placeholder="https://facebook.com/..." defaultValue={socialValue("facebook", "facebook")} /></label>
            <label className="admin-field"><span>Instagram</span><input name="instagram" dir="ltr" placeholder="https://instagram.com/..." defaultValue={socialValue("instagram", "instagram")} /></label>
          </div>
          <div className="two-fields">
            <label className="admin-field"><span>LinkedIn</span><input name="linkedin" dir="ltr" placeholder="https://linkedin.com/in/..." defaultValue={socialValue("linkedin", "linkedin")} /></label>
            <label className="admin-field"><span>X / Twitter</span><input name="x" dir="ltr" placeholder="https://x.com/..." defaultValue={socialValue("x")} /></label>
          </div>
          <div className="two-fields">
            <label className="admin-field"><span>TikTok</span><input name="tiktok" dir="ltr" placeholder="https://tiktok.com/@..." defaultValue={socialValue("tiktok")} /></label>
            <label className="admin-field"><span>YouTube</span><input name="youtube" dir="ltr" placeholder="https://youtube.com/@..." defaultValue={socialValue("youtube")} /></label>
          </div>
          <div className="two-fields">
            <label className="admin-field"><span>Telegram</span><input name="telegram" dir="ltr" placeholder="https://t.me/..." defaultValue={socialValue("telegram")} /></label>
            <label className="admin-field"><span>WhatsApp</span><input name="whatsapp" dir="ltr" placeholder="201234567890 أو https://wa.me/..." defaultValue={socialValue("whatsapp")} /></label>
          </div>
          <label className="admin-field"><span>GitHub</span><input name="github" dir="ltr" placeholder="https://github.com/..." defaultValue={socialValue("github")} /></label>
        </div>

        <button className="admin-primary" type="submit">حفظ الإعدادات</button>
      </form>
    </>
  );
}
