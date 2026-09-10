"use client";
import { useState } from "react";
export function SlugInput({ initial="" }: { initial?: string }) { const [v,setV]=useState(initial); return <label className="admin-field"><span>الرابط (Slug)</span><div className="slug-field"><code>/</code><input name="slug" value={v} onChange={e=>setV(e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-_]/g,""))} placeholder="article-slug" required dir="ltr"/></div></label> }
