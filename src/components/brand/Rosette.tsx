import type { CSSProperties } from "react";

/**
 * Seven-circle rosette (brand brief §3.1): six circles on a hexagonal grid
 * around a seventh, with a solid centre point. Constructed from a single
 * unit radius (R = 10 in a 42-unit viewBox), so it scales and reproduces in
 * one colour.
 *
 * Variants follow the brief's small-size ladder (§3.3). The mark simplifies as
 * it shrinks; it never just scales down:
 *
 *   >= 32px  full        7 stroked circles + centre dot
 *   20-32px  petal       filled petals, knocked-out centre
 *   14-20px  silhouette  solid petal silhouette, no centre cut
 *   <  14px  hexagon     rounded hexagon (the mark's own bounding geometry)
 *
 * `variant="auto"` (default) picks from `size`. Pass an explicit variant only
 * for specimens or print exports. Everything is drawn with `currentColor`
 * unless `color` is set, so it works in one colour and knocked out on dark.
 *
 * NOTE: this is a code construction of the geometry in the brief, intended as a
 * working placeholder until the final vector mark and construction grid are
 * delivered by the designer.
 */

export type RosetteVariant = "full" | "petal" | "silhouette" | "hexagon";

export function rosetteVariantForSize(size: number): RosetteVariant {
  if (size >= 32) return "full";
  if (size >= 20) return "petal";
  if (size >= 14) return "silhouette";
  return "hexagon";
}

type RosetteProps = {
  /** Rendered width and height in px. Also selects the variant when `variant` is "auto". */
  size?: number;
  variant?: RosetteVariant | "auto";
  /** Any CSS colour. Defaults to the surrounding text colour. */
  color?: string;
  /** Accessible name. Omit for decorative use (the SVG is then hidden from assistive tech). */
  title?: string;
  className?: string;
  /**
   * Stroke width in viewBox units (42 across) for the `full` variant. The default
   * suits 32-64px use. Large decorative uses pass a smaller value so the lines
   * stay fine instead of scaling up with the mark.
   */
  strokeWidth?: number;
};

const VIEWBOX = 21; // half-width; viewBox is -21 -21 42 42
const R = 10; // unit radius of the full construction
const STROKE = 1.4;
const CENTRE_DOT = 2.4;

// Petal-family geometry: petals pushed outward so the silhouette reaches the same extent as the full mark.
const PETAL_DISTANCE = 11.5;
const PETAL_RADIUS = 8.5;
const SILHOUETTE_CENTRE_RADIUS = 9;

// Hexagon: vertices sit in the six petal directions; rounded by a same-colour stroke.
const HEX_RADIUS = 16;
const HEX_ROUND = 6;

/** Six directions of the hexagonal grid, starting at 12 o'clock. */
const ANGLES = [0, 1, 2, 3, 4, 5].map((i) => ((-90 + i * 60) * Math.PI) / 180);

const ring = (distance: number) =>
  ANGLES.map((a) => ({
    cx: Number((Math.cos(a) * distance).toFixed(3)),
    cy: Number((Math.sin(a) * distance).toFixed(3)),
  }));

const FULL_RING = ring(R);
const PETAL_RING = ring(PETAL_DISTANCE);
const HEX_POINTS = ring(HEX_RADIUS)
  .map(({ cx, cy }) => `${cx},${cy}`)
  .join(" ");

export function Rosette({
  size = 40,
  variant = "auto",
  color = "currentColor",
  title,
  className,
  strokeWidth = STROKE,
}: RosetteProps) {
  const resolved = variant === "auto" ? rosetteVariantForSize(size) : variant;
  const style: CSSProperties = { color };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-VIEWBOX} ${-VIEWBOX} ${VIEWBOX * 2} ${VIEWBOX * 2}`}
      width={size}
      height={size}
      style={style}
      className={className}
      data-variant={resolved}
      focusable="false"
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true })}
    >
      {resolved === "full" && (
        <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
          <circle cx={0} cy={0} r={R} />
          {FULL_RING.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={R} />
          ))}
          <circle cx={0} cy={0} r={CENTRE_DOT} fill="currentColor" stroke="none" />
        </g>
      )}

      {resolved === "petal" && (
        <g fill="currentColor">
          {PETAL_RING.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={PETAL_RADIUS} />
          ))}
        </g>
      )}

      {resolved === "silhouette" && (
        <g fill="currentColor">
          <circle cx={0} cy={0} r={SILHOUETTE_CENTRE_RADIUS} />
          {PETAL_RING.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={PETAL_RADIUS} />
          ))}
        </g>
      )}

      {resolved === "hexagon" && (
        <polygon
          points={HEX_POINTS}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={HEX_ROUND}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
