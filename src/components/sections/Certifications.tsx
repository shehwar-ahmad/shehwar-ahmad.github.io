import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Certification } from "@/lib/types";

interface CertificationsProps {
  items: Certification[];
}

export function Certifications({ items }: CertificationsProps) {
  return (
    <section id="certifications" className="relative">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Certifications" title="Continuous learning" />

        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => (
            <li
              key={cert.title}
              className="border-line bg-background rounded-lg border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-6px_rgba(10,37,64,0.12)]"
            >
              <span className="bg-accent text-accent-foreground inline-block rounded-sm px-2 py-0.5 text-[10px] font-semibold">
                {cert.issuer}
              </span>
              <h3 className="text-foreground mt-2 text-sm/snug font-semibold">{cert.title}</h3>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="text-brand mt-2 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                data-track="outbound_click"
                data-track-category="certificate"
                data-track-name={cert.title}
                data-track-issuer={cert.issuer}
              >
                View certificate <ExternalLink size={11} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
