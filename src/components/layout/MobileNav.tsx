"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface MobileNavProps {
  links: { href: string; label: string }[];
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
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div
        className={clsx(
          "absolute top-0 right-0 h-full w-72 bg-white p-6 shadow-2xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-foreground font-semibold">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="hover:bg-muted rounded-md p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="text-muted-foreground flex flex-col gap-1 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-foreground hover:bg-muted rounded-md px-3 py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="bg-foreground mt-3 rounded-md px-3 py-2 text-center text-white hover:opacity-90"
            >
              Resume ↗
            </a>
          )}
        </nav>
      </div>
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
