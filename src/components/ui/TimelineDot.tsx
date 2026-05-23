import clsx from "clsx";

interface TimelineDotProps {
  active?: boolean;
}

export function TimelineDot({ active = false }: TimelineDotProps) {
  return (
    <span
      className={clsx(
        "absolute top-1 left-[-26px] block size-2.5 rounded-full border-2",
        active
          ? "bg-gradient-brand border-white shadow-[0_0_0_1px_var(--color-brand)]"
          : "bg-background border-brand"
      )}
      aria-hidden
    />
  );
}
