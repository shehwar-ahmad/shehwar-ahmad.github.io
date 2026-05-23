import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full max-w-[980px] px-6", className)} {...rest}>
      {children}
    </div>
  );
}
