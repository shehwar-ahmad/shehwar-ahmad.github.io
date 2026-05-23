import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-line border-t">
      <Container className="text-subtle flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
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
