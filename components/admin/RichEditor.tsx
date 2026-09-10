"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function RichEditor({ initial = "", name = "content_html" }: { initial?: string | null; name?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [html, setHtml] = useState(initial || ""); const [uploading, setUploading] = useState(false);
  useEffect(()=>{ if (ref.current && ref.current.innerHTML !== (initial || "")) ref.current.innerHTML = initial || ""; }, [initial]);
  function cmd(command: string, value?: string) { document.execCommand(command, false, value); ref.current?.focus(); setHtml(ref.current?.innerHTML || ""); }
  async function insertImage(file: File) {
    setUploading(true);
    try {
      const supabase=createClient(); const ext=file.name.split(".").pop()||"jpg"; const path=`articles/${crypto.randomUUID()}.${ext}`;
      const { error }=await supabase.storage.from("media").upload(path,file,{contentType:file.type}); if(error) throw error;
      const { data }=supabase.storage.from("media").getPublicUrl(path); cmd("insertImage",data.publicUrl);
    } finally { setUploading(false); }
  }
  return <div className="rich-editor"><div className="editor-toolbar"><button type="button" onClick={()=>cmd("formatBlock","h2")}>H2</button><button type="button" onClick={()=>cmd("formatBlock","h3")}>H3</button><button type="button" onClick={()=>cmd("bold")}><b>B</b></button><button type="button" onClick={()=>cmd("italic")}><i>I</i></button><button type="button" onClick={()=>cmd("insertUnorderedList")}>• List</button><button type="button" onClick={()=>{const u=prompt("الرابط"); if(u)cmd("createLink",u)}}>Link</button><label className="editor-image">{uploading?"...":"Image"}<input type="file" accept="image/*" disabled={uploading} onChange={e=>e.target.files?.[0]&&insertImage(e.target.files[0])}/></label><button type="button" onClick={()=>cmd("removeFormat")}>Clear</button></div><div ref={ref} className="editor-canvas" contentEditable suppressContentEditableWarning onInput={()=>setHtml(ref.current?.innerHTML||"")} data-placeholder="اكتب محتوى المقال هنا... تقدر تضيف عناوين، لينكات وصور داخل المقال."/><input type="hidden" name={name} value={html}/></div>;
}
