import type { NavLink } from "@/lib/nav";

interface NavPillProps {
  links: NavLink[];
}

/**
 * Fixed center nav pill. Stays anchored at the top of the viewport while the
 * rest of the page (and the header's logo/CTA) scrolls. Server component —
 * hover states only, no active tracking.
 */
export function NavPill({ links }: NavPillProps) {
  return (
    <nav
      aria-label="Primary"
      className="border-line text-muted-foreground fixed top-3 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border bg-white/90 p-1 text-sm font-medium shadow-[0_6px_30px_-10px_rgba(10,37,64,0.12)] backdrop-blur-md sm:top-4 md:flex"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hover:text-foreground hover:bg-muted block rounded-full px-3.5 py-1.5 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
