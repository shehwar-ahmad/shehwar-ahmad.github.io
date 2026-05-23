import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import { TimelineDot } from "@/components/ui/TimelineDot";
import type { Experience } from "@/lib/types";

interface ExperienceProps {
  experiences: Experience[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="work" className="bg-background">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Experience" title="Where I've worked" />

        <ol className="relative mt-4 pl-5">
          <span
            aria-hidden
            className="absolute inset-y-2 left-0 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, var(--color-brand), var(--color-brand-2), var(--color-line))",
            }}
          />
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${i}`} className="relative mb-6 last:mb-0">
              <TimelineDot active={i === 0} />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-foreground text-sm font-bold sm:text-base">
                  {exp.role} ·{" "}
                  {i === 0 ? (
                    <span className="text-gradient-brand">{exp.company}</span>
                  ) : (
                    <span className="text-brand">{exp.company}</span>
                  )}
                </h3>
                <span className="text-subtle text-xs font-medium">
                  {exp.start} — {exp.end}
                </span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <TechTag key={tech} variant="subtle">
                    {tech}
                  </TechTag>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
