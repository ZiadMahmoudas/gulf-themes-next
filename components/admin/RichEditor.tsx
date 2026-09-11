"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RichEditorProps = {
  initial?: string | null;
  name?: string;
};

type BlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const BLOCKS: { label: string; value: BlockTag; title: string }[] = [
  { label: "P", value: "p", title: "فقرة عادية" },
  { label: "H1", value: "h1", title: "عنوان رئيسي H1" },
  { label: "H2", value: "h2", title: "عنوان قسم H2" },
  { label: "H3", value: "h3", title: "عنوان فرعي H3" },
  { label: "H4", value: "h4", title: "عنوان H4" },
  { label: "H5", value: "h5", title: "عنوان H5" },
  { label: "H6", value: "h6", title: "عنوان H6" },
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
    if (editor && editor.innerHTML !== (initial || "")) {
      editor.innerHTML = initial || "";
    }
  }, [initial]);

  function syncHtml() {
    setHtml(editorRef.current?.innerHTML || "");
  }

  function rememberSelection() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
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
    document.execCommand("formatBlock", false, `<${tag}>`);
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
      setUploadError("حجم الصورة أكبر من 10MB. صغّر الصورة ثم جرّب مرة أخرى.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        throw new Error("جلسة الأدمن غير متاحة. اعمل Refresh وسجّل الدخول مرة أخرى.");
      }

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
      insertHtml(
        `<figure class="article-media"><img src="${data.publicUrl}" alt="${alt}" loading="lazy"><figcaption>اكتب وصف الصورة هنا أو احذف هذا السطر.</figcaption></figure><p><br></p>`,
      );
      setUploadMessage("تم رفع الصورة وإضافتها داخل المقال ✓");
    } catch (error: any) {
      const message = String(error?.message || "تعذر رفع الصورة");
      setUploadError(
        message.includes("row-level security")
          ? "Supabase رفض الرفع بسبب صلاحيات Storage. شغّل schema.sql / سياسة media ثم سجّل الدخول من جديد."
          : message,
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="rich-editor rich-editor-v22">
      <div className="editor-v22-topline">
        <div>
          <strong>محرر المقال</strong>
          <span>اختار نوع السطر أولاً ثم اكتب — P للنص و H1–H6 للعناوين.</span>
        </div>
        <small>EDITOR V22</small>
      </div>

      <div className="editor-toolbar-v22" role="toolbar" aria-label="أدوات تنسيق المقال">
        <div className="editor-block-row-v22" aria-label="نوع النص">
          {BLOCKS.map((block) => (
            <button
              key={block.value}
              type="button"
              className={activeBlock === block.value ? "is-active" : undefined}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setBlock(block.value)}
              title={block.title}
              aria-label={block.title}
              aria-pressed={activeBlock === block.value}
            >
              {block.label}
            </button>
          ))}
        </div>

        <div className="editor-tools-row-v22" aria-label="تنسيق النص">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("bold")} title="عريض"><b>B</b></button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("italic")} title="مائل"><i>I</i></button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertUnorderedList")} title="قائمة نقطية">• قائمة</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertOrderedList")} title="قائمة مرقمة">1. قائمة</button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = prompt("ضع الرابط كاملاً — مثال: https://example.com");
              if (url) runCommand("createLink", url);
            }}
          >
            رابط
          </button>
          <button
            type="button"
            className="editor-image-button-v22"
            disabled={uploading}
            onPointerDown={rememberSelection}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "جاري الرفع…" : "+ صورة"}
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("undo")} title="تراجع">↶</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("redo")} title="إعادة">↷</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("removeFormat")} title="إزالة تنسيق النص">مسح التنسيق</button>
          <input
            ref={fileInputRef}
            className="editor-hidden-file-v22"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void insertImage(file);
            }}
          />
        </div>
      </div>

      {(uploadMessage || uploadError) ? (
        <div className={`editor-upload-status-v22 ${uploadError ? "is-error" : "is-success"}`} role="status">
          {uploadError || uploadMessage}
        </div>
      ) : null}

      <div
        ref={editorRef}
        className="editor-canvas editor-canvas-v22"
        contentEditable
        suppressContentEditableWarning
        onInput={() => { syncHtml(); rememberSelection(); detectCurrentBlock(); }}
        onKeyUp={() => { rememberSelection(); detectCurrentBlock(); }}
        onMouseUp={() => { rememberSelection(); detectCurrentBlock(); }}
        onFocus={() => { rememberSelection(); detectCurrentBlock(); }}
        data-placeholder="ابدأ الكتابة هنا… استخدم P للنص العادي و H2/H3 للأقسام، وارفع الصور من زر + صورة."
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
