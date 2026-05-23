import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Education } from "@/lib/types";

interface EducationProps {
  items: Education[];
}

export function Education({ items }: EducationProps) {
  return (
    <section id="education" className="border-line bg-muted border-y">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Education" title="Academic background" />

        <ul className="mt-4 space-y-3">
          {items.map((edu) => (
            <li
              key={edu.school}
              className="border-line bg-background flex items-start gap-4 rounded-xl border p-4"
            >
              <div className="bg-gradient-brand relative size-10 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={edu.logo}
                  alt={`${edu.school} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-foreground text-sm font-bold sm:text-base">{edu.school}</h3>
                  <span className="text-subtle text-xs">
                    {edu.start} — {edu.end}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {edu.degree}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="text-muted-foreground mt-2 space-y-1 text-xs sm:text-sm">
                    {edu.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-brand">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
