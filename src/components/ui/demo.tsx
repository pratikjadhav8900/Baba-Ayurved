import { WebGLLiquid } from "@/components/ui/webgl-liquid";

const settings = {
  colorDeep: "#3E240C",
  colorMid: "#E6D3BA",
  colorHighlight: "#FBF7F3",
  speed: 0.85,
  flowStrength: 1.05,
  grain: 0.03,
  contrast: 1.12,
  opacity: 0.95,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="h-screen w-full overflow-hidden">
      <WebGLLiquid
        {...s}
        title="Fluid Motion"
        subtitle="Premium Presence"
        description="A cinematic liquid field tuned for modern hero sections with polished depth and restrained motion."
      />
    </div>
  );
}
