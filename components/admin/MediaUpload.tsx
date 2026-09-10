"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MediaUpload({ name, initial = "", label = "الصورة" }: { name: string; initial?: string | null; label?: string }) {
  const [url, setUrl] = useState(initial || ""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function upload(file: File) {
    setBusy(true); setError("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg"; const path = `${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { upsert: false, contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path); setUrl(data.publicUrl);
    } catch (e: any) { setError(e?.message || "تعذر رفع الصورة"); }
    finally { setBusy(false); }
  }
  return <div className="media-upload"><label>{label}</label>{url ? <div className="media-preview" style={{backgroundImage:`url(${url})`}}><button type="button" onClick={()=>setUrl("")}>حذف</button></div> : <label className="upload-drop"><input type="file" accept="image/*" onChange={(e)=>e.target.files?.[0] && upload(e.target.files[0])} disabled={busy}/><b>{busy ? "جاري الرفع..." : "+ ارفع صورة"}</b><span>PNG / JPG / WEBP — حتى 10MB</span></label>}<input type="hidden" name={name} value={url}/>{error && <small className="form-error">{error}</small>}</div>;
}
