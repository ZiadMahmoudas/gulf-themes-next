import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteEffects } from "@/components/SiteEffects";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <><SiteEffects /><Header /><main>{children}</main><Footer /></>;
}
