import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-line border-t">
      <Container className="text-subtle flex flex-col items-center justify-between gap-3 pt-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] text-xs sm:flex-row sm:py-5">
        <div>
          © {year} {site.name}
        </div>
        <div className="flex gap-4">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            GitHub
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            LinkedIn
          </a>
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            Medium
          </a>
          <a
            href={site.socials.stackoverflow}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            Stack Overflow
          </a>
        </div>
      </Container>
    </footer>
  );
}
