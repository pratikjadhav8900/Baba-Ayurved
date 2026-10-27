"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/lib/site";
import { site } from "@/lib/site";

const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * Full-height menu for small screens. Behaviour:
 * - Opens a sheet under the header; the toggle shows a text label, not just an icon.
 * - Focus moves to the first link on open and returns to the toggle on Escape.
 * - Tab and Shift+Tab are kept inside the toggle and the sheet while it is open.
 * - Closes on Escape, on choosing a link, and when the viewport grows to the desktop layout.
 * - Page scroll is locked while open.
 * Hidden from md upwards, where the server-rendered desktop navigation is used.
 */
export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      const inside = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      const stops = [buttonRef.current, ...inside].filter((el): el is HTMLElement => el !== null);
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!stops.includes(active as HTMLElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const regular = items.filter((item) => !item.emphasis);
  const emphasised = items.filter((item) => item.emphasis);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close(false) : setOpen(true))}
        className="group -mr-3 inline-flex min-h-11 items-center gap-3 px-3 font-sans text-ui font-medium text-ink"
      >
        <span>{open ? "Close" : "Menu"}</span>
        {/* Two-line icon drawn in CSS: it morphs into a cross while open. */}
        <span aria-hidden className="relative block h-[11px] w-5">
          <span className="absolute left-0 top-0 h-px w-full bg-current transition-transform duration-(--duration-calm) ease-(--ease-calm) group-aria-expanded:translate-y-[5px] group-aria-expanded:rotate-45" />
          <span className="absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-(--duration-calm) ease-(--ease-calm) group-aria-expanded:-translate-y-[5px] group-aria-expanded:-rotate-45" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <m.nav
            ref={panelRef}
            id={panelId}
            aria-label="Primary"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-header z-30 flex flex-col overflow-y-auto bg-paper"
          >
            <ul className="flex flex-col px-gutter pt-2">
              {regular.map((item) => (
                <li key={item.href} className="border-b border-solid border-line">
                  <Link
                    href={item.href}
                    onClick={() => close(false)}
                    className="flex min-h-[4.5rem] items-center font-serif text-statement"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-6 px-gutter pb-8 pt-8">
              {emphasised.map((item) => (
                <Button key={item.href} href={item.href} size="lg" block onClick={() => close(false)}>
                  {item.label}
                </Button>
              ))}
              <p className="font-sans text-value text-mute-strong">
                {site.name} &middot; Since {site.foundedYear}
              </p>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
