import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once, at module scope. Safe to import from both client components
// (where it actually runs animations) and anywhere else — gsap itself is a
// no-op until something calls it, and ScrollTrigger only touches the DOM
// when a trigger is created client-side.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
