import { ShieldCheck, Clock, Truck } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    stat: "99.8%+ Verified Purity",
    caption: "Zero synthetic preservatives or dyes",
  },
  {
    icon: Clock,
    stat: "150+ Years Lineage",
    caption: "Phoolchand Aushdhalaya, MP",
  },
  {
    icon: Truck,
    stat: "High-Velocity Logistics",
    caption: "Cold-sealed, dispatched directly",
  },
] as const;

export function TrustBar() {
  return (
    <section className="w-full bg-[#F4ECE1] py-8 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col divide-y divide-[#DFCDB7] px-6 sm:flex-row sm:divide-x sm:divide-y-0 md:px-12">
        {stats.map((item) => (
          <div
            key={item.stat}
            className="flex flex-1 items-center justify-center gap-4 py-6 sm:px-6 sm:py-0"
          >
            <item.icon className="h-8 w-8 shrink-0 text-brand-leaf-green" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="font-sans text-xl sm:text-2xl font-black uppercase tracking-wide text-brand-primary leading-tight">
                {item.stat}
              </span>
              <span className="font-sans text-xs sm:text-sm text-brand-primary/65">{item.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
