import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { site } from "@/content/site";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      <Container className="flex justify-center">
        {/* All-in-one pill (desktop) */}
        <nav
          aria-label="Primary"
          className="border-line hidden items-center gap-1 rounded-full border bg-white/90 p-1.5 shadow-[0_6px_30px_-10px_rgba(10,37,64,0.12)] backdrop-blur-md md:flex"
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 pr-3 pl-1.5">
            <span className="bg-gradient-brand flex size-7 items-center justify-center rounded-full text-sm font-bold text-white">
              S
            </span>
            <span className="text-foreground text-sm font-semibold">{site.shortName}</span>
          </a>

          {/* Divider */}
          <span aria-hidden className="bg-line mx-3 h-5 w-px lg:mx-4" />

          {/* Nav links */}
          <ul className="text-muted-foreground flex items-center gap-0.5 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-foreground hover:bg-muted block rounded-full px-3.5 py-1.5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <span aria-hidden className="bg-line mx-3 h-5 w-px lg:mx-4" />

          {/* CTA */}
          <a
            href={`mailto:${site.email}`}
            className="bg-gradient-brand inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_-2px_rgba(99,91,255,0.4)] transition-shadow hover:shadow-[0_6px_18px_-2px_rgba(99,91,255,0.55)]"
          >
            Talk →
          </a>
        </nav>

        {/* Mobile: compact pill with just logo + hamburger */}
        <div className="border-line flex w-full items-center justify-between rounded-full border bg-white/90 p-1.5 pl-3 shadow-[0_6px_30px_-10px_rgba(10,37,64,0.12)] backdrop-blur-md md:hidden">
          <a href="#top" className="flex items-center gap-2">
            <span className="bg-gradient-brand flex size-7 items-center justify-center rounded-full text-sm font-bold text-white">
              S
            </span>
            <span className="text-foreground text-sm font-semibold">{site.shortName}</span>
          </a>
          <MobileNav links={NAV_LINKS} resumeUrl={site.resumeUrl} />
        </div>
      </Container>
    </header>
  );
}
