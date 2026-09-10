import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  admin?: boolean;
  priority?: boolean;
};

export function Brand({ admin = false, priority = false }: BrandProps) {
  return (
    <Link
      href={admin ? "/admin" : "/"}
      className={`arabdev-brand ${admin ? "admin-brand" : ""}`}
      aria-label="ArabDEV"
    >
      <Image
        src="/brand/arabdev-logo.png"
        width={300}
        height={110}
        alt="ArabDEV"
        priority={priority}
        sizes="(max-width: 640px) 138px, (max-width: 900px) 150px, 205px"
        className="arabdev-logo"
      />
    </Link>
  );
}
