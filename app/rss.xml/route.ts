import { getPublishedArticles } from "@/lib/public-data";
import { site } from "@/lib/site";

const esc=(s:string)=>s.replace(/[<>&'\"]/g,(c)=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]||c));
export async function GET(){const posts=await getPublishedArticles();const items=posts.map(p=>`<item><title>${esc(p.title)}</title><link>${site.url}/blog/${p.slug}</link><guid>${site.url}/blog/${p.slug}</guid><description>${esc(p.excerpt)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`).join("");const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${site.url}</link><description>${esc(site.description)}</description><language>ar</language>${items}</channel></rss>`;return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"s-maxage=3600, stale-while-revalidate=86400"}})}
