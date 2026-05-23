interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <header className="mb-6">
      <div className="text-brand mb-2 text-[11px] font-semibold tracking-[0.15em] uppercase">
        {eyebrow}
      </div>
      <h2 className="text-foreground text-2xl/tight font-bold sm:text-3xl">{title}</h2>
    </header>
  );
}
