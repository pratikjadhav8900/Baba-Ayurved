import { Rosette } from "./Rosette";

/**
 * The brand's own surround treatments (brief §3.6, "ours to use freely"):
 *
 *   sunray    concentric halo of dots fading outward   primary packaging
 *   rays      fine lines fanning outward               secondary carton
 *   halfmoon  arcs circling the mark                   gifting, seasonal editions
 *
 * They are generic radial constructions on the rosette's own geometry. They are
 * NOT Gond artwork and must never stand in for commissioned Gond work, which
 * belongs in <ArtworkZone>.
 *
 * Everything is drawn in one colour (currentColor unless `color` is set).
 */

export type Treatment = "sunray" | "rays" | "halfmoon";

type RosetteSurroundProps = {
  /** Rendered width and height in px. */
  size?: number;
  treatment?: Treatment;
  color?: string;
  /** Hairline weight in px for the rosette and ornament strokes. */
  lineWidth?: number;
  /** Accessible name. Omit for decorative use. */
  title?: string;
  className?: string;
  /** Turn the ornament (never the mark) very slowly. Ignored under reduced motion. */
  spin?: boolean;
};

const MARK_SHARE = 0.4; // rosette width as a share of the whole composition
const INNER = 52; // ornaments start outside the mark (viewBox is -100..100)

const deg = (d: number) => (d * Math.PI) / 180;
const f = (n: number) => Number(n.toFixed(2));
const polar = (r: number, d: number) => ({ x: f(Math.cos(deg(d)) * r), y: f(Math.sin(deg(d)) * r) });

const SUNRAY_DOTS = Array.from({ length: 24 }, (_, i) => i * 15).flatMap((angle) =>
  [54, 64, 74, 84, 94].map((radius, step) => ({
    ...polar(radius, angle - 90),
    r: [2.2, 1.8, 1.4, 1.0, 0.7][step],
    opacity: [1, 0.85, 0.7, 0.55, 0.4][step],
  })),
);

const RAYS = Array.from({ length: 48 }, (_, i) => {
  const angle = i * 7.5 - 90;
  const length = i % 4 === 0 ? 40 : i % 2 === 0 ? 28 : 14;
  const a = polar(INNER + 2, angle);
  const b = polar(INNER + 2 + length, angle);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});

const halfMoons = (count: number, ringRadius: number, moonRadius: number, offset: number) =>
  Array.from({ length: count }, (_, i) => {
    const angle = offset + (360 / count) * i - 90;
    const { x, y } = polar(ringRadius, angle);
    return {
      d: `M ${-moonRadius} 0 A ${moonRadius} ${moonRadius} 0 0 1 ${moonRadius} 0`,
      transform: `translate(${x} ${y}) rotate(${f(angle + 90)})`,
    };
  });

const HALF_MOONS = [...halfMoons(12, 64, 9, 0), ...halfMoons(24, 84, 5, 7.5)];

export function RosetteSurround({
  size = 320,
  treatment = "sunray",
  color = "currentColor",
  lineWidth = 1.25,
  title,
  className,
  spin = false,
}: RosetteSurroundProps) {
  const markSize = Math.round(size * MARK_SHARE);
  // Keep the mark's lines fine at any size: convert px to viewBox units (42 across).
  const markStroke = Math.min(1.4, (lineWidth * 42) / markSize);

  return (
    <span
      className={["relative inline-block", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, color }}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <svg
        viewBox="-100 -100 200 200"
        className={spin ? "absolute inset-0 size-full animate-turn" : "absolute inset-0 size-full"}
        focusable="false"
        aria-hidden
      >
        {treatment === "sunray" && (
          <g fill="currentColor">
            {SUNRAY_DOTS.map((dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fillOpacity={dot.opacity} />
            ))}
          </g>
        )}

        {treatment === "rays" && (
          <g stroke="currentColor" strokeWidth={lineWidth} strokeLinecap="round" fill="none">
            {RAYS.map((ray, i) => (
              <line key={i} {...ray} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        )}

        {treatment === "halfmoon" && (
          <g stroke="currentColor" strokeWidth={lineWidth} fill="none" strokeLinecap="round">
            <circle cx={0} cy={0} r={INNER - 2} vectorEffect="non-scaling-stroke" />
            {HALF_MOONS.map((moon, i) => (
              <path key={i} d={moon.d} transform={moon.transform} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        )}
      </svg>

      <span className="absolute inset-0 flex items-center justify-center">
        <Rosette size={markSize} variant="full" strokeWidth={markStroke} />
      </span>
    </span>
  );
}
