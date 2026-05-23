"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface MobileNavProps {
  links: { href: string; label: string }[];
  resumeUrl: string | null;
}

export function MobileNav({ links, resumeUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="p-2">
        <Menu size={20} />
      </button>

      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <div
          className={clsx(
            "bg-background absolute top-0 right-0 h-full w-72 p-6 shadow-xl transition-transform",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="text-muted-foreground flex flex-col gap-4 text-sm font-medium">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-brand"
              >
                {link.label}
              </a>
            ))}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-foreground mt-2 rounded-md px-3 py-2 text-center text-white"
              >
                Resume ↗
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
