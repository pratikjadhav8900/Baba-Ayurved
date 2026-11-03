"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

type CommonProps = {
  variant?: Variant;
  /** "reversed" is for indigo surfaces (cream on indigo). */
  tone?: "default" | "reversed";
  size?: "sm" | "md" | "lg";
  /** Stretch to full width on mobile. */
  block?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-ui font-medium " +
  "transition-colors duration-(--duration-calm) ease-(--ease-calm) " +
  "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const solid = "min-h-11 rounded-sm px-6 border border-solid"; // 44px touch target

const variants: Record<Variant, Record<"default" | "reversed", string>> = {
  primary: {
    default:
      `${solid} border-indigo bg-indigo text-paper hover:bg-indigo-deep hover:border-indigo-deep ` +
      "focus-visible:ring-indigo-deep focus-visible:ring-offset-paper",
    reversed:
      `${solid} border-paper bg-paper text-indigo hover:bg-paper-deep hover:border-paper-deep ` +
      "focus-visible:ring-paper focus-visible:ring-offset-indigo",
  },
  secondary: {
    default:
      `${solid} border-indigo bg-transparent text-indigo hover:bg-indigo hover:text-paper ` +
      "focus-visible:ring-indigo focus-visible:ring-offset-paper",
    reversed:
      `${solid} border-paper bg-transparent text-paper hover:bg-paper hover:text-indigo ` +
      "focus-visible:ring-paper focus-visible:ring-offset-indigo",
  },
  text: {
    default:
      "min-h-11 w-fit text-indigo underline decoration-1 underline-offset-[0.35em] hover:decoration-2 " +
      "focus-visible:ring-indigo/60 focus-visible:ring-offset-paper",
    reversed:
      "min-h-11 w-fit text-paper underline decoration-1 underline-offset-[0.35em] hover:decoration-2 " +
      "focus-visible:ring-paper/60 focus-visible:ring-offset-indigo",
  },
};

const lg = "sm:min-h-12 sm:px-8";
const small = "min-h-10 px-5"; // compact, e.g. the desktop header (still >= 40px)

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

// Solid and outlined buttons get a subtle magnetic pull toward the cursor; text links stay put.
const MAGNETIC_STRENGTH = 0.25;
const MAGNETIC_MAX = 7; // px, kept small so it reads as tactile, not playful

const TRANSITION_TRACKING =
  "transform 150ms ease-out, background-color var(--duration-calm) var(--ease-calm), " +
  "border-color var(--duration-calm) var(--ease-calm), color var(--duration-calm) var(--ease-calm)";
const TRANSITION_SETTLING =
  "transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color var(--duration-calm) var(--ease-calm), " +
  "border-color var(--duration-calm) var(--ease-calm), color var(--duration-calm) var(--ease-calm)";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    tone = "default",
    size = "md",
    block = false,
    children,
    className,
    ...rest
  } = props;

  const elementRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

  const magnetic = variant !== "text";

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!magnetic || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = elementRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setIsSettling(false);
      setOffset({
        x: Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_STRENGTH)),
        y: Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_STRENGTH)),
      });
    },
    [magnetic],
  );

  const handleMouseLeave = useCallback(() => {
    setIsSettling(true);
    setOffset({ x: 0, y: 0 });
    setIsPressed(false);
  }, []);

  const press = useCallback(() => setIsPressed(true), []);
  const release = useCallback(() => setIsPressed(false), []);

  const interactionProps = magnetic
    ? {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: press,
        onMouseUp: release,
        onTouchStart: press,
        onTouchEnd: release,
        style: {
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${isPressed ? 0.95 : 1})`,
          transition: isSettling ? TRANSITION_SETTLING : TRANSITION_TRACKING,
          willChange: "transform",
        },
      }
    : {};

  const classes = cn(
    base,
    variants[variant][tone],
    size === "lg" && variant !== "text" && lg,
    size === "sm" && variant !== "text" && small,
    block && "w-full sm:w-auto",
    className,
  );

  const content = (
    <>
      {children}
      {variant === "text" && <ArrowRight aria-hidden size={16} strokeWidth={1.5} />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<AsLink, keyof CommonProps>;
    if (isInternal(href)) {
      return (
        <Link
          href={href}
          ref={elementRef as Ref<HTMLAnchorElement>}
          className={classes}
          {...interactionProps}
          {...anchorProps}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        ref={elementRef as Ref<HTMLAnchorElement>}
        className={classes}
        rel="noopener noreferrer"
        {...interactionProps}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<AsButton, keyof CommonProps>;
  return (
    <button
      type={type}
      ref={elementRef as Ref<HTMLButtonElement>}
      className={classes}
      {...interactionProps}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
