import { Mail, ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub, SiMedium, SiStackoverflow } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import type { SiteConfig } from "@/lib/types";

interface HeroProps {
  site: SiteConfig;
}

export function Hero({ site }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(99,91,255,0.08), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(0,212,255,0.06), transparent)",
      }}
    >
      <Container className="py-14 sm:py-20">
        {site.available && (
          <div className="text-brand mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase">
            <span className="bg-success inline-block size-1.5 rounded-full" />
            Open to opportunities
          </div>
        )}

        <h1 className="max-w-[760px] text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
          Web developer
          <br />
          building <span className="text-gradient-brand">scalable applications.</span>
        </h1>

        <p className="text-muted-foreground mt-4 max-w-xl text-sm/relaxed sm:text-base">
          {site.bio}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <GradientButton variant="gradient" href={`mailto:${site.email}`}>
            Get in touch <ArrowRight size={16} />
          </GradientButton>

          {site.resumeUrl && (
            <GradientButton
              variant="outline"
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              View resume <ExternalLink size={14} />
            </GradientButton>
          )}

          <div className="text-muted-foreground ml-1 flex items-center gap-3">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-brand"
            >
              <SiGithub size={18} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
              className="hover:text-brand"
            >
              <SiMedium size={18} />
            </a>
            <a
              href={site.socials.stackoverflow}
              target="_blank"
              rel="noreferrer"
              aria-label="Stack Overflow"
              className="hover:text-brand"
            >
              <SiStackoverflow size={18} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-brand">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
