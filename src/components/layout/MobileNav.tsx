"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Mail, Menu, X } from "lucide-react";
import { SiGithub, SiMedium, SiStackoverflow } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import clsx from "clsx";
import { site } from "@/content/site";
import type { NavLink } from "@/lib/nav";

interface MobileNavProps {
  links: NavLink[];
  resumeUrl: string | null;
}

// Returns `false` during SSR/pre-render, `true` after hydration. Used to gate
// the portal until `document.body` exists.
const noopSubscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

export function MobileNav({ links, resumeUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const drawer = (
    <div
      className={clsx(
        "fixed inset-0 z-100 transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside
        className={clsx(
          "absolute top-0 right-0 flex h-full w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 40% at 50% 0%, rgba(99,91,255,0.08), transparent 70%), radial-gradient(ellipse 80% 30% at 50% 100%, rgba(0,212,255,0.06), transparent 70%)",
        }}
      >
        {/* Header */}
        <header className="border-line flex items-center justify-between border-b px-5 py-4">
          <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-full text-base font-bold text-white shadow-[0_4px_12px_-2px_rgba(99,91,255,0.4)]">
              S
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-foreground text-sm font-semibold">{site.name}</span>
              <span className="text-subtle text-[10px] tracking-wide uppercase">Web developer</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-5 text-sm font-medium">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group text-muted-foreground hover:text-foreground hover:bg-muted relative flex items-center gap-3 rounded-xl p-3 transition-colors"
            >
              <span className="text-brand font-mono text-[10px] tabular-nums">0{i + 1}</span>
              <span className="flex-1">{link.label}</span>
              <span aria-hidden className="text-subtle group-hover:text-brand transition-colors">
                →
              </span>
            </a>
          ))}

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="bg-foreground hover:bg-gradient-brand mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all"
            >
              Resume ↗
            </a>
          )}

          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="bg-gradient-brand mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_-2px_rgba(99,91,255,0.4)]"
          >
            <Mail size={14} /> Get in touch
          </a>
        </nav>

        {/* Footer / socials */}
        <footer className="border-line text-muted-foreground border-t px-5 pt-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <div className="text-subtle mb-2 text-[10px] font-semibold tracking-widest uppercase">
            Find me on
          </div>
          <div className="flex items-center gap-1">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-brand hover:bg-muted rounded-full p-2.5 transition-colors"
            >
              <SiGithub size={16} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand hover:bg-muted rounded-full p-2.5 transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
              className="hover:text-brand hover:bg-muted rounded-full p-2.5 transition-colors"
            >
              <SiMedium size={16} />
            </a>
            <a
              href={site.socials.stackoverflow}
              target="_blank"
              rel="noreferrer"
              aria-label="Stack Overflow"
              className="hover:text-brand hover:bg-muted rounded-full p-2.5 transition-colors"
            >
              <SiStackoverflow size={16} />
            </a>
          </div>
        </footer>
      </aside>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="hover:bg-muted rounded-full p-2 transition-colors"
      >
        <Menu size={20} />
      </button>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
