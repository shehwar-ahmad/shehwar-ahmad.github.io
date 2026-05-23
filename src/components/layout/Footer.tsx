import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const FOOTER_LINKS = [
  { url: site.socials.github, label: "GitHub", platform: "github" },
  { url: site.socials.linkedin, label: "LinkedIn", platform: "linkedin" },
  { url: site.socials.medium, label: "Medium", platform: "medium" },
  { url: site.socials.stackoverflow, label: "Stack Overflow", platform: "stackoverflow" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-line border-t">
      <Container className="text-subtle flex flex-col items-center justify-between gap-3 pt-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] text-xs sm:flex-row sm:py-5">
        <div>
          © {year} {site.name}
        </div>
        <div className="flex gap-4">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand"
              data-track="outbound_click"
              data-track-category="social"
              data-track-platform={link.platform}
              data-track-source="footer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
