"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RichEditorProps = {
  initial?: string | null;
  name?: string;
};

const BLOCKS = [
  { label: "P", value: "p", title: "فقرة عادية" },
  { label: "H1", value: "h1", title: "عنوان رئيسي H1" },
  { label: "H2", value: "h2", title: "عنوان H2" },
  { label: "H3", value: "h3", title: "عنوان H3" },
  { label: "H4", value: "h4", title: "عنوان H4" },
  { label: "H5", value: "h5", title: "عنوان H5" },
  { label: "H6", value: "h6", title: "عنوان H6" },
] as const;

export function RichEditor({ initial = "", name = "content_html" }: RichEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(initial || "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (initial || "")) {
      ref.current.innerHTML = initial || "";
    }
  }, [initial]);

  function syncHtml() {
    setHtml(ref.current?.innerHTML || "");
  }

  function cmd(command: string, value?: string) {
    ref.current?.focus();
    document.execCommand(command, false, value);
    syncHtml();
  }

  function setBlock(tag: string) {
    ref.current?.focus();
    // formatBlock is still the most interoperable option for this lightweight editor.
    document.execCommand("formatBlock", false, `<${tag}>`);
    syncHtml();
  }

  async function insertImage(file: File) {
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `articles/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        contentType: file.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      cmd("insertImage", data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rich-editor">
      <div className="editor-toolbar" role="toolbar" aria-label="أدوات تنسيق المقال">
        <div className="editor-toolbar-group editor-toolbar-blocks" aria-label="نوع النص">
          {BLOCKS.map((block) => (
            <button
              key={block.value}
              type="button"
              className={`editor-block-btn editor-block-${block.value}`}
              onClick={() => setBlock(block.value)}
              title={block.title}
              aria-label={block.title}
            >
              {block.label}
            </button>
          ))}
        </div>

        <span className="editor-toolbar-separator" aria-hidden="true" />

        <div className="editor-toolbar-group" aria-label="تنسيق النص">
          <button type="button" onClick={() => cmd("bold")} title="عريض" aria-label="عريض"><b>B</b></button>
          <button type="button" onClick={() => cmd("italic")} title="مائل" aria-label="مائل"><i>I</i></button>
          <button type="button" onClick={() => cmd("insertUnorderedList")} title="قائمة" aria-label="قائمة">• List</button>
          <button
            type="button"
            onClick={() => {
              const u = prompt("الرابط");
              if (u) cmd("createLink", u);
            }}
            title="إضافة رابط"
          >
            Link
          </button>
          <label className="editor-image" title="إضافة صورة">
            {uploading ? "..." : "Image"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && insertImage(e.target.files[0])}
            />
          </label>
          <button type="button" onClick={() => cmd("removeFormat")} title="إزالة التنسيق">Clear</button>
        </div>
      </div>

      <div className="editor-format-hint">
        <span><b>P</b> للنص العادي</span>
        <span><b>H1–H6</b> للعناوين</span>
        <span>يفضل استخدام H1 مرة واحدة فقط داخل المقال</span>
      </div>

      <div
        ref={ref}
        className="editor-canvas"
        contentEditable
        suppressContentEditableWarning
        onInput={syncHtml}
        data-placeholder="اكتب محتوى المقال هنا... حدد النص ثم اختر P أو H1–H6، وأضف لينكات وصور براحتك."
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
