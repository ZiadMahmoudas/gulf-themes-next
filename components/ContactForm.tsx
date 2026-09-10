"use client";

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { createClient } from "@/lib/supabase/client";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;
    const timeInput = formRef.current.elements.namedItem("time") as HTMLInputElement | null;
    if (timeInput) timeInput.value = new Date().toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" });
    const fd = new FormData(formRef.current);
    if (String(fd.get("website") || "").trim()) return;
    setState("sending");

    try {
      const payload = {
        name: String(fd.get("from_name") || ""),
        email: String(fd.get("reply_to") || ""),
        phone: String(fd.get("phone") || ""),
        project_type: String(fd.get("project_type") || ""),
        message: String(fd.get("message") || ""),
      };
      const jobs: Promise<unknown>[] = [];
      if (hasSupabase) {
        const supabase = createClient();
        jobs.push(Promise.resolve(supabase.from("contact_messages").insert(payload)).then(({ error }: any) => { if (error) throw error; }));
      }
      if (serviceId && templateId && publicKey) {
        jobs.push(emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey, limitRate: { id: "arabdev-contact", throttle: 1000 } }));
      }
      if (!jobs.length) throw new Error("Contact services are not configured");
      await Promise.all(jobs);
      formRef.current.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading"><span className="eyebrow">أرسل تفاصيل مشروعك</span><h2>قول لنا محتاج إيه.<br/>ونقول لك أنسب خطوة.</h2><p>قالب جاهز، إضافة WordPress، أو تنفيذ موقع مخصص — اكتب التفاصيل الأساسية وإحنا نرد عليك.</p></div>
      <div className="form-grid">
        <label className="field"><span>الاسم *</span><input name="from_name" type="text" placeholder="اسمك أو اسم الشركة" required minLength={2}/></label>
        <label className="field"><span>رقم الهاتف / واتساب *</span><input name="phone" type="tel" placeholder="+966 / +971 / +20" required/></label>
        <label className="field"><span>البريد الإلكتروني *</span><input name="reply_to" type="email" placeholder="name@company.com" required/></label>
        <label className="field"><span>إيه اللي محتاجه؟ *</span><span className="select-shell"><select name="project_type" defaultValue="" required><option value="" disabled>اختر نوع الطلب</option><option value="Theme">شراء Theme</option><option value="Plugin">شراء Plugin</option><option value="Custom Website">تنفيذ موقع مخصص</option><option value="Custom Theme">Theme مخصص</option><option value="Support">دعم / استفسار</option></select><i aria-hidden="true">⌄</i></span></label>
        <label className="field field-full"><span>رسالتك *</span><textarea name="message" rows={6} placeholder="اكتب المجال، المطلوب، رابط الموقع الحالي لو موجود، وأي تفاصيل مهمة..." required minLength={10}/></label>
      </div>
      <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <input type="hidden" name="source" value="ArabDEV Website"/>
      <input type="hidden" name="time" value="" readOnly/>
      <div className="form-submit-row"><button className="button primary submit-button" type="submit" disabled={state === "sending"}>{state === "sending" ? "جاري الإرسال..." : "إرسال الطلب"}<span>←</span></button><p className={`form-status ${state}`} role="status" aria-live="polite">{state === "success" && "تم إرسال رسالتك بنجاح. هنراجعها ونرد عليك."}{state === "error" && "حصل خطأ أثناء الإرسال. جرّب مرة ثانية أو استخدم واتساب."}{(state === "idle" || state === "sending") && "بياناتك تستخدم فقط للرد على طلبك."}</p></div>
    </form>
  );
}
