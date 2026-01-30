import Link from "next/link";

type LogoProps = {
  size?: "sm" | "lg";
  href?: string;
};

export function Logo({ size = "lg", href }: LogoProps) {
  const logo = (
    <span className={`logo logo-${size} text-theme-accent`}> Solview</span>
  );

  return href ? <Link href={href}>{logo}</Link> : logo;
}
