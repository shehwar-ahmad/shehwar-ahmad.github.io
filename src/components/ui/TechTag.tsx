import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "outline" | "subtle";

interface TechTagProps {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
}

export function TechTag({ children, variant = "outline", icon }: TechTagProps) {
  const base = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium";
  const variants = {
    outline: "bg-background text-foreground border border-line",
    subtle: "bg-accent text-accent-foreground",
  } as const;

  return (
    <span className={clsx(base, variants[variant])}>
      {icon && <span className="text-brand">{icon}</span>}
      {children}
    </span>
  );
}
