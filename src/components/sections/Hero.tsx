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
    <section className="relative">
      <Container className="py-14 sm:py-20">
        {site.available && (
          <div className="text-brand animate-fade-up mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase">
            <span className="bg-success animate-pulse-soft inline-block size-1.5 rounded-full" />
            Open to opportunities
          </div>
        )}

        <h1 className="animate-fade-up max-w-190 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] [animation-delay:60ms] sm:text-5xl">
          Web developer
          <br />
          building{" "}
          <span className="text-gradient-brand animate-gradient-flow">scalable applications.</span>
        </h1>

        <p className="text-muted-foreground animate-fade-up mt-4 max-w-xl text-sm/relaxed [animation-delay:120ms] sm:text-base">
          {site.bio}
        </p>

        <div className="animate-fade-up mt-6 flex flex-wrap items-center gap-3 [animation-delay:180ms]">
          <GradientButton
            variant="gradient"
            href={`mailto:${site.email}`}
            data-track="contact_click"
            data-track-source="hero_cta"
          >
            Get in touch <ArrowRight size={16} />
          </GradientButton>

          {site.resumeUrl && (
            <GradientButton
              variant="outline"
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-track="resume_click"
              data-track-source="hero"
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
              data-track="outbound_click"
              data-track-category="social"
              data-track-platform="github"
            >
              <SiGithub size={18} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand"
              data-track="outbound_click"
              data-track-category="social"
              data-track-platform="linkedin"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
              className="hover:text-brand"
              data-track="outbound_click"
              data-track-category="social"
              data-track-platform="medium"
            >
              <SiMedium size={18} />
            </a>
            <a
              href={site.socials.stackoverflow}
              target="_blank"
              rel="noreferrer"
              aria-label="Stack Overflow"
              className="hover:text-brand"
              data-track="outbound_click"
              data-track-category="social"
              data-track-platform="stackoverflow"
            >
              <SiStackoverflow size={18} />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="hover:text-brand"
              data-track="contact_click"
              data-track-source="hero_icon"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
