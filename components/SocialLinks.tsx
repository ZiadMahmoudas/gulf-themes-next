import { site } from "@/lib/site";
import type { SiteSocialLinks, SocialKey } from "@/lib/site-settings";

type Props = {
  compact?: boolean;
  dark?: boolean;
  showLabel?: boolean;
  socials?: SiteSocialLinks;
};

const labels: Record<SocialKey, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X / Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  github: "GitHub",
};

const order: SocialKey[] = [
  "facebook",
  "instagram",
  "linkedin",
  "x",
  "tiktok",
  "youtube",
  "telegram",
  "whatsapp",
  "github",
];

function SocialIcon({ name }: { name: SocialKey }) {
  if (name === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.438H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.968H15.83c-1.491 0-1.956.93-1.956 1.884v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.098 24 12.073Z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 0h9.6C20.775 0 24 3.225 24 7.2v9.6c0 3.975-3.225 7.2-7.2 7.2H7.2C3.225 24 0 20.775 0 16.8V7.2C0 3.225 3.225 0 7.2 0Zm-.245 2.4A4.56 4.56 0 0 0 2.4 6.955v10.09A4.56 4.56 0 0 0 6.955 21.6h10.09a4.56 4.56 0 0 0 4.555-4.555V6.955A4.56 4.56 0 0 0 17.045 2.4H6.955ZM18.3 4.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 5.4A6.6 6.6 0 1 1 12 18.6 6.6 6.6 0 0 1 12 5.4Zm0 2.4a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z" /></svg>;
  if (name === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.356V8.999h3.414v1.564h.048c.475-.9 1.637-1.85 3.37-1.85 3.602 0 4.266 2.37 4.266 5.455v6.284ZM5.337 7.433A2.064 2.064 0 1 1 5.337 3.3a2.064 2.064 0 0 1 0 4.133ZM7.119 20.452H3.555V8.999H7.12v11.453ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" /></svg>;
  if (name === "x") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
  if (name === "tiktok") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2c.3 2.4 1.7 3.9 4.1 4.1v3.1a8.2 8.2 0 0 1-4.1-1v6.1a7.1 7.1 0 1 1-6.1-7V10a4 4 0 1 0 2.9 3.8V2h3.2Z" /></svg>;
  if (name === "youtube") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>;
  if (name === "telegram") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 3.5 20 20c-.3 1.2-1 1.5-2 1l-5.4-4-2.6 2.5c-.3.3-.5.5-1 .5l.4-5.5L19.5 5.4c.4-.4-.1-.6-.7-.2L6.3 13.1.9 11.4c-1.2-.4-1.2-1.2.2-1.8L22 1.5c1-.4 1.9.2 1.5 2Z" /></svg>;
  if (name === "whatsapp") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.8L.3 23.7l6-1.6A11.8 11.8 0 0 0 23.9 12c0-3.2-1.2-6.2-3.4-8.5ZM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.8 9.8 0 1 1 12 21.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6l-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg>;
  if (name === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.5v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.8 11.8 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.8 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.5 11.5 0 0 0 12 .7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.7 2H6.3A4.3 4.3 0 0 0 2 6.3v11.4A4.3 4.3 0 0 0 6.3 22h11.4a4.3 4.3 0 0 0 4.3-4.3V6.3A4.3 4.3 0 0 0 17.7 2ZM9.4 17.4H6.6V9h2.8v8.4ZM8 7.9A1.6 1.6 0 1 1 8 4.7a1.6 1.6 0 0 1 0 3.2Zm9.6 9.5h-2.8v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.2v4.1H9V9h2.7v1.1c.4-.7 1.3-1.4 2.7-1.4 2.9 0 3.4 1.9 3.4 4.4v4.3Z" /></svg>;
}

export function SocialLinks({ compact = false, dark = false, showLabel = false, socials }: Props) {
  const source: SiteSocialLinks = socials || {
    facebook: site.socials.facebook,
    instagram: site.socials.instagram,
    linkedin: site.socials.linkedin,
    whatsapp: site.whatsapp,
  };

  const items = order
    .map((name) => ({ name, label: labels[name], href: String(source[name] || "").trim() }))
    .filter((item) => item.href);

  return (
    <div className={`social-links ${compact ? "is-compact" : ""} ${dark ? "is-dark" : ""}`}>
      {items.map((item) => {
        let href = item.href;
        if (item.name === "whatsapp" && !/^https?:\/\//i.test(item.href)) {
          let number = item.href.replace(/\D+/g, "");
          if (number.startsWith("00")) number = number.slice(2);
          if (/^01\d{9}$/.test(number)) number = `20${number.slice(1)}`;
          href = `https://wa.me/${number}`;
        }
        return (
          <a key={item.name} href={href} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>
            <span className="social-icon"><SocialIcon name={item.name} /></span>
            {showLabel && <span>{item.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
