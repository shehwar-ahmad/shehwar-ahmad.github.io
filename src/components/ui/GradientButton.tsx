import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "gradient" | "outline" | "dark";

interface GradientButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function GradientButton({
  variant = "gradient",
  children,
  className,
  ...rest
}: GradientButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-shadow";
  const variants = {
    gradient:
      "bg-gradient-brand text-white shadow-[0_4px_12px_rgba(99,91,255,0.3)] hover:shadow-[0_6px_18px_rgba(99,91,255,0.4)]",
    outline: "bg-background text-foreground border border-line hover:border-brand",
    dark: "bg-foreground text-white hover:opacity-90",
  } as const;

  return (
    <a className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}
