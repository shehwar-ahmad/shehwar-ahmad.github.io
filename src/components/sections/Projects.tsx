import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="border-line bg-muted border-y">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Projects" title="Selected work" />

        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.name}
              className="border-line bg-background overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="bg-gradient-brand relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
                  className="object-cover opacity-95"
                />
              </div>
              <div className="p-4">
                <h3 className="text-foreground text-sm font-bold sm:text-base">{project.name}</h3>
                <p className="text-muted-foreground mt-1 text-xs/relaxed sm:text-sm">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline sm:text-sm"
                >
                  Visit website <ExternalLink size={12} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
