"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Global analytics listener mounted once in the root layout.
 *
 * Two responsibilities:
 *
 * 1. **Delegated click events.** Listens at the document root for clicks on
 *    any element carrying `data-track="event_name"`. Every other `data-track-*`
 *    attribute on the same element becomes an event parameter (kebab → snake).
 *    This keeps section components as Server Components — they only need to
 *    sprinkle data attributes, no `"use client"` required.
 *
 * 2. **Section view tracking.** Uses IntersectionObserver to fire a
 *    `section_view` event once per section per session when the section
 *    crosses into the middle band of the viewport. Cheap (no scroll handler),
 *    runs only on the client.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const eventName = target.dataset.track;
      if (!eventName) return;

      const params: Record<string, string> = {};
      for (const attr of Array.from(target.attributes)) {
        if (attr.name === "data-track" || !attr.name.startsWith("data-track-")) continue;
        const key = attr.name.slice("data-track-".length).replace(/-/g, "_");
        params[key] = attr.value;
      }

      sendGAEvent("event", eventName, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "about",
      "work",
      "projects",
      "certifications",
      "education",
      "contact",
    ] as const;

    const seen = new Set<string>();
    // Use rootMargin to define a viewport "middle band" (top 40% + bottom 40%
    // cropped). A section counts as viewed when any part of it enters this
    // band. This is robust to sections taller than the viewport — where
    // intersectionRatio caps below 1.0 and a fixed ratio threshold could
    // never fire.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (seen.has(id)) continue;
          seen.add(id);
          sendGAEvent("event", "section_view", { section: id });
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
