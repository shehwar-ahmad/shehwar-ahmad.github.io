import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { site } from "@/content/site";
import { NAV_LINKS } from "@/lib/nav";

const PILL_BASE =
  "border-line bg-white/90 shadow-[0_6px_30px_-10px_rgba(10,37,64,0.12)] backdrop-blur-md";

export function Navbar() {
  return (
    // Mobile: pill is sticky so the hamburger is always reachable.
    // Desktop (md+): header is static — logo + CTA scroll away with the page,
    // and the center NavPill (rendered separately, position: fixed) stays at
    // the top.
    <header className="sticky top-0 z-40 pt-3 md:static md:pt-4">
      <Container className="flex items-center justify-between gap-3">
        {/* Logo pill (left, desktop) */}
        <a
          href="#top"
          className={`${PILL_BASE} hidden items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 md:inline-flex`}
        >
          <span className="bg-gradient-brand flex size-7 items-center justify-center rounded-full text-sm font-bold text-white">
            S
          </span>
          <span className="text-foreground text-sm font-semibold">{site.shortName}</span>
        </a>

        {/* CTA pill (right, desktop) */}
        <a
          href={`mailto:${site.email}`}
          className="bg-gradient-brand hidden items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_-2px_rgba(99,91,255,0.4)] transition-shadow hover:shadow-[0_6px_18px_-2px_rgba(99,91,255,0.55)] md:inline-flex"
        >
          Talk →
        </a>

        {/* Mobile compact pill */}
        <div
          className={`${PILL_BASE} flex w-full items-center justify-between rounded-full border p-1.5 pl-3 md:hidden`}
        >
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
