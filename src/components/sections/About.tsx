import * as Si from "react-icons/si";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import type { Skill } from "@/lib/types";

interface AboutProps {
  skills: Skill[];
}

function iconFor(key: string): IconType | null {
  const name = "Si" + key.charAt(0).toUpperCase() + key.slice(1);
  return (Si as unknown as Record<string, IconType>)[name] ?? null;
}

export function About({ skills }: AboutProps) {
  return (
    <section id="about" className="relative">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="About" title="Transforming coffee into code." />

        <p className="text-muted-foreground mt-3 max-w-2xl text-sm/relaxed sm:text-base">
          From interactive interfaces to robust backends, I build apps that scale, integrate
          cleanly, and stay maintainable. Below is the stack I reach for most.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => {
            const Icon = iconFor(skill.iconKey);
            return (
              <TechTag key={skill.name} variant="outline" icon={Icon ? <Icon size={12} /> : null}>
                {skill.name}
              </TechTag>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
