"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MediaKind = "image" | "video";

const mediaConfig = {
  image: {
    accept: "image/jpeg,image/png,image/webp,image/gif",
    maxBytes: 10 * 1024 * 1024,
    maxLabel: "10MB",
    types: "PNG / JPG / WEBP / GIF",
  },
  video: {
    accept: "video/mp4,video/webm,video/quicktime,video/x-m4v",
    maxBytes: 30 * 1024 * 1024,
    maxLabel: "30MB",
    types: "MP4 / WEBM / MOV",
  },
} as const;

export function MediaUpload({
  name,
  initial = "",
  label = "الصورة",
  kind = "image",
}: {
  name: string;
  initial?: string | null;
  label?: string;
  kind?: MediaKind;
}) {
  const [url, setUrl] = useState(initial || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const config = mediaConfig[kind];

  async function upload(file: File) {
    setBusy(true);
    setError("");

    try {
      if (file.size > config.maxBytes) {
        throw new Error(`حجم الملف أكبر من ${config.maxLabel}.`);
      }

      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() || (kind === "video" ? "mp4" : "jpg");
      const folder = kind === "video" ? "videos" : "images";
      const path = `${folder}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, {
          upsert: false,
          contentType: file.type,
          cacheControl: "31536000",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err: any) {
      setError(err?.message || `تعذر رفع ${kind === "video" ? "الفيديو" : "الصورة"}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`media-upload media-upload-${kind}`}>
      <label>{label}</label>

      {url ? (
        <div className="media-preview-v20">
          {kind === "video" ? (
            <video src={url} controls preload="metadata" playsInline />
          ) : (
            <img src={url} alt="" />
          )}
          <div className="media-preview-actions-v20">
            <a href={url} target="_blank" rel="noreferrer">فتح ↗</a>
            <button type="button" onClick={() => setUrl("")}>حذف</button>
          </div>
        </div>
      ) : (
        <label className="upload-drop">
          <input
            type="file"
            accept={config.accept}
            onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])}
            disabled={busy}
          />
          <b>{busy ? "جاري الرفع..." : kind === "video" ? "+ ارفع فيديو" : "+ ارفع صورة"}</b>
          <span>{config.types} — حتى {config.maxLabel}</span>
        </label>
      )}

      <input type="hidden" name={name} value={url} />
      {error ? <small className="form-error">{error}</small> : null}
    </div>
  );
}
