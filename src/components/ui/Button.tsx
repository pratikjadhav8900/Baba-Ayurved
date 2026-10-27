import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
  "disabled:pointer-events-none disabled:opacity-50";

const solid = "min-h-11 rounded-sm px-6 border border-solid"; // 44px touch target

const variants: Record<Variant, Record<"default" | "reversed", string>> = {
  primary: {
    default: `${solid} border-indigo bg-indigo text-paper hover:bg-indigo-deep hover:border-indigo-deep`,
    reversed: `${solid} border-paper bg-paper text-indigo hover:bg-paper-deep hover:border-paper-deep`,
  },
  secondary: {
    default: `${solid} border-indigo bg-transparent text-indigo hover:bg-indigo hover:text-paper`,
    reversed: `${solid} border-paper bg-transparent text-paper hover:bg-paper hover:text-indigo`,
  },
  text: {
    default: "min-h-11 w-fit text-indigo underline decoration-1 underline-offset-[0.35em] hover:decoration-2",
    reversed: "min-h-11 w-fit text-paper underline decoration-1 underline-offset-[0.35em] hover:decoration-2",
  },
};

const lg = "sm:min-h-12 sm:px-8";
const small = "min-h-10 px-5"; // compact, e.g. the desktop header (still >= 40px)

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

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
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} rel="noopener noreferrer" {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<AsButton, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
