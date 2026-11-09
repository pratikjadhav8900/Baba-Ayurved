import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { rituals } from "@/content/rituals";
import { site } from "@/lib/site";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "WhatsApp", href: "#" },
];

const linkClass =
  "inline-flex min-h-9 items-center font-sans text-sm text-brand-ivory underline decoration-transparent decoration-1 underline-offset-[0.4em] transition-colors duration-(--duration-calm) hover:text-brand-sand hover:decoration-brand-sand";

const columnLabel = "font-sans text-[11px] uppercase tracking-label text-brand-sand font-semibold";

export function SiteFooter() {
  return (
    <footer id="contact" className="tone-primary border-t border-solid border-brand-sand/30 bg-brand-primary text-brand-ivory">
      <Section tone="primary" spacing="none" className="py-16 md:py-20">
        <Container className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand, Lineage & Newsletter Column */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <BrandLockup layout="horizontal" tone="reversed" size="md" />
            <p className="max-w-[32ch] font-serif text-sm leading-relaxed text-brand-ivory/90">
              Preserving 159 years of authentic clinical Hakim lineage from Maharaj Bada, Gwalior, Madhya Pradesh.
            </p>
            <div className="rounded-xs border border-brand-sand/30 bg-[#3E240C]/60 p-4">
              <span className="block font-sans text-xs font-semibold uppercase tracking-label text-brand-sand">
                Lineage Philosophy
              </span>
              <p className="mt-1.5 font-serif text-sm sm:text-base italic text-brand-ivory leading-relaxed">
                &ldquo;Ritual, not remedy. The unit of practice is a morning, an evening, and a season.&rdquo;
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={columnLabel}>Seasonal Ritual Notes</p>
              <FooterNewsletterForm />
            </div>
          </div>

          {/* Navigation Links Column */}
          <nav aria-label="Footer" className="flex flex-col gap-3 md:col-span-3">
            <p className={columnLabel}>Daily Rituals</p>
            <ul className="flex flex-col gap-1.5">
              {rituals.map((ritual) => (
                <li key={ritual.slug}>
                  <Link href={`/rituals/${ritual.slug}`} className={linkClass}>
                    {ritual.name} &middot; <span className="text-[11px] text-brand-sand">{ritual.term}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#rituals" className={linkClass}>
                  The Three Chapters Overview
                </Link>
              </li>
            </ul>
          </nav>

          {/* Pharmacy, Sourcing & Contact Column */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <nav aria-label="Pharmacy & Sourcing" className="flex flex-col gap-3">
              <p className={columnLabel}>Pharmacy &amp; Sourcing</p>
              <ul className="flex flex-col gap-1.5">
                <li><Link href="/shop" className={linkClass}>Full Catalogue</Link></li>
                <li><Link href="/shop" className={linkClass}>Classical Preparations</Link></li>
                <li><Link href="/community" className={linkClass}>Community Stories</Link></li>
                <li><Link href="/#heritage" className={linkClass}>Family Heritage</Link></li>
                <li><Link href="/#provenance" className={linkClass}>Botanical Herbarium</Link></li>
                <li><Link href="/design-system" className={linkClass}>Design System</Link></li>
                <li><Link href="/brand/contact-sheet.html" className={linkClass} target="_blank">Brand Contact Sheet ↗</Link></li>
              </ul>
            </nav>

            <div className="flex flex-col gap-2 text-xs font-sans text-brand-ivory/85">
              <p className={columnLabel}>Manufactured By</p>
              <div className="flex items-start gap-2">
                <MapPin aria-hidden size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-sand" />
                <span>Baba Ayurved Pharmacy, Industrial Area, Gwalior, M.P.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone aria-hidden size={14} strokeWidth={1.5} className="shrink-0 text-brand-sand" />
                <span>Mfg. Lic. No.: 25D/23/99</span>
              </div>
            </div>
          </div>

          {/* Connect & Governance Column */}
          <div className="flex flex-col gap-8 md:col-span-2">
            <div className="flex flex-col gap-3">
              <p className={columnLabel}>Connect</p>
              <ul className="flex flex-col gap-1.5">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <Link href={social.href} className={linkClass} target="_blank">
                      {social.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="mailto:hello@babaayurved.com" className={linkClass}>
                    <Mail aria-hidden size={13} strokeWidth={1.5} className="mr-1.5 inline" />
                    Email Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <p className={columnLabel}>Compliance</p>
              <p className="font-sans text-xs leading-relaxed text-brand-ivory/85">
                Formulations prepared in accordance with the Ayurvedic Pharmacopoeia of India. No disease cure or treatment claims are made.
              </p>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <Container className="mt-14 flex flex-col gap-4 border-t border-solid border-brand-sand/20 pt-8 text-xs text-brand-ivory/85 md:flex-row md:items-center md:justify-between">
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
