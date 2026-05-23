import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import type { SiteConfig } from "@/lib/types";

interface ContactProps {
  site: SiteConfig;
}

export function Contact({ site }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,91,255,0.06), transparent)",
      }}
    >
      <Container className="py-16 text-center sm:py-20">
        <div className="text-brand mb-2 text-[11px] font-semibold tracking-[0.15em] uppercase">
          Contact
        </div>
        <h2 className="text-foreground text-2xl/tight font-extrabold tracking-[-0.02em] sm:text-3xl">
          Let&rsquo;s build something <span className="text-gradient-brand">together.</span>
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm">
          Discuss a project or just want to say hi? My inbox is open.
        </p>
        <div className="mt-5">
          <GradientButton variant="gradient" href={`mailto:${site.email}`}>
            {site.email}
          </GradientButton>
        </div>
      </Container>
    </section>
  );
}
