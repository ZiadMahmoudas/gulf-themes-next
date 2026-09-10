import { site } from "@/lib/site";

type SocialName = "facebook" | "instagram" | "linkedin";

type Props = {
  compact?: boolean;
  dark?: boolean;
  showLabel?: boolean;
};

const items: { name: SocialName; label: string; href: string }[] = [
  { name: "facebook", label: "Facebook", href: site.socials.facebook },
  { name: "instagram", label: "Instagram", href: site.socials.instagram },
  { name: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
];

function SocialIcon({ name }: { name: SocialName }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.438H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.968H15.83c-1.491 0-1.956.93-1.956 1.884v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.098 24 12.073Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.2 0h9.6C20.775 0 24 3.225 24 7.2v9.6c0 3.975-3.225 7.2-7.2 7.2H7.2C3.225 24 0 20.775 0 16.8V7.2C0 3.225 3.225 0 7.2 0Zm-.245 2.4A4.56 4.56 0 0 0 2.4 6.955v10.09A4.56 4.56 0 0 0 6.955 21.6h10.09a4.56 4.56 0 0 0 4.555-4.555V6.955A4.56 4.56 0 0 0 17.045 2.4H6.955ZM18.3 4.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 5.4A6.6 6.6 0 1 1 12 18.6 6.6 6.6 0 0 1 12 5.4Zm0 2.4a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.356V8.999h3.414v1.564h.048c.475-.9 1.637-1.85 3.37-1.85 3.602 0 4.266 2.37 4.266 5.455v6.284ZM5.337 7.433A2.064 2.064 0 1 1 5.337 3.3a2.064 2.064 0 0 1 0 4.133ZM7.119 20.452H3.555V8.999H7.12v11.453ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

export function SocialLinks({ compact = false, dark = false, showLabel = false }: Props) {
  return (
    <div className={`social-links ${compact ? "is-compact" : ""} ${dark ? "is-dark" : ""}`}>
      {items.map((item) => (
        <a key={item.name} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
          <span className="social-icon"><SocialIcon name={item.name} /></span>
          {showLabel && <span>{item.label}</span>}
        </a>
      ))}
    </div>
  );
}
