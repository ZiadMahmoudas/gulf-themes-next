"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RichEditorProps = {
  initial?: string | null;
  name?: string;
};

type BlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const BLOCKS: { label: string; value: BlockTag }[] = [
  { label: "P — فقرة عادية", value: "p" },
  { label: "H1 — عنوان رئيسي", value: "h1" },
  { label: "H2 — عنوان قسم", value: "h2" },
  { label: "H3 — عنوان فرعي", value: "h3" },
  { label: "H4 — عنوان مستوى 4", value: "h4" },
  { label: "H5 — عنوان مستوى 5", value: "h5" },
  { label: "H6 — عنوان مستوى 6", value: "h6" },
];

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

function safeFileBase(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9\u0600-\u06FF-_ ]/g, "")
    .trim()
    .slice(0, 90) || "article-image";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function RichEditor({ initial = "", name = "content_html" }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [html, setHtml] = useState(initial || "");
  const [activeBlock, setActiveBlock] = useState<BlockTag>("p");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== (initial || "")) editor.innerHTML = initial || "";
  }, [initial]);

  function syncHtml() {
    setHtml(editorRef.current?.innerHTML || "");
  }

  function rememberSelection() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) savedRangeRef.current = range.cloneRange();
  }

  function restoreSelection() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection) return;
    editor.focus();
    selection.removeAllRanges();
    if (savedRangeRef.current) {
      selection.addRange(savedRangeRef.current);
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.addRange(range);
  }

  function detectCurrentBlock() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection?.anchorNode || !editor.contains(selection.anchorNode)) return;
    let node: Node | null = selection.anchorNode;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    let element = node as HTMLElement | null;
    while (element && element !== editor) {
      const tag = element.tagName?.toLowerCase() as BlockTag | undefined;
      if (tag && ["p", "h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
        setActiveBlock(tag);
        return;
      }
      element = element.parentElement;
    }
    setActiveBlock("p");
  }

  function runCommand(command: string, value?: string) {
    restoreSelection();
    document.execCommand(command, false, value);
    rememberSelection();
    detectCurrentBlock();
    syncHtml();
  }

  function setBlock(tag: BlockTag) {
    restoreSelection();
    document.execCommand("formatBlock", false, tag);
    setActiveBlock(tag);
    rememberSelection();
    syncHtml();
  }

  function insertHtml(markup: string) {
    restoreSelection();
    document.execCommand("insertHTML", false, markup);
    rememberSelection();
    syncHtml();
  }

  async function insertImage(file: File) {
    setUploadError("");
    setUploadMessage("");

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("نوع الصورة غير مدعوم. استخدم JPG أو PNG أو WEBP أو GIF.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError("الصورة أكبر من 10MB. صغّرها ثم جرّب مرة أخرى.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) throw new Error("جلسة الأدمن غير متاحة. اعمل Refresh وسجّل الدخول مرة أخرى.");

      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `articles/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const { error: storageError } = await supabase.storage.from("media").upload(path, file, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });
      if (storageError) throw storageError;

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      if (!data.publicUrl) throw new Error("تم رفع الصورة لكن تعذر الحصول على رابطها العام.");

      const alt = escapeHtml(safeFileBase(file.name));
      insertHtml(`<figure class="article-media"><img src="${data.publicUrl}" alt="${alt}" loading="lazy"><figcaption>اكتب وصف الصورة هنا أو احذف هذا السطر.</figcaption></figure><p><br></p>`);
      setUploadMessage("تم رفع الصورة وإضافتها داخل المقال ✓");
    } catch (error: any) {
      const message = String(error?.message || "تعذر رفع الصورة");
      setUploadError(message.includes("row-level security") ? "Supabase رفض رفع الصورة بسبب سياسة Storage. تأكد من سياسة bucket باسم media ثم جرّب من جديد." : message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="editor-v23-shell">
      <div className="editor-v23-head">
        <div>
          <b>محتوى المقال</b>
          <span>اختار نوع السطر من القائمة: P للنص العادي، و H1–H6 للعناوين.</span>
        </div>
        <em>EDITOR V23</em>
      </div>

      <div className="editor-v23-toolbar" role="toolbar" aria-label="أدوات كتابة المقال">
        <label className="editor-v23-block-select">
          <span>نوع النص</span>
          <select
            value={activeBlock}
            onMouseDown={rememberSelection}
            onChange={(event) => setBlock(event.target.value as BlockTag)}
            aria-label="اختيار نوع النص"
          >
            {BLOCKS.map((block) => <option key={block.value} value={block.value}>{block.label}</option>)}
          </select>
        </label>

        <div className="editor-v23-actions">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("bold")} title="Bold"><b>B</b></button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("italic")} title="Italic"><i>I</i></button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("underline")} title="Underline"><u>U</u></button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertUnorderedList")} title="قائمة نقطية">• قائمة</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertOrderedList")} title="قائمة مرقمة">1. قائمة</button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = prompt("ضع الرابط كاملاً — مثال: https://example.com");
              if (url) runCommand("createLink", url);
            }}
          >رابط</button>
          <button
            type="button"
            className="editor-v23-image"
            disabled={uploading}
            onMouseDown={() => rememberSelection()}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "جاري رفع الصورة…" : "+ رفع صورة"}
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("undo")} title="تراجع">↶</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("redo")} title="إعادة">↷</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("removeFormat")}>مسح التنسيق</button>
        </div>

        <input
          ref={fileInputRef}
          className="editor-v23-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void insertImage(file);
          }}
        />
      </div>

      <div className="editor-v23-guide">
        <span><b>P</b> فقرة عادية</span>
        <span><b>H1</b> عنوان رئيسي</span>
        <span><b>H2</b> قسم رئيسي</span>
        <span><b>H3–H6</b> مستويات فرعية</span>
        <span><b>+ صورة</b> ترفع داخل نفس مكان المؤشر</span>
      </div>

      {(uploadMessage || uploadError) && (
        <div className={`editor-v23-status ${uploadError ? "is-error" : "is-success"}`} role="status">{uploadError || uploadMessage}</div>
      )}

      <div
        ref={editorRef}
        className="editor-v23-canvas"
        contentEditable
        suppressContentEditableWarning
        onInput={() => { syncHtml(); rememberSelection(); detectCurrentBlock(); }}
        onKeyUp={() => { rememberSelection(); detectCurrentBlock(); }}
        onMouseUp={() => { rememberSelection(); detectCurrentBlock(); }}
        onFocus={() => { rememberSelection(); detectCurrentBlock(); }}
        data-placeholder="ابدأ الكتابة هنا… اختار P أو H1–H6 من فوق، وارفع الصورة من زر + رفع صورة."
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
