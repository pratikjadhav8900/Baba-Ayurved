import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { rituals } from "@/content/rituals";
import { site } from "@/lib/site";

const classicalTexts = [
  { name: "Charaka Samhita", focus: "Dinacharya & Internal Medicine (Kayachikitsa)" },
  { name: "Sushruta Samhita", focus: "Botanical Preparations & Surgical Anatomy" },
  { name: "Ashtanga Hridaya", focus: "Daily Routines & Seasonal Transition (Ritucharya)" },
  { name: "Sharangadhara Samhita", focus: "Pharmaceutical Standards for Churna & Avaleh" },
];

const linkClass =
  "inline-flex min-h-9 items-center font-sans text-xs text-brand-ivory/80 underline decoration-transparent decoration-1 underline-offset-[0.4em] transition-colors duration-(--duration-calm) hover:text-brand-ivory hover:decoration-brand-sand";

const columnLabel = "font-sans text-[11px] uppercase tracking-label text-brand-sand font-semibold";

export function SiteFooter() {
  return (
    <footer id="contact" className="tone-primary border-t border-solid border-brand-sand/30 bg-brand-primary text-brand-ivory">
      <Section tone="primary" spacing="none" className="py-16 md:py-20">
        <Container className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand & Lineage Column */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <BrandLockup layout="horizontal" tone="reversed" size="md" />
            <p className="max-w-[32ch] font-serif text-sm leading-relaxed text-brand-sand/90">
              Preserving 159 years of authentic clinical Hakim lineage from Maharaj Bada, Gwalior, Madhya Pradesh.
            </p>
            <div className="rounded-xs border border-brand-sand/30 bg-[#3E240C]/60 p-4">
              <span className="block font-sans text-[10px] uppercase tracking-label text-brand-sand">
                Lineage Philosophy
              </span>
              <p className="mt-1 font-serif text-xs italic text-brand-ivory">
                &ldquo;Ritual, not remedy. The unit of practice is a morning, an evening, and a season.&rdquo;
              </p>
            </div>
            <div className="text-[11px] font-sans text-brand-sand/75">
              <span className="font-semibold text-brand-ivory">Manufactured By:</span> Baba Ayurved Pharmacy, Industrial Area, Gwalior, M.P.<br />
              <span className="font-semibold text-brand-ivory">Mfg. Lic. No.:</span> 25D/23/99
            </div>
          </div>

          {/* Navigation Links Column */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-4">
            <div className="flex flex-col gap-3">
              <p className={columnLabel}>Daily Rituals</p>
              <ul className="flex flex-col gap-1.5">
                {rituals.map((ritual) => (
                  <li key={ritual.slug}>
                    <Link href={`/rituals/${ritual.slug}`} className={linkClass}>
                      {ritual.name} &middot; <span className="text-[10px] text-brand-sand/80">{ritual.term}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/#rituals" className={linkClass}>
                    The Three Chapters Overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className={columnLabel}>Pharmacy &amp; Sourcing</p>
              <ul className="flex flex-col gap-1.5">
                <li><Link href="/shop" className={linkClass}>Full Catalogue</Link></li>
                <li><Link href="/shop" className={linkClass}>Classical Preparations</Link></li>
                <li><Link href="/#heritage" className={linkClass}>Family Heritage</Link></li>
                <li><Link href="/#provenance" className={linkClass}>Botanical Herbarium</Link></li>
                <li><Link href="/design-system" className={linkClass}>Design System</Link></li>
                <li><Link href="/brand/contact-sheet.html" className={linkClass} target="_blank">Brand Contact Sheet ↗</Link></li>
              </ul>
            </div>
          </nav>

          {/* Classical Scriptures & Governance Column */}
          <div className="flex flex-col gap-8 md:col-span-4">
            <div className="flex flex-col gap-3">
              <p className={columnLabel}>Classical Texts Referenced</p>
              <ul className="flex flex-col gap-2">
                {classicalTexts.map((text) => (
                  <li key={text.name} className="border-b border-brand-sand/15 pb-2 last:border-b-0">
                    <span className="block font-serif text-xs font-medium text-brand-ivory">{text.name}</span>
                    <span className="block font-sans text-[10px] text-brand-sand/80">{text.focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <p className={columnLabel}>Compliance &amp; Governance</p>
              <p className="font-sans text-[11px] leading-relaxed text-brand-sand/80">
                Formulations prepared in accordance with the Ayurvedic Pharmacopoeia of India and classical treatises. No disease cure or treatment claims are made.
              </p>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <Container className="mt-14 flex flex-col gap-4 border-t border-solid border-brand-sand/20 pt-8 text-xs text-brand-sand md:flex-row md:items-center md:justify-between">
          <p>
            &copy; 2026 {site.name} &middot; Phoolchand Aushdhalaya lineage since 1870s &middot; Pharmacy founded {site.foundedYear}
          </p>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <span>Madhya Pradesh, India</span>
            <span>&middot;</span>
            <span>Batch Traceability</span>
            <span>&middot;</span>
            <Link href="/brand/contact-sheet.html" className="underline hover:text-brand-ivory" target="_blank">Brand Kit v2</Link>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
